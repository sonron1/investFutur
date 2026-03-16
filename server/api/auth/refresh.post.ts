import { prisma } from '../../utils/db'
import { verifyRefreshToken, signAccessToken, signRefreshToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refresh_token')

  if (!refreshToken) {
    throw createError({ statusCode: 401, message: 'Refresh token manquant' })
  }

  // Verify token signature
  let payload: { userId: string }
  try {
    payload = verifyRefreshToken(refreshToken)
  } catch {
    deleteCookie(event, 'refresh_token', { path: '/' })
    throw createError({ statusCode: 401, message: 'Refresh token invalide ou expiré' })
  }

  // Check session exists in DB (revocation support)
  const session = await prisma.session.findUnique({ where: { refreshToken } })
  if (!session || session.expiresAt < new Date()) {
    deleteCookie(event, 'refresh_token', { path: '/' })
    throw createError({ statusCode: 401, message: 'Session expirée, veuillez vous reconnecter' })
  }

  // Load user
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, role: true, isVerified: true },
  })

  if (!user) {
    throw createError({ statusCode: 401, message: 'Utilisateur introuvable' })
  }

  // Rotate refresh token (security best practice)
  const newRefreshToken = signRefreshToken(user.id)
  await prisma.session.update({
    where: { id: session.id },
    data: {
      refreshToken: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  })

  setCookie(event, 'refresh_token', newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  })

  const accessToken = signAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  })

  return { data: { accessToken } }
})
