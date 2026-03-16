import { z } from 'zod'
import { prisma } from '../../utils/db'
import { sendWelcomeEmail } from '../../utils/email'

const schema = z.object({
  token: z.string().min(1),
})

export default defineEventHandler(async (event) => {
  const { token } = await readValidatedBody(event, schema.parse)

  const verification = await prisma.emailVerification.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!verification) {
    throw createError({ statusCode: 400, message: 'Token de vérification invalide' })
  }

  if (verification.expiresAt < new Date()) {
    await prisma.emailVerification.delete({ where: { id: verification.id } })
    throw createError({ statusCode: 400, message: 'Token expiré. Demandez un nouvel email de vérification.' })
  }

  if (verification.user.isVerified) {
    return { data: { message: 'Email déjà vérifié' } }
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: verification.userId }, data: { isVerified: true } }),
    prisma.emailVerification.delete({ where: { id: verification.id } }),
  ])

  sendWelcomeEmail(verification.user.email, verification.user.firstName).catch(console.error)

  return { data: { message: 'Email vérifié avec succès. Vous pouvez maintenant vous connecter.' } }
})
