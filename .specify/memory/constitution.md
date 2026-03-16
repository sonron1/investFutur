<!-- Sync Impact Report
Version change: 0.0.0 → 1.0.0 (initial ratification)
Added sections: Core Principles (6), Security & Compliance, Development Workflow, Governance
Templates updated: plan-template.md ✅, spec-template.md ✅, tasks-template.md ✅
Follow-up TODOs: none
-->

# InvestFutur Constitution

## Core Principles

### I. Security-First (NON-NEGOTIABLE)
Every feature touching user data, authentication, or financial transactions MUST treat security as a first-class requirement.
- Passwords MUST be hashed with bcrypt/argon2 — never stored in plaintext or localStorage
- All API routes MUST validate JWT tokens server-side via Nuxt server middleware
- Sensitive data (tokens, secrets, API keys) MUST live in environment variables only — never in client code
- All user inputs MUST be validated and sanitized (Zod schemas) before processing
- Rate limiting MUST be applied to all auth endpoints

**Rationale**: This is a financial platform handling real money and personal data. A single security breach destroys user trust permanently.

### II. Database-Driven Persistence
All application state MUST be persisted in PostgreSQL (Neon) via Prisma ORM.
- localStorage is ONLY permitted for UI preferences (theme, language) — never for user data or auth state
- All financial transactions MUST be atomic — use Prisma transactions for multi-step operations
- Every investment, payment, and KYC action MUST have an audit trail in the database
- Database migrations MUST be versioned and reviewable

**Rationale**: localStorage is unreliable, unshared across devices, and completely unsecured. Real financial data requires a real database.

### III. API-First Backend (Nuxt Server Routes)
All business logic MUST live in Nuxt server routes (`server/api/**`) — never in the Pinia stores or Vue components.
- Pinia stores are ONLY for UI state and caching API responses
- Server routes MUST return consistent response shapes: `{ data, error, meta }`
- Every server route MUST be protected by auth middleware unless explicitly public
- No direct database queries from frontend code

**Rationale**: Frontend code is visible to all users. Business logic and data access must be server-side.

### IV. Regulatory Compliance (KYC/AML)
As a financial investment platform operating under French law and AMF oversight:
- User identity verification (KYC) MUST be completed before any investment is processed
- Investment limits MUST be enforced by KYC tier (Basic: €1,000/month, Verified: €50,000/month, Premium: unlimited)
- All transactions MUST be logged with full audit trail for regulatory reporting
- GDPR consent MUST be recorded in the database with timestamp and IP address

**Rationale**: Operating without KYC/AML compliance exposes the company to severe legal penalties.

### V. Transactional Email Integrity
All critical user actions MUST trigger confirmation emails via Resend.
- Registration → email verification (required before login)
- Investment confirmed → receipt email with PDF
- Password reset → secure token link (expires in 1 hour)
- KYC status change → notification email
- Email templates MUST be HTML with plain-text fallback

**Rationale**: Users need reliable communication for financial actions. Silent failures are unacceptable on a financial platform.

### VI. Progressive Enhancement & Performance
The platform MUST be functional with or without JavaScript where possible.
- SSR MUST be used for all public pages (SEO + accessibility)
- Critical user flows (login, invest, checkout) MUST complete in under 3 seconds
- All images MUST have fallbacks and lazy loading
- Mobile-first responsive design is REQUIRED — not optional

**Rationale**: Investors use all device types. A broken mobile experience directly loses revenue.

## Security & Compliance Standards

### Authentication
- JWT access tokens: 15-minute expiry
- Refresh tokens: 7-day expiry, stored httpOnly cookie
- Password requirements: min 8 chars, 1 uppercase, 1 number, 1 special char
- 2FA: TOTP (Google Authenticator compatible) — Phase 3

### Data Protection
- All PII encrypted at rest (Neon handles this)
- KYC documents stored in Vercel Blob or Cloudflare R2 — never in the repo
- GDPR right to erasure: implemented as soft-delete + anonymization
- Data retention: 5 years for financial records (French legal requirement)

### Infrastructure
- All secrets in Vercel environment variables — never in `.env` committed to git
- `.env.example` committed with placeholder values only
- `DATABASE_URL` points to Neon connection pooling URL
- Rate limiting: 5 failed logins per 15 min per IP → temporary block

## Development Workflow

### Branch Strategy
- `master` — production branch, auto-deployed to Vercel
- Feature branches created via `/speckit.specify` command
- PR required for all changes to master (even solo dev — maintains audit trail)

### Quality Gates
- Every new server route MUST have a Zod validation schema
- Every database model change MUST include a Prisma migration
- No `console.log` in production server code — use structured logging
- TypeScript strict mode MUST be maintained

### Speckit Process
All new features MUST follow the speckit workflow:
1. `/speckit.specify` — Define what to build
2. `/speckit.plan` — Technical plan
3. `/speckit.tasks` — Break into tasks
4. `/speckit.implement` — Build it

## Governance

This constitution supersedes all previous practices and localStorage-based patterns.

**Amendment procedure**: Any change to a Core Principle requires documenting the rationale and updating all dependent templates. Security principles (I, IV) require explicit justification — they cannot be downgraded.

**Compliance review**: Every PR must verify that server routes use auth middleware, inputs are validated with Zod, and no secrets are exposed client-side.

**Version policy**: MAJOR = principle removal/redefinition. MINOR = new principle or section. PATCH = wording clarification.

**Version**: 1.0.0 | **Ratified**: 2026-03-16 | **Last Amended**: 2026-03-16
