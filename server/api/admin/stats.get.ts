import { requireAdmin } from '../../utils/guards'
import { useDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const sql = useDb()

  const [
    totalUsersRows,
    pendingKycRows,
    totalInvestmentsRows,
    activeInvestmentsRows,
    totalInvestedRows,
    recentUsers,
  ] = await Promise.all([
    sql`SELECT COUNT(*) as count FROM users`,
    sql`SELECT COUNT(*) as count FROM users WHERE "kycStatus" = 'SUBMITTED'`,
    sql`SELECT COUNT(*) as count FROM investments`,
    sql`SELECT COUNT(*) as count FROM investments WHERE status = 'ACTIVE'`,
    sql`SELECT COALESCE(SUM(amount), 0) as total FROM investments WHERE status IN ('ACTIVE', 'COMPLETED')`,
    sql`SELECT id, "firstName", "lastName", email, "kycStatus", "createdAt" FROM users ORDER BY "createdAt" DESC LIMIT 5`,
  ])

  return {
    data: {
      totalUsers: Number(totalUsersRows[0]?.count ?? 0),
      pendingKyc: Number(pendingKycRows[0]?.count ?? 0),
      totalInvestments: Number(totalInvestmentsRows[0]?.count ?? 0),
      activeInvestments: Number(activeInvestmentsRows[0]?.count ?? 0),
      totalInvested: Number(totalInvestedRows[0]?.total ?? 0),
      recentUsers,
    },
  }
})
