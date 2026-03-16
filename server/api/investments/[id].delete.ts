import { requireAuth } from '../../utils/guards'
import { useDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const id = getRouterParam(event, 'id')

  const sql = useDb()

  const rows = await sql`SELECT id, "userId", status FROM investments WHERE id = ${id} LIMIT 1`
  const investment = rows[0] ?? null

  if (!investment) {
    throw createError({ statusCode: 404, message: 'Investissement introuvable' })
  }

  if (investment.userId !== user.id && user.role !== 'ADMIN') {
    throw createError({ statusCode: 403, message: 'Non autorisé' })
  }

  if (investment.status === 'ACTIVE' || investment.status === 'COMPLETED') {
    throw createError({ statusCode: 400, message: 'Impossible d\'annuler un investissement actif ou terminé' })
  }

  await sql`UPDATE investments SET status = 'CANCELLED', "updatedAt" = NOW() WHERE id = ${id}`

  return { data: { message: 'Investissement annulé' } }
})
