"use server"

import { generateDownloadLink } from "@/lib/googleCloud"

export async function generateLink(filePath: string): Promise<String> {
    const urlObj = new URL(filePath);
    const fileName = urlObj.pathname.split('/').pop() || ''; // Extract the file name from the path
    try {
        // Generate a signed URL with an expiration time of 1 minute
        const url = await generateDownloadLink('tshirst_store', fileName, 60);
        return url
    } catch (error) {
        console.log('Error in generating a download link')
        return ''
    }
}
