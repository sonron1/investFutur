import { z } from 'zod'
import { requireVerified } from '../../utils/guards'
import { useDb } from '../../utils/db'
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

  const sql = useDb()

  const investmentId = crypto.randomUUID()
  const transactionId = crypto.randomUUID()

  const results = await sql.transaction([
    sql`INSERT INTO investments (id, "userId", "sectorId", "projectId", "projectName", amount, currency, "paymentMethod", status, "expectedRoi", "durationMonths", "maturityDate", "createdAt", "updatedAt")
        VALUES (${investmentId}, ${user.id}, ${body.sectorId}, ${body.projectId}, ${body.projectName}, ${body.amount}, 'EUR', ${body.paymentMethod}, 'PENDING', ${body.expectedRoi}, ${body.durationMonths}, ${maturityDate.toISOString()}, NOW(), NOW())
        RETURNING *`,
    sql`INSERT INTO transactions (id, "userId", "investmentId", type, amount, currency, status, metadata, "createdAt", "updatedAt")
        VALUES (${transactionId}, ${user.id}, ${investmentId}, 'INVESTMENT', ${body.amount}, 'EUR', 'PENDING', ${JSON.stringify({ paymentMethod: body.paymentMethod })}, NOW(), NOW())`,
  ])

  const investment = results[0][0]

  // Send confirmation email (non-blocking)
  const userRows = await sql`SELECT email, "firstName" FROM users WHERE id = ${user.id} LIMIT 1`
  const fullUser = userRows[0] ?? null

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
