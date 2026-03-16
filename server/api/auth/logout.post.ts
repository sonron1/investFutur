import { useDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refresh_token')

  if (refreshToken) {
    const sql = useDb()
    // Delete session from DB
    await sql`DELETE FROM sessions WHERE "refreshToken" = ${refreshToken}`.catch(() => {})
  }

  // Clear cookie
  deleteCookie(event, 'refresh_token', { path: '/' })

  return { data: { message: 'Déconnexion réussie' } }
})
