import { requireAuth } from '../../utils/guards'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)

  const [investments, transactions] = await prisma.$transaction([
    prisma.investment.findMany({
      where: { userId: user.id },
      select: { amount: true, status: true, expectedRoi: true, createdAt: true },
    }),
    prisma.transaction.findMany({
      where: { userId: user.id, status: 'CONFIRMED' },
      select: { amount: true, type: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ])

  const totalInvested = investments
    .filter((i) => i.status === 'ACTIVE' || i.status === 'COMPLETED')
    .reduce((sum, i) => sum + i.amount, 0)

  const activeCount = investments.filter((i) => i.status === 'ACTIVE').length
  const pendingCount = investments.filter((i) => i.status === 'PENDING').length

  const avgRoi = investments.length > 0
    ? investments.reduce((sum, i) => sum + i.expectedRoi, 0) / investments.length
    : 0

  const estimatedGains = investments
    .filter((i) => i.status === 'ACTIVE' || i.status === 'COMPLETED')
    .reduce((sum, i) => sum + (i.amount * i.expectedRoi) / 100, 0)

  return {
    data: {
      totalInvested,
      activeCount,
      pendingCount,
      avgRoi: Math.round(avgRoi * 10) / 10,
      estimatedGains: Math.round(estimatedGains * 100) / 100,
      recentTransactions: transactions,
    },
  }
})
