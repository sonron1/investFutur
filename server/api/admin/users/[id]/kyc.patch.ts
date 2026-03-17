import { z } from 'zod'
import { requireAdmin } from '../../../../utils/guards'
import { useDb } from '../../../../utils/db'
import { sendKycApprovedEmail, sendKycRejectedEmail } from '../../../../utils/email'

const schema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  notes: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = getRouterParam(event, 'id')
  const { status, notes } = await readValidatedBody(event, schema.parse)

  const sql = useDb()

  const userRows = await sql`SELECT id, email, "firstName" FROM users WHERE id = ${id} LIMIT 1`
  if (userRows.length === 0) {
    throw createError({ statusCode: 404, message: 'Utilisateur introuvable' })
  }

  const tier = status === 'APPROVED' ? 1 : 0

  const updatedRows = await sql`
    UPDATE users SET "kycStatus" = ${status}, "kycTier" = ${tier}, "updatedAt" = NOW()
    WHERE id = ${id}
    RETURNING id, email, "firstName", "kycStatus", "kycTier"`

  // Update all pending documents for this user
  await sql`
    UPDATE kyc_documents
    SET status = ${status}, notes = ${notes ?? null}, "updatedAt" = NOW()
    WHERE "userId" = ${id} AND status = 'PENDING'`

  // Send notification email (non-blocking)
  const user = userRows[0]
  if (status === 'APPROVED') {
    sendKycApprovedEmail(user.email, user.firstName).catch((err) =>
      console.error('KYC approved email error:', err)
    )
  } else {
    sendKycRejectedEmail(user.email, user.firstName, notes).catch((err) =>
      console.error('KYC rejected email error:', err)
    )
  }

  return { data: updatedRows[0] }
})
