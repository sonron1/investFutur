import { z } from 'zod'
import { prisma } from '../../utils/db'
import { generateSecureToken } from '../../utils/auth'
import { sendPasswordResetEmail } from '../../utils/email'

const schema = z.object({
  email: z.string().email().toLowerCase(),
})

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, schema.parse)

  // Always return success (prevent user enumeration)
  const user = await prisma.user.findUnique({ where: { email } })

  if (user) {
    // Invalidate existing tokens
    await prisma.passwordResetToken.updateMany({
      where: { userId: user.id, used: false },
      data: { used: true },
    })

    const token = generateSecureToken()
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    })

    sendPasswordResetEmail(user.email, user.firstName, token).catch(console.error)
  }

  return {
    data: {
      message: 'Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.',
    },
  }
})
