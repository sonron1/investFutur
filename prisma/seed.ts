import { PrismaClient } from '../app/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('***REDACTED***', 12)
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

  // Create demo user
  const demoPassword = await bcrypt.hash('***REDACTED***', 12)
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

  // Seed demo investments
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

  console.log('\n🎉 Seed complete!')
  console.log('─────────────────────────────────────')
  console.log('Admin:     admin@investfutur.fr / ***REDACTED***')
  console.log('Demo user: demo@investfutur.fr  / ***REDACTED***')
  console.log('─────────────────────────────────────')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
