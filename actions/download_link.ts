"use server"

import { generateDownloadLink } from "@/lib/googleCloud"

export async function generateLink(filePath: string): Promise<String> {
    try {
        // Generate a signed URL with an expiration time of 1 hour
        const url = await generateDownloadLink('tshirst_store', filePath, 3600);
        return url
    } catch (error) {
        console.log('Error in generating a download link')
        return ''
    }
}
