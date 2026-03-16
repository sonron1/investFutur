import { verifyAccessToken, getTokenFromEvent } from '../utils/auth'
import { useDb } from '../utils/db'

// This middleware runs on every request matching /api/auth/me, /api/investments/**, /api/admin/**
// Routes that need auth should call requireAuth() from their handler instead
// This middleware only sets event.context.user if a valid token is present

export default defineEventHandler(async (event) => {
  const token = getTokenFromEvent(event)
  if (!token) return

  try {
    const payload = verifyAccessToken(token)
    const sql = useDb()
    const rows = await sql`SELECT id, email, "firstName", "lastName", role, "isVerified", "kycStatus", "kycTier" FROM users WHERE id = ${payload.userId} LIMIT 1`
    const user = rows[0] ?? null
    if (user) {
      event.context.user = user
    }
  } catch {
    // Invalid token — context.user stays undefined, protected routes will reject
  }
})
