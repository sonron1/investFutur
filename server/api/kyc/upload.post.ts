import { z } from 'zod'
import { requireAuth } from '../../utils/guards'
import { useDb } from '../../utils/db'
import { uploadKycDocument } from '../../utils/cloudinary'

const ALLOWED_TYPES = ['identity_front', 'identity_back', 'proof_of_address', 'selfie'] as const

const schema = z.object({
  type: z.enum(ALLOWED_TYPES),
  file: z.string().min(1), // base64 data URL
  fileName: z.string().min(1).max(255),
})

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const body = await readBody(event)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    throw createError({ statusCode: 422, message: parsed.error.errors[0]?.message ?? 'Données invalides' })
  }

  const { type, file, fileName } = parsed.data

  // Validate base64 size (max 10MB)
  const base64Length = file.length - (file.indexOf(',') + 1)
  const sizeBytes = (base64Length * 3) / 4
  if (sizeBytes > 10 * 1024 * 1024) {
    throw createError({ statusCode: 413, message: 'Fichier trop volumineux (max 10 Mo)' })
  }

  const sql = useDb()

  // Check KYC status — cannot upload if already approved
  const rows = await sql`SELECT "kycStatus" FROM users WHERE id = ${user.id} LIMIT 1`
  if (rows[0]?.kycStatus === 'APPROVED') {
    throw createError({ statusCode: 409, message: 'Votre KYC est déjà approuvé' })
  }

  // Upload to Cloudinary
  const { url, publicId } = await uploadKycDocument(file, user.id, type)

  // Upsert — replace existing document of same type
  const existing = await sql`
    SELECT id FROM kyc_documents
    WHERE "userId" = ${user.id} AND type = ${type}
    LIMIT 1`

  let doc
  if (existing.length > 0) {
    const updated = await sql`
      UPDATE kyc_documents
      SET "fileUrl" = ${url}, "fileName" = ${fileName}, status = 'PENDING', notes = NULL, "updatedAt" = NOW()
      WHERE id = ${existing[0].id}
      RETURNING *`
    doc = updated[0]
  } else {
    const inserted = await sql`
      INSERT INTO kyc_documents ("userId", type, "fileName", "fileUrl", status, "createdAt", "updatedAt")
      VALUES (${user.id}, ${type}, ${fileName}, ${url}, 'PENDING', NOW(), NOW())
      RETURNING *`
    doc = inserted[0]
  }

  return { data: { id: doc.id, type: doc.type, fileName: doc.fileName, fileUrl: doc.fileUrl, status: doc.status } }
})
