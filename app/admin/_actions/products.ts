'use server'

import db from '@/db/db'
import { z } from 'zod'
import fs from 'fs/promises'
import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary'
import {
  deleteFile,
  extractFilenameFromURL,
  FOLDER,
  IMAGES_FOLDER,
} from '@/lib/productFiles'
import { error } from 'console'
import { fileDataToSave, fileExists } from '@/lib/files'
import { productImageUpload } from '@/lib/cloudinaryUtils'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const fileSchema = z.instanceof(File, { message: 'Required' })
const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith('image/'),
)

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: z.string().min(1),//fileSchema.refine(file => file.size > 0, 'Required'),
  image: imageSchema.refine(file => file.size > 0, 'Required'),
})


export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }
  const productData = result.data
  const completed = await productImageUpload(productData.image)
  const { success, data, error } = completed
  if (success/* && fileDoesExist*/) {
    await db.product.create({
      data: {
        isAvailableForPurchase: false,
        name: productData.name,
        description: productData.description,
        priceInCents: productData.priceInCents,
        filePath: productData.file,//fileUrl,
        imagePath: data?.url,
      },
    })

    revalidatePath('/')
    revalidatePath('/products')
    redirect('/admin/products')
  } else {
    console.log(error?.message)
  }
}

const editSchema = addSchema.extend({
  image: imageSchema.optional(),
})

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData,
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const productData = result.data
  const product = await db.product.findUnique({ where: { id } })

  if (product == null) return notFound()
  const img = productData.image
  if (img) {
    const completed = await productImageUpload(img)
    const { success, data, error } = completed

    await db.product.update({
      where: { id },
      data: {
        isAvailableForPurchase: false,
        name: productData.name,
        description: productData.description,
        priceInCents: productData.priceInCents,
        filePath: product.filePath,
        imagePath: success ? data?.url : product.imagePath
      },
    })
  } else {

    await db.product.update({
      where: { id },
      data: {
        isAvailableForPurchase: false,
        name: productData.name,
        description: productData.description,
        priceInCents: productData.priceInCents,
        filePath: product.filePath,
        imagePath: product.imagePath
      },
    })

    revalidatePath('/')
    revalidatePath('/products')
    redirect('/admin/products')
  }
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean,
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } })

  revalidatePath('/')
  revalidatePath('/products')
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } })

  if (product == null) return notFound()

  const [filename, extension]: [string, string] = extractFilenameFromURL(
    product.filePath,
  )
  const filePublicId = `${filename}.${extension}`
  await deleteFile(FOLDER, filePublicId)

  const [imageFileName, imageExtension]: [string, string] =
    extractFilenameFromURL(product.imagePath)
  const imageFilePublicId = `${imageFileName}.${imageExtension}`
  await deleteFile(IMAGES_FOLDER, imageFilePublicId)

  // await fs.unlink(product.filePath)
  // await fs.unlink(`public${product.imagePath}`)

  revalidatePath('/')
  revalidatePath('/products')
}
