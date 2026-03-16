import { requireAuth } from '../../utils/guards'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const id = getRouterParam(event, 'id')

  const investment = await prisma.investment.findUnique({ where: { id } })

  if (!investment) {
    throw createError({ statusCode: 404, message: 'Investissement introuvable' })
  }

  if (investment.userId !== user.id && user.role !== 'ADMIN') {
    throw createError({ statusCode: 403, message: 'Non autorisé' })
  }

  if (investment.status === 'ACTIVE' || investment.status === 'COMPLETED') {
    throw createError({ statusCode: 400, message: 'Impossible d\'annuler un investissement actif ou terminé' })
  }

  await prisma.investment.update({
    where: { id },
    data: { status: 'CANCELLED' },
  })

  return { data: { message: 'Investissement annulé' } }
})
