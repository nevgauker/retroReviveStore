import { Storage } from '@google-cloud/storage';

const _storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});



export async function generateDownloadLink(bucketName: string, filePath: string, expirationInSeconds: number): Promise<String> {
    const bucket = _storage.bucket(bucketName);
    const file = bucket.file(filePath);

    // Generate a signed URL for a specific time period
    const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + expirationInSeconds * 1000,
    });

    return url;
}




