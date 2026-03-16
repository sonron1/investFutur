import { z } from 'zod'
import { useDb } from '../../utils/db'
import { generateSecureToken } from '../../utils/auth'
import { sendPasswordResetEmail } from '../../utils/email'

const schema = z.object({
  email: z.string().email().toLowerCase(),
})

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, schema.parse)

  const sql = useDb()

  // Always return success (prevent user enumeration)
  const rows = await sql`SELECT id, email, "firstName" FROM users WHERE email = ${email} LIMIT 1`
  const user = rows[0] ?? null

  if (user) {
    // Invalidate existing tokens
    await sql`UPDATE password_reset_tokens SET used = true WHERE "userId" = ${user.id} AND used = false`

    const token = generateSecureToken()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await sql`INSERT INTO password_reset_tokens (id, "userId", token, "expiresAt", used, "createdAt")
              VALUES (${crypto.randomUUID()}, ${user.id}, ${token}, ${expiresAt.toISOString()}, false, NOW())`

    sendPasswordResetEmail(user.email, user.firstName, token).catch(console.error)
  }

  return {
    data: {
      message: 'Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.',
    },
  }
})
