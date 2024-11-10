import { Product } from '@prisma/client'
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

type UploadsCompleted = {
  fileUrl?: string
  imgUrl?: string
  error?: Error
}

type ResponseType = UploadApiResponse | UploadApiErrorResponse

const TAG = 'products'
export const FOLDER = 'products'
export const IMAGES_FOLDER = 'products_images'
const PRESET = 'ecommerce_digital'

function isUploadApiResponse(response: any): response is UploadApiResponse {
  return 'url' in response
}

export function extractFilenameFromURL(url: string): [string, string] {
  const parts: string[] = url.split('/')
  const filenameWithExt: string = parts[parts.length - 1]
  const [name, ext]: string[] = filenameWithExt.split('.')
  return [name, ext]
}

export async function deleteFile(folder: string, filePublicId: string) {
  console.log(` delete:   ${folder}/${filePublicId}`)
  try {
    cloudinary.uploader
      .destroy(`${folder}/${filePublicId}`)
      .then(result => console.log(result))
  } catch (error) {
    console.log(error)
  }
}
