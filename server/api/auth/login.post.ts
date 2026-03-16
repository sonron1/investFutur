import { z } from 'zod'
import { prisma } from '../../utils/db'
import { verifyPassword, signAccessToken, signRefreshToken } from '../../utils/auth'

const schema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(1),
  rememberMe: z.boolean().optional().default(false),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, schema.parse)

  const user = await prisma.user.findUnique({
    where: { email: body.email },
    select: {
      id: true,
      email: true,
      password: true,
      firstName: true,
      lastName: true,
      role: true,
      isVerified: true,
      kycStatus: true,
      kycTier: true,
    },
  })

  // Use same error message for both "not found" and "wrong password" (prevent user enumeration)
  if (!user || !(await verifyPassword(body.password, user.password))) {
    throw createError({ statusCode: 401, message: 'Email ou mot de passe incorrect' })
  }

  if (!user.isVerified) {
    throw createError({
      statusCode: 403,
      message: 'Veuillez vérifier votre adresse email avant de vous connecter',
    })
  }

  // Create refresh token in DB
  const refreshToken = signRefreshToken(user.id)
  const sessionExpiry = body.rememberMe
    ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)  // 7 days

  await prisma.session.create({
    data: {
      userId: user.id,
      refreshToken,
      expiresAt: sessionExpiry,
      userAgent: getHeader(event, 'user-agent'),
      ipAddress: getRequestIP(event),
    },
  })

  const accessToken = signAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  })

  // Set refresh token as httpOnly cookie
  setCookie(event, 'refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: body.rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60,
    path: '/',
  })

  const { password: _, ...safeUser } = user

  return {
    data: {
      accessToken,
      user: safeUser,
    },
  }
})
