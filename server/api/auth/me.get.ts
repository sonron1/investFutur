import { requireAuth } from '../../utils/guards'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const authUser = requireAuth(event)

  const user = await prisma.user.findUnique({
    where: { id: authUser.id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      country: true,
      address: true,
      role: true,
      isVerified: true,
      kycStatus: true,
      kycTier: true,
      createdAt: true,
      _count: {
        select: { investments: true, transactions: true },
      },
    },
  })

  if (!user) {
    throw createError({ statusCode: 404, message: 'Utilisateur introuvable' })
  }

  return { data: user }
})
