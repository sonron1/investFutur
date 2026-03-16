import { z } from 'zod'
import { prisma } from '../../utils/db'
import { hashPassword, validatePasswordStrength, generateSecureToken } from '../../utils/auth'
import { sendVerificationEmail } from '../../utils/email'

const schema = z.object({
  email: z.string().email('Email invalide').toLowerCase(),
  password: z.string().min(8, 'Mot de passe trop court'),
  firstName: z.string().min(1, 'Prénom requis').max(50),
  lastName: z.string().min(1, 'Nom requis').max(50),
  phone: z.string().optional(),
  country: z.string().optional(),
  acceptTerms: z.boolean().refine((v) => v === true, 'Vous devez accepter les conditions'),
  acceptMarketing: z.boolean().optional().default(false),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, schema.parse)

  // Password strength check
  const strength = validatePasswordStrength(body.password)
  if (!strength.valid) {
    throw createError({ statusCode: 400, message: strength.message })
  }

  // Email uniqueness check
  const existing = await prisma.user.findUnique({ where: { email: body.email } })
  if (existing) {
    throw createError({ statusCode: 409, message: 'Un compte existe déjà avec cet email' })
  }

  const hashedPassword = await hashPassword(body.password)

  // Create user + GDPR consent + email verification token in one transaction
  const { user, verificationToken } = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        country: body.country,
      },
    })

    // Record GDPR consent
    await tx.gdprConsent.createMany({
      data: [
        {
          userId: user.id,
          type: 'essential',
          granted: true,
          ipAddress: getRequestIP(event),
          userAgent: getHeader(event, 'user-agent'),
        },
        {
          userId: user.id,
          type: 'marketing',
          granted: body.acceptMarketing ?? false,
          ipAddress: getRequestIP(event),
          userAgent: getHeader(event, 'user-agent'),
        },
      ],
    })

    // Email verification token (24h expiry)
    const token = generateSecureToken()
    await tx.emailVerification.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    })

    return { user, verificationToken: token }
  })

  // Send verification email (non-blocking — don't fail registration if email fails)
  sendVerificationEmail(user.email, user.firstName, verificationToken).catch(console.error)

  return {
    data: {
      message: 'Compte créé avec succès. Vérifiez votre email pour activer votre compte.',
      userId: user.id,
    },
  }
})
