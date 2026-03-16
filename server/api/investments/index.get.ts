import { requireAuth } from '../../utils/guards'
import { useDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)

  const query = getQuery(event)
  const status = query.status as string | undefined
  const page = Math.max(1, parseInt(query.page as string) || 1)
  const limit = Math.min(50, parseInt(query.limit as string) || 20)
  const skip = (page - 1) * limit

  const sql = useDb()

  const hasStatusFilter = status && status !== 'all'
  const statusValue = hasStatusFilter ? status!.toUpperCase() : null

  const investments = hasStatusFilter
    ? await sql`
        SELECT i.*, (
          SELECT json_agg(t) FROM transactions t
          WHERE t."investmentId" = i.id AND t.status = 'CONFIRMED'
        ) as transactions
        FROM investments i
        WHERE i."userId" = ${user.id} AND i.status = ${statusValue}
        ORDER BY i."createdAt" DESC
        LIMIT ${limit} OFFSET ${skip}`
    : await sql`
        SELECT i.*, (
          SELECT json_agg(t) FROM transactions t
          WHERE t."investmentId" = i.id AND t.status = 'CONFIRMED'
        ) as transactions
        FROM investments i
        WHERE i."userId" = ${user.id}
        ORDER BY i."createdAt" DESC
        LIMIT ${limit} OFFSET ${skip}`

  const countRows = hasStatusFilter
    ? await sql`SELECT COUNT(*) as count FROM investments WHERE "userId" = ${user.id} AND status = ${statusValue}`
    : await sql`SELECT COUNT(*) as count FROM investments WHERE "userId" = ${user.id}`

  const total = Number(countRows[0]?.count ?? 0)

  return {
    data: investments,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  }
})
