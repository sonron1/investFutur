import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refresh_token')

  if (refreshToken) {
    // Delete session from DB
    await prisma.session.deleteMany({ where: { refreshToken } }).catch(() => {})
  }

  // Clear cookie
  deleteCookie(event, 'refresh_token', { path: '/' })

  return { data: { message: 'Déconnexion réussie' } }
})
