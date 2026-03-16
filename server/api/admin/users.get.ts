import { requireAdmin } from '../../utils/guards'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const query = getQuery(event)
  const page = Math.max(1, parseInt(query.page as string) || 1)
  const limit = Math.min(100, parseInt(query.limit as string) || 20)
  const skip = (page - 1) * limit
  const search = query.search as string | undefined
  const kycStatus = query.kycStatus as string | undefined

  const where = {
    ...(search ? {
      OR: [
        { email: { contains: search, mode: 'insensitive' as const } },
        { firstName: { contains: search, mode: 'insensitive' as const } },
        { lastName: { contains: search, mode: 'insensitive' as const } },
      ],
    } : {}),
    ...(kycStatus && kycStatus !== 'all' ? { kycStatus: kycStatus.toUpperCase() as any } : {}),
  }

  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        kycStatus: true,
        kycTier: true,
        createdAt: true,
        _count: { select: { investments: true } },
      },
    }),
    prisma.user.count({ where }),
  ])

  return {
    data: users,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  }
})
