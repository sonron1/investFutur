import { PrismaClient } from '../../app/generated/prisma'

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

// Singleton pattern — prevent multiple Prisma instances in dev (hot reload)
export const prisma = globalThis.__prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma
}
