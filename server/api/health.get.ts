// Diagnostic endpoint — helps identify the exact runtime crash cause on Vercel
export default defineEventHandler(async () => {
  const checks: Record<string, any> = { runtime: 'ok' }

  checks.env = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    JWT_SECRET: !!process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  }

  try {
    const { neon } = await import('@neondatabase/serverless')
    checks.neon_import = 'ok'
    if (process.env.DATABASE_URL) {
      try {
        const sql = neon(process.env.DATABASE_URL)
        const result = await sql`SELECT 1 AS ping`
        checks.neon_query = result[0]?.ping === 1 ? 'ok' : 'unexpected'
      } catch (e: any) {
        checks.neon_query = `error: ${e.message}`
      }
    }
  } catch (e: any) {
    checks.neon_import = `error: ${e.message}`
  }

  return { status: 'ok', checks }
})
