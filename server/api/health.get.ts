// Diagnostic endpoint — helps identify the exact runtime crash cause on Vercel
export default defineEventHandler(async () => {
  const checks: Record<string, any> = {}

  // 1. Basic function execution
  checks.runtime = 'ok'

  // 2. Environment variables presence (not values)
  checks.env = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    JWT_SECRET: !!process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: !!process.env.JWT_REFRESH_SECRET,
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
  }

  // 3. Try importing neon
  try {
    const { neon } = await import('@neondatabase/serverless')
    checks.neon_import = 'ok'

    // 4. Try a real neon query
    if (process.env.DATABASE_URL) {
      try {
        const sql = neon(process.env.DATABASE_URL)
        const result = await sql`SELECT 1 AS ping`
        checks.neon_query = result[0]?.ping === 1 ? 'ok' : 'unexpected result'
      } catch (e: any) {
        checks.neon_query = `error: ${e.message}`
      }
    } else {
      checks.neon_query = 'skipped — no DATABASE_URL'
    }
  } catch (e: any) {
    checks.neon_import = `error: ${e.message}`
  }

  // 5. Try importing @prisma/client
  try {
    await import('@prisma/client')
    checks.prisma_import = 'ok'
  } catch (e: any) {
    checks.prisma_import = `error: ${e.message}`
  }

  // 6. Try importing @prisma/adapter-neon
  try {
    await import('@prisma/adapter-neon')
    checks.adapter_import = 'ok'
  } catch (e: any) {
    checks.adapter_import = `error: ${e.message}`
  }

  return { status: 'ok', checks }
})
