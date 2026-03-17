import { requireAuth } from '../../utils/guards'
import { useDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const sql = useDb()

  const userRows = await sql`
    SELECT "kycStatus", "kycTier", "firstName", "lastName", phone, country, address
    FROM users WHERE id = ${user.id} LIMIT 1`

  const documents = await sql`
    SELECT id, type, "fileName", "fileUrl", status, notes, "createdAt", "updatedAt"
    FROM kyc_documents
    WHERE "userId" = ${user.id}
    ORDER BY "createdAt" ASC`

  return {
    data: {
      kycStatus: userRows[0]?.kycStatus ?? 'PENDING',
      kycTier: userRows[0]?.kycTier ?? 0,
      profile: {
        firstName: userRows[0]?.firstName,
        lastName: userRows[0]?.lastName,
        phone: userRows[0]?.phone,
        country: userRows[0]?.country,
        address: userRows[0]?.address,
      },
      documents,
    },
  }
})
