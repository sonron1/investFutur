import { neon } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) throw new Error('DATABASE_URL is not set')

  const sql = neon(databaseUrl)
  const adapter = new PrismaNeon(sql)
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

// Lazy getter — client is created on first access, not at module load time.
// This prevents cold-start crashes on Vercel when env vars are injected after
// the module is first imported.
function getPrisma(): PrismaClient {
  if (globalThis.__prisma) return globalThis.__prisma

  const client = createPrismaClient()

  if (process.env.NODE_ENV !== 'production') {
    // Prevent multiple instances during hot reload in dev
    globalThis.__prisma = client
  }

  return client
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return (getPrisma() as any)[prop]
  },
})
