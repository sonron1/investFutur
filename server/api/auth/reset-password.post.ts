import { z } from 'zod'
import { prisma } from '../../utils/db'
import { hashPassword, validatePasswordStrength } from '../../utils/auth'

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
})

export default defineEventHandler(async (event) => {
  const { token, password } = await readValidatedBody(event, schema.parse)

  const strength = validatePasswordStrength(password)
  if (!strength.valid) {
    throw createError({ statusCode: 400, message: strength.message })
  }

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
    throw createError({ statusCode: 400, message: 'Token invalide ou expiré' })
  }

  const hashedPassword = await hashPassword(password)

  await prisma.$transaction([
    prisma.user.update({ where: { id: resetToken.userId }, data: { password: hashedPassword } }),
    prisma.passwordResetToken.update({ where: { id: resetToken.id }, data: { used: true } }),
    // Revoke all sessions (force re-login everywhere)
    prisma.session.deleteMany({ where: { userId: resetToken.userId } }),
  ])

  return { data: { message: 'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.' } }
})
