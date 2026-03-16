import { requireAuth } from '../../utils/guards'
import { useDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)

  const sql = useDb()

  const investments = await sql`
    SELECT amount, status, "expectedRoi", "createdAt"
    FROM investments
    WHERE "userId" = ${user.id}`

  const recentTransactions = await sql`
    SELECT amount, type, "createdAt"
    FROM transactions
    WHERE "userId" = ${user.id} AND status = 'CONFIRMED'
    ORDER BY "createdAt" DESC
    LIMIT 10`

  const totalInvested = investments
    .filter((i: any) => i.status === 'ACTIVE' || i.status === 'COMPLETED')
    .reduce((sum: number, i: any) => sum + Number(i.amount), 0)

  const activeCount = investments.filter((i: any) => i.status === 'ACTIVE').length
  const pendingCount = investments.filter((i: any) => i.status === 'PENDING').length

  const avgRoi = investments.length > 0
    ? investments.reduce((sum: number, i: any) => sum + Number(i.expectedRoi), 0) / investments.length
    : 0

  const estimatedGains = investments
    .filter((i: any) => i.status === 'ACTIVE' || i.status === 'COMPLETED')
    .reduce((sum: number, i: any) => sum + (Number(i.amount) * Number(i.expectedRoi)) / 100, 0)

  return {
    data: {
      totalInvested,
      activeCount,
      pendingCount,
      avgRoi: Math.round(avgRoi * 10) / 10,
      estimatedGains: Math.round(estimatedGains * 100) / 100,
      recentTransactions,
    },
  }
})
