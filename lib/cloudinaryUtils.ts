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

const TAG = 'products'
export const FOLDER = 'products'
export const IMAGES_FOLDER = 'products_images'
const PRESET = 'ecommerce_digital'

type ResponseType = UploadApiResponse | UploadApiErrorResponse

function isUploadApiResponse(response: any): response is UploadApiResponse {
    return 'url' in response
}

type UploadResult = {
    success: boolean;
    data?: ResponseType;
    error?: Error;
};

export async function productImageUpload(productImage: File): Promise<UploadResult> {
    try {
        const imgArrayBuffer = await productImage.arrayBuffer();
        const imgFileBuffer = Buffer.from(imgArrayBuffer);
        const imgPublicId = `${crypto.randomUUID()}-${productImage.name}`;

        const imgUploadPromise = new Promise<ResponseType>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        tags: [TAG],
                        folder: IMAGES_FOLDER,
                        public_id: imgPublicId,
                        upload_preset: PRESET,
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result as ResponseType);
                        }
                    }
                )
                .end(imgFileBuffer);
        });

        const imgResult = await imgUploadPromise;

        if (isUploadApiResponse(imgResult)) {
            return { success: true, data: imgResult };
        } else {
            return { success: false, error: new Error('Invalid response from upload API') };
        }
    } catch (error) {
        return { success: false, error: error instanceof Error ? error : new Error('Error in file upload') };
    }
}
