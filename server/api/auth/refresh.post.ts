import { useDb } from '../../utils/db'
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

  const sql = useDb()

  // Check session exists in DB (revocation support)
  const sessionRows = await sql`SELECT id, "userId", "expiresAt" FROM sessions WHERE "refreshToken" = ${refreshToken} LIMIT 1`
  const session = sessionRows[0] ?? null

  if (!session || new Date(session.expiresAt) < new Date()) {
    deleteCookie(event, 'refresh_token', { path: '/' })
    throw createError({ statusCode: 401, message: 'Session expirée, veuillez vous reconnecter' })
  }

  // Load user
  const userRows = await sql`SELECT id, email, role, "isVerified" FROM users WHERE id = ${payload.userId} LIMIT 1`
  const user = userRows[0] ?? null

  if (!user) {
    throw createError({ statusCode: 401, message: 'Utilisateur introuvable' })
  }

  // Rotate refresh token (security best practice)
  const newRefreshToken = signRefreshToken(user.id)
  const newExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  await sql`UPDATE sessions SET "refreshToken" = ${newRefreshToken}, "expiresAt" = ${newExpiry.toISOString()} WHERE id = ${session.id}`

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
