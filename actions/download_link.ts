"use server"

import { generateDownloadLink } from "@/lib/googleCloud"

export async function generateLink(filePath: string) {
    try {
        // Generate a signed URL with an expiration time of 1 hour
        const url = await generateDownloadLink('tshirst_store', filePath, 3600);

        return url
    } catch (error) {
        return error
    }
}
