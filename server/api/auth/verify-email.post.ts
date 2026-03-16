import { z } from 'zod'
import { useDb } from '../../utils/db'
import { sendWelcomeEmail } from '../../utils/email'

const schema = z.object({
  token: z.string().min(1),
})

export default defineEventHandler(async (event) => {
  const { token } = await readValidatedBody(event, schema.parse)

  const sql = useDb()

  const rows = await sql`
    SELECT ev.id, ev."userId", ev."expiresAt", u.email, u."firstName", u."isVerified"
    FROM email_verifications ev
    JOIN users u ON u.id = ev."userId"
    WHERE ev.token = ${token}
    LIMIT 1`

  const verification = rows[0] ?? null

  if (!verification) {
    throw createError({ statusCode: 400, message: 'Token de vérification invalide' })
  }

  if (new Date(verification.expiresAt) < new Date()) {
    await sql`DELETE FROM email_verifications WHERE id = ${verification.id}`
    throw createError({ statusCode: 400, message: 'Token expiré. Demandez un nouvel email de vérification.' })
  }

  if (verification.isVerified) {
    return { data: { message: 'Email déjà vérifié' } }
  }

  await sql.transaction([
    sql`UPDATE users SET "isVerified" = true WHERE id = ${verification.userId}`,
    sql`DELETE FROM email_verifications WHERE id = ${verification.id}`,
  ])

  sendWelcomeEmail(verification.email, verification.firstName).catch(console.error)

  return { data: { message: 'Email vérifié avec succès. Vous pouvez maintenant vous connecter.' } }
})
