import { PrismaClient } from '../app/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  const adminPass = process.env.SEED_ADMIN_PASSWORD
  const demoPass  = process.env.SEED_DEMO_PASSWORD

  if (!adminPass || !demoPass) {
    throw new Error(
      'SEED_ADMIN_PASSWORD and SEED_DEMO_PASSWORD must be set in .env before running seed.\n' +
      'Example: SEED_ADMIN_PASSWORD="..." SEED_DEMO_PASSWORD="..." npm run db:seed'
    )
  }

  const adminPassword = await bcrypt.hash(adminPass, 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@investfutur.fr' },
    update: {},
    create: {
      email: 'admin@investfutur.fr',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'InvestFutur',
      role: 'ADMIN',
      isVerified: true,
      kycStatus: 'APPROVED',
      kycTier: 3,
    },
  })
  console.log('✅ Admin created:', admin.email)

  const demoPassword = await bcrypt.hash(demoPass, 12)
  const demo = await prisma.user.upsert({
    where: { email: 'demo@investfutur.fr' },
    update: {},
    create: {
      email: 'demo@investfutur.fr',
      password: demoPassword,
      firstName: 'Sophie',
      lastName: 'Martin',
      role: 'USER',
      isVerified: true,
      kycStatus: 'APPROVED',
      kycTier: 1,
      country: 'FR',
      phone: '+33 6 00 00 00 00',
    },
  })
  console.log('✅ Demo user created:', demo.email)

  const investments = await prisma.investment.createMany({
    skipDuplicates: true,
    data: [
      {
        userId: demo.id,
        sectorId: 'ia-deep-tech',
        projectId: 'quantumleap',
        projectName: 'QuantumLeap Computing',
        amount: 2500,
        paymentMethod: 'ethereum',
        status: 'ACTIVE',
        expectedRoi: 28.5,
        durationMonths: 12,
        maturityDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
      {
        userId: demo.id,
        sectorId: 'energies-renouvelables',
        projectId: 'windtech',
        projectName: 'WindTech Solutions',
        amount: 1000,
        paymentMethod: 'usdt',
        status: 'ACTIVE',
        expectedRoi: 24.2,
        durationMonths: 18,
        maturityDate: new Date(Date.now() + 18 * 30 * 24 * 60 * 60 * 1000),
      },
    ],
  })
  console.log('✅ Demo investments created:', investments.count)

  console.log('\n🎉 Seed complete! Check your .env for the credentials.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
