import { v2 as cloudinary } from 'cloudinary'

let _configured = false

export function useCloudinary() {
  if (!_configured) {
    const config = useRuntimeConfig()
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    })
    _configured = true
  }
  return cloudinary
}

export async function uploadKycDocument(
  base64Data: string,
  userId: string,
  docType: string
): Promise<{ url: string; publicId: string }> {
  const cloud = useCloudinary()

  const result = await cloud.uploader.upload(base64Data, {
    folder: `investfutur/kyc/${userId}`,
    public_id: `${docType}_${Date.now()}`,
    resource_type: 'image',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'webp'],
    max_bytes: 10 * 1024 * 1024, // 10 MB
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  })

  return { url: result.secure_url, publicId: result.public_id }
}

export async function deleteKycDocument(publicId: string): Promise<void> {
  const cloud = useCloudinary()
  await cloud.uploader.destroy(publicId, { resource_type: 'image' })
}
