import { requireAuth } from '../../utils/guards'
import { useDb } from '../../utils/db'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const schema = z.object({
  firstName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
  phone: z.string().max(20).optional().nullable(),
  country: z.string().max(100).optional().nullable(),
  address: z.string().max(255).optional().nullable(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8).optional(),
})

export default defineEventHandler(async (event) => {
  const authUser = requireAuth(event)
  const body = await readBody(event)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    throw createError({ statusCode: 422, message: parsed.error.errors[0]?.message ?? 'Données invalides' })
  }

  const { firstName, lastName, phone, country, address, currentPassword, newPassword } = parsed.data
  const sql = useDb()

  // Password change
  if (newPassword) {
    if (!currentPassword) {
      throw createError({ statusCode: 422, message: 'Mot de passe actuel requis' })
    }

    const rows = await sql`SELECT password FROM users WHERE id = ${authUser.id} LIMIT 1`
    const user = rows[0]

    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      throw createError({ statusCode: 401, message: 'Mot de passe actuel incorrect' })
    }

    const hashed = await bcrypt.hash(newPassword, 12)
    await sql`UPDATE users SET password = ${hashed} WHERE id = ${authUser.id}`
  }

  // Profile update
  if (firstName !== undefined || lastName !== undefined || phone !== undefined || country !== undefined || address !== undefined) {
    await sql`
      UPDATE users SET
        "firstName" = COALESCE(${firstName ?? null}, "firstName"),
        "lastName"  = COALESCE(${lastName  ?? null}, "lastName"),
        phone       = COALESCE(${phone   ?? null}, phone),
        country     = COALESCE(${country ?? null}, country),
        address     = COALESCE(${address ?? null}, address),
        "updatedAt" = NOW()
      WHERE id = ${authUser.id}`
  }

  const updated = await sql`
    SELECT id, email, "firstName", "lastName", phone, country, address, role, "isVerified", "kycStatus", "kycTier"
    FROM users
    WHERE id = ${authUser.id}
    LIMIT 1`

  return { data: updated[0] }
})
