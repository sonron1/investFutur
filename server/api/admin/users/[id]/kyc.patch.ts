import { z } from 'zod'
import { requireAdmin } from '../../../../utils/guards'
import { useDb } from '../../../../utils/db'

const schema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  notes: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = getRouterParam(event, 'id')
  const { status } = await readValidatedBody(event, schema.parse)

  const sql = useDb()

  const existingRows = await sql`SELECT id FROM users WHERE id = ${id} LIMIT 1`
  if (existingRows.length === 0) {
    throw createError({ statusCode: 404, message: 'Utilisateur introuvable' })
  }

  const tier = status === 'APPROVED' ? 1 : 0

  const updatedRows = await sql`
    UPDATE users SET "kycStatus" = ${status}, "kycTier" = ${tier}, "updatedAt" = NOW()
    WHERE id = ${id}
    RETURNING id, email, "firstName", "kycStatus", "kycTier"`

  return { data: updatedRows[0] }
})
