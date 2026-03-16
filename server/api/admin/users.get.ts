import { requireAdmin } from '../../utils/guards'
import { useDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const query = getQuery(event)
  const page = Math.max(1, parseInt(query.page as string) || 1)
  const limit = Math.min(100, parseInt(query.limit as string) || 20)
  const skip = (page - 1) * limit
  const search = query.search as string | undefined
  const kycStatus = query.kycStatus as string | undefined

  const sql = useDb()

  const hasSearch = !!(search && search.trim())
  const hasKycFilter = !!(kycStatus && kycStatus !== 'all')
  const kycStatusValue = hasKycFilter ? kycStatus!.toUpperCase() : null
  const searchValue = hasSearch ? `%${search}%` : null

  let users: any[]
  let countRows: any[]

  if (hasSearch && hasKycFilter) {
    users = await sql`
      SELECT id, email, "firstName", "lastName", role, "isVerified", "kycStatus", "kycTier", "createdAt"
      FROM users
      WHERE (email ILIKE ${searchValue} OR "firstName" ILIKE ${searchValue} OR "lastName" ILIKE ${searchValue})
        AND "kycStatus" = ${kycStatusValue}
      ORDER BY "createdAt" DESC
      LIMIT ${limit} OFFSET ${skip}`
    countRows = await sql`
      SELECT COUNT(*) as count FROM users
      WHERE (email ILIKE ${searchValue} OR "firstName" ILIKE ${searchValue} OR "lastName" ILIKE ${searchValue})
        AND "kycStatus" = ${kycStatusValue}`
  } else if (hasSearch) {
    users = await sql`
      SELECT id, email, "firstName", "lastName", role, "isVerified", "kycStatus", "kycTier", "createdAt"
      FROM users
      WHERE email ILIKE ${searchValue} OR "firstName" ILIKE ${searchValue} OR "lastName" ILIKE ${searchValue}
      ORDER BY "createdAt" DESC
      LIMIT ${limit} OFFSET ${skip}`
    countRows = await sql`
      SELECT COUNT(*) as count FROM users
      WHERE email ILIKE ${searchValue} OR "firstName" ILIKE ${searchValue} OR "lastName" ILIKE ${searchValue}`
  } else if (hasKycFilter) {
    users = await sql`
      SELECT id, email, "firstName", "lastName", role, "isVerified", "kycStatus", "kycTier", "createdAt"
      FROM users
      WHERE "kycStatus" = ${kycStatusValue}
      ORDER BY "createdAt" DESC
      LIMIT ${limit} OFFSET ${skip}`
    countRows = await sql`SELECT COUNT(*) as count FROM users WHERE "kycStatus" = ${kycStatusValue}`
  } else {
    users = await sql`
      SELECT id, email, "firstName", "lastName", role, "isVerified", "kycStatus", "kycTier", "createdAt"
      FROM users
      ORDER BY "createdAt" DESC
      LIMIT ${limit} OFFSET ${skip}`
    countRows = await sql`SELECT COUNT(*) as count FROM users`
  }

  const total = Number(countRows[0]?.count ?? 0)

  return {
    data: users,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  }
})
