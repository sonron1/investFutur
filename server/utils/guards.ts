import type { H3Event } from 'h3'

export function requireAuth(event: H3Event) {
  const user = event.context.user
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Authentification requise',
    })
  }
  return user
}

export function requireAdmin(event: H3Event) {
  const user = requireAuth(event)
  if (user.role !== 'ADMIN') {
    throw createError({
      statusCode: 403,
      message: 'Accès réservé aux administrateurs',
    })
  }
  return user
}

export function requireVerified(event: H3Event) {
  const user = requireAuth(event)
  if (!user.isVerified) {
    throw createError({
      statusCode: 403,
      message: 'Veuillez vérifier votre adresse email avant de continuer',
    })
  }
  return user
}
