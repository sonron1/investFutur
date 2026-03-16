import { requireAuth } from '../../utils/guards'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)

  const query = getQuery(event)
  const status = query.status as string | undefined
  const page = Math.max(1, parseInt(query.page as string) || 1)
  const limit = Math.min(50, parseInt(query.limit as string) || 20)
  const skip = (page - 1) * limit

  const where = {
    userId: user.id,
    ...(status && status !== 'all' ? { status: status.toUpperCase() as any } : {}),
  }

  const [investments, total] = await prisma.$transaction([
    prisma.investment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        transactions: {
          where: { status: 'CONFIRMED' },
          select: { amount: true, type: true, createdAt: true },
        },
      },
    }),
    prisma.investment.count({ where }),
  ])

  return {
    data: investments,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  }
})
