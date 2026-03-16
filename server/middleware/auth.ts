import { verifyAccessToken, getTokenFromEvent } from '../utils/auth'
import { prisma } from '../utils/db'

// This middleware runs on every request matching /api/auth/me, /api/investments/**, /api/admin/**
// Routes that need auth should call requireAuth() from their handler instead
// This middleware only sets event.context.user if a valid token is present

export default defineEventHandler(async (event) => {
  const token = getTokenFromEvent(event)
  if (!token) return

  try {
    const payload = verifyAccessToken(token)
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        kycStatus: true,
        kycTier: true,
      },
    })
    if (user) {
      event.context.user = user
    }
  } catch {
    // Invalid token — context.user stays undefined, protected routes will reject
  }
})
