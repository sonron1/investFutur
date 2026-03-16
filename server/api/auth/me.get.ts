import { requireAuth } from '../../utils/guards'
import { useDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const authUser = requireAuth(event)

  const sql = useDb()

  const rows = await sql`
    SELECT id, email, "firstName", "lastName", phone, country, address, role, "isVerified", "kycStatus", "kycTier", "createdAt"
    FROM users
    WHERE id = ${authUser.id}
    LIMIT 1`

  const user = rows[0] ?? null

  if (!user) {
    throw createError({ statusCode: 404, message: 'Utilisateur introuvable' })
  }

  // Get investment and transaction counts separately
  const countRows = await sql`
    SELECT
      (SELECT COUNT(*) FROM investments WHERE "userId" = ${authUser.id}) AS investments,
      (SELECT COUNT(*) FROM transactions WHERE "userId" = ${authUser.id}) AS transactions`

  const counts = countRows[0]

  return {
    data: {
      ...user,
      _count: {
        investments: Number(counts?.investments ?? 0),
        transactions: Number(counts?.transactions ?? 0),
      },
    },
  }
})
