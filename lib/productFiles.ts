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

export async function updateProductFiles(
  product: Product,
  productFile?: File,
  productImage?: File,
) {
  const res: UploadsCompleted = {}

  const uploadPromises = []
  if (productFile) {
    const [filename, extension]: [string, string] = extractFilenameFromURL(
      product.filePath,
    )

    const filePublicId = `${filename}.${extension}`

    await deleteFile(FOLDER, filePublicId)
    const arrayBuffer = await productFile.arrayBuffer()
    const fileBuffer = Buffer.from(arrayBuffer)
    const promise = new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: filePublicId,
            tags: [TAG],
            folder: FOLDER,
            upload_preset: PRESET,
          },
          function (error, result) {
            if (error) {
              reject(error)
              return
            }
            resolve(result)
          },
        )
        .end(fileBuffer)
    })
    uploadPromises.push(promise)
  }
  if (productImage) {
    const [filename, extension]: [string, string] = extractFilenameFromURL(
      product.imagePath,
    )

    const filePublicId = `${filename}.${extension}`
    await deleteFile(IMAGES_FOLDER, filePublicId)
    const arrayBuffer = await productImage.arrayBuffer()
    const fileBuffer = Buffer.from(arrayBuffer)
    const promise = new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: filePublicId,
            tags: [TAG],
            folder: IMAGES_FOLDER,
            upload_preset: PRESET,
          },
          function (error, result) {
            if (error) {
              reject(error)
              return
            }
            resolve(result)
          },
        )
        .end(fileBuffer)
    })
    uploadPromises.push(promise)
  }

  try {
    const results = await Promise.all(uploadPromises)
    // 2 promises: file,image
    if (results.length == 2) {
      console.log(`2 files saved: ${results}`)
      const fileResult: ResponseType = results[0] as ResponseType
      const imgResult: ResponseType = results[1] as ResponseType
      if (isUploadApiResponse(fileResult) && isUploadApiResponse(imgResult)) {
        const fileUrl = fileResult.url
        const imgUrl = imgResult.url
        console.log(`urls: ${fileUrl} ${imgUrl}`)
        res.fileUrl = fileUrl
        res.imgUrl = imgUrl
        return res
      } else {
        //upload errors
        const error = new Error('Error in files upload')
        res.error = error
        return res
      }
    } else if (results.length == 1) {
      // 1 promise file or image
      const result = results[0] as ResponseType
      if (isUploadApiResponse(result)) {
        const url = result.url
        if (productFile) {
          res.fileUrl = url
        } else {
          res.imgUrl = url
        }
        return res
      } else {
        //upload errors
        const error = new Error('Error in files upload')
        res.error = error
        return res
      }
    } else {
      res.error = new Error('No files to upload')
      return res
    }
  } catch (error) {
    if (error instanceof Error) {
      res.error = error
      return res
    }
    const err = new Error('Error in files upload')
    res.error = err
    return res
  }
}

export async function productFilesUpload(
  productFile: File,
  productImage: File,
) {
  const res: UploadsCompleted = {}

  const arrayBuffer = await productFile.arrayBuffer()
  const fileBuffer = Buffer.from(arrayBuffer)
  const filePublicId = `${crypto.randomUUID()}-${productFile.name}`

  const imgArrayBuffer = await productImage.arrayBuffer()
  const imgFileBuffer = Buffer.from(imgArrayBuffer)
  const imgPublicId = `${crypto.randomUUID()}-${productImage.name}`

  const uploadPromises = [
    new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: filePublicId,
            tags: [TAG],
            folder: FOLDER,
            upload_preset: PRESET,
          },
          function (error, result) {
            if (error) {
              reject(error)
              return
            }
            resolve(result)
          },
        )
        .end(fileBuffer)
    }),
    new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            tags: [TAG],
            folder: IMAGES_FOLDER,
            public_id: imgPublicId,
            upload_preset: PRESET,
          },
          function (error, result) {
            if (error) {
              reject(error)
              return
            }
            resolve(result)
          },
        )
        .end(imgFileBuffer)
    }),
  ]

  try {
    const [file, img] = await Promise.all(uploadPromises)
    const fileResult: ResponseType = file as ResponseType
    const imgResult: ResponseType = img as ResponseType

    if (isUploadApiResponse(fileResult) && isUploadApiResponse(imgResult)) {
      const fileUrl = fileResult.url
      const imgUrl = imgResult.url
      res.fileUrl = fileUrl
      res.imgUrl = imgUrl
      return res
    } else {
      //upload errors
      const error = new Error('Error in files upload')
      res.error = error
      return res
    }
  } catch (error) {
    if (error instanceof Error) {
      res.error = error
      return res
    }
    const err = new Error('Error in files upload')
    res.error = err
    return res
  }
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
