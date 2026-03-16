import { z } from 'zod'
import { useDb } from '../../utils/db'
import { hashPassword, validatePasswordStrength } from '../../utils/auth'

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
})

export default defineEventHandler(async (event) => {
  const { token, password } = await readValidatedBody(event, schema.parse)

  const strength = validatePasswordStrength(password)
  if (!strength.valid) {
    throw createError({ statusCode: 400, message: strength.message })
  }

  const sql = useDb()

  const rows = await sql`
    SELECT prt.id, prt."userId", prt.used, prt."expiresAt"
    FROM password_reset_tokens prt
    WHERE token = ${token}
    LIMIT 1`

  const resetToken = rows[0] ?? null

  if (!resetToken || resetToken.used || new Date(resetToken.expiresAt) < new Date()) {
    throw createError({ statusCode: 400, message: 'Token invalide ou expiré' })
  }

  const hashedPassword = await hashPassword(password)

  await sql.transaction([
    sql`UPDATE users SET password = ${hashedPassword}, "updatedAt" = NOW() WHERE id = ${resetToken.userId}`,
    sql`UPDATE password_reset_tokens SET used = true WHERE id = ${resetToken.id}`,
    sql`DELETE FROM sessions WHERE "userId" = ${resetToken.userId}`,
  ])

  return { data: { message: 'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.' } }
})
