import { z } from 'zod'
import { requireVerified } from '../../utils/guards'
import { prisma } from '../../utils/db'
import { sendInvestmentConfirmationEmail } from '../../utils/email'

const schema = z.object({
  sectorId: z.string().min(1),
  projectId: z.string().min(1),
  projectName: z.string().min(1),
  amount: z.number().positive('Le montant doit être positif'),
  paymentMethod: z.enum(['bitcoin', 'ethereum', 'usdt', 'bnb']),
  expectedRoi: z.number().positive(),
  durationMonths: z.number().int().min(1).default(12),
})

export default defineEventHandler(async (event) => {
  const user = requireVerified(event)
  const body = await readValidatedBody(event, schema.parse)

  // Minimum investment amount check
  if (body.amount < 10) {
    throw createError({ statusCode: 400, message: 'Montant minimum d\'investissement : 10 €' })
  }

  const maturityDate = new Date()
  maturityDate.setMonth(maturityDate.getMonth() + body.durationMonths)

  const investment = await prisma.$transaction(async (tx) => {
    const investment = await tx.investment.create({
      data: {
        userId: user.id,
        sectorId: body.sectorId,
        projectId: body.projectId,
        projectName: body.projectName,
        amount: body.amount,
        paymentMethod: body.paymentMethod,
        status: 'PENDING',
        expectedRoi: body.expectedRoi,
        durationMonths: body.durationMonths,
        maturityDate,
      },
    })

    await tx.transaction.create({
      data: {
        userId: user.id,
        investmentId: investment.id,
        type: 'INVESTMENT',
        amount: body.amount,
        status: 'PENDING',
        metadata: { paymentMethod: body.paymentMethod },
      },
    })

    return investment
  })

  // Send confirmation email (non-blocking)
  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { email: true, firstName: true },
  })

  if (fullUser) {
    sendInvestmentConfirmationEmail(fullUser.email, fullUser.firstName, {
      projectName: body.projectName,
      amount: body.amount,
      currency: 'EUR',
      expectedRoi: body.expectedRoi,
      maturityDate,
    }).catch(console.error)
  }

  return { data: investment }
})
