import { z } from 'zod'
import { requireAdmin } from '../../../../utils/guards'
import { prisma } from '../../../../utils/db'

const schema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  notes: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = getRouterParam(event, 'id')
  const { status, notes } = await readValidatedBody(event, schema.parse)

  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) {
    throw createError({ statusCode: 404, message: 'Utilisateur introuvable' })
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      kycStatus: status,
      kycTier: status === 'APPROVED' ? 1 : 0,
    },
    select: { id: true, email: true, firstName: true, kycStatus: true, kycTier: true },
  })

  return { data: updatedUser }
})
