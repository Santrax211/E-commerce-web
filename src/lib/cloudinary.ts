import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadImage = async (file: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "shopnow",
      transformation: [{ width: 1000, height: 1000, crop: "limit" }, { quality: "auto" }],
    })
    return result.secure_url
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error)
    throw new Error("Failed to upload image")
  }
}

export const deleteImage = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error)
    throw new Error("Failed to delete image")
  }
}

// Extraer el public_id de una URL de Cloudinary
export const getPublicIdFromUrl = (url: string): string => {
  // Ejemplo de URL: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/shopnow/image_id.jpg
  const parts = url.split("/")
  const filename = parts[parts.length - 1]
  const folderAndFilename = `shopnow/${filename.split(".")[0]}`
  return folderAndFilename
}

export default cloudinary

