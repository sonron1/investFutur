import { requireAdmin } from '../../utils/guards'
import { useDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const sql = useDb()

  // Fetch all users with their KYC documents
  const users = await sql`
    SELECT
      u.id, u.email, u."firstName", u."lastName", u.phone, u.country, u.address,
      u."kycStatus", u."kycTier", u."createdAt",
      COALESCE(
        json_agg(
          json_build_object(
            'id', d.id,
            'type', d.type,
            'fileName', d."fileName",
            'fileUrl', d."fileUrl",
            'status', d.status,
            'notes', d.notes,
            'createdAt', d."createdAt"
          ) ORDER BY d."createdAt" ASC
        ) FILTER (WHERE d.id IS NOT NULL),
        '[]'::json
      ) AS documents
    FROM users u
    LEFT JOIN kyc_documents d ON d."userId" = u.id
    WHERE u.role = 'USER'
    GROUP BY u.id
    ORDER BY
      CASE u."kycStatus"
        WHEN 'SUBMITTED' THEN 1
        WHEN 'REJECTED' THEN 2
        WHEN 'PENDING' THEN 3
        WHEN 'APPROVED' THEN 4
      END,
      u."createdAt" DESC`

  return { data: users }
})
