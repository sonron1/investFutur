import { z } from 'zod'
import { useDb } from '../../utils/db'
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

  const sql = useDb()

  // Email uniqueness check
  const existing = await sql`SELECT id FROM users WHERE email = ${body.email} LIMIT 1`
  if (existing.length > 0) {
    throw createError({ statusCode: 409, message: 'Un compte existe déjà avec cet email' })
  }

  const hashedPassword = await hashPassword(body.password)

  const userId = crypto.randomUUID()
  const ip = getRequestIP(event) ?? null
  const ua = getHeader(event, 'user-agent') ?? null
  const phone = body.phone ?? null
  const country = body.country ?? null

  // Email verification token (24h expiry)
  const verificationToken = generateSecureToken()
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

  // Create user + GDPR consents + email verification in a transaction
  const results = await sql.transaction([
    sql`INSERT INTO users (id, email, password, "firstName", "lastName", phone, country, role, "isVerified", "kycStatus", "kycTier", "createdAt", "updatedAt")
        VALUES (${userId}, ${body.email}, ${hashedPassword}, ${body.firstName}, ${body.lastName}, ${phone}, ${country}, 'USER', false, 'PENDING', 0, NOW(), NOW())
        RETURNING id, email, "firstName", "lastName"`,
    sql`INSERT INTO gdpr_consents (id, "userId", type, granted, "ipAddress", "userAgent", "createdAt")
        VALUES (${crypto.randomUUID()}, ${userId}, 'essential', true, ${ip}, ${ua}, NOW())`,
    sql`INSERT INTO gdpr_consents (id, "userId", type, granted, "ipAddress", "userAgent", "createdAt")
        VALUES (${crypto.randomUUID()}, ${userId}, 'marketing', ${body.acceptMarketing ?? false}, ${ip}, ${ua}, NOW())`,
    sql`INSERT INTO email_verifications (id, "userId", token, "expiresAt", "createdAt")
        VALUES (${crypto.randomUUID()}, ${userId}, ${verificationToken}, ${expiresAt.toISOString()}, NOW())`,
  ])

  const user = results[0][0]

  // Send verification email (non-blocking — don't fail registration if email fails)
  sendVerificationEmail(user.email, user.firstName, verificationToken).catch(console.error)

  return {
    data: {
      message: 'Compte créé avec succès. Vérifiez votre email pour activer votre compte.',
      userId: user.id,
    },
  }
})
