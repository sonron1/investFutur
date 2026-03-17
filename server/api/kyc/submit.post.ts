import { requireAuth } from '../../utils/guards'
import { useDb } from '../../utils/db'
import { sendKycReceivedEmail } from '../../utils/email'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const sql = useDb()

  // Check current KYC status
  const userRows = await sql`
    SELECT "kycStatus", email, "firstName", "lastName", phone, country, address
    FROM users WHERE id = ${user.id} LIMIT 1`

  const currentUser = userRows[0]

  if (currentUser?.kycStatus === 'APPROVED') {
    throw createError({ statusCode: 409, message: 'Votre KYC est déjà approuvé' })
  }
  if (currentUser?.kycStatus === 'SUBMITTED') {
    throw createError({ statusCode: 409, message: 'Votre dossier est déjà en cours de vérification' })
  }

  // Check required profile fields
  if (!currentUser?.phone || !currentUser?.country || !currentUser?.address) {
    throw createError({ statusCode: 422, message: 'Veuillez compléter votre profil (téléphone, pays, adresse) avant de soumettre votre KYC' })
  }

  // Check required documents: identity_front + proof_of_address minimum
  const docs = await sql`
    SELECT type, status FROM kyc_documents
    WHERE "userId" = ${user.id} AND status = 'PENDING'`

  const docTypes = docs.map((d: any) => d.type)
  if (!docTypes.includes('identity_front')) {
    throw createError({ statusCode: 422, message: 'Document requis : recto de votre pièce d\'identité' })
  }
  if (!docTypes.includes('proof_of_address')) {
    throw createError({ statusCode: 422, message: 'Document requis : justificatif de domicile' })
  }

  // Update user KYC status to SUBMITTED
  await sql`UPDATE users SET "kycStatus" = 'SUBMITTED', "updatedAt" = NOW() WHERE id = ${user.id}`

  // Notify user by email (non-blocking)
  sendKycReceivedEmail(currentUser.email, currentUser.firstName, docTypes).catch((err) =>
    console.error('KYC submit email error:', err)
  )

  return { data: { kycStatus: 'SUBMITTED', message: 'Dossier soumis avec succès' } }
})
