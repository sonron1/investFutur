import { requireAdmin } from '../../utils/guards'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const [
    totalUsers,
    pendingKyc,
    totalInvestments,
    activeInvestments,
    recentUsers,
  ] = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.count({ where: { kycStatus: 'SUBMITTED' } }),
    prisma.investment.count(),
    prisma.investment.count({ where: { status: 'ACTIVE' } }),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, firstName: true, lastName: true, email: true, kycStatus: true, createdAt: true },
    }),
  ])

  const totalInvestedResult = await prisma.investment.aggregate({
    where: { status: { in: ['ACTIVE', 'COMPLETED'] } },
    _sum: { amount: true },
  })

  return {
    data: {
      totalUsers,
      pendingKyc,
      totalInvestments,
      activeInvestments,
      totalInvested: totalInvestedResult._sum.amount ?? 0,
      recentUsers,
    },
  }
})
