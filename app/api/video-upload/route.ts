import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';


const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME?.trim() ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY?.trim();
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

// Configuration
cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret
});

interface CloudinaryUploadResult {
    public_id: string;
    bytes: number;
    duration?: number
    [key: string]: any
}

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!cloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
            return NextResponse.json({ error: "Cloudinary credentials not configured on server" }, { status: 500 })
        }

        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const title = String(formData.get("title") || "").trim();
        const description = String(formData.get("description") || "").trim();
        const originalSize = String(formData.get("originalSize") || "");

        if (!file) {
            return NextResponse.json({ error: "File not found" }, { status: 400 })
        }

        if (!title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "video",
                        folder: "video-uploads",
                        transformation: [
                            {quality: "auto", fetch_format: "mp4"},
                        ]
                    },
                    (error, result) => {
                        if(error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                )
                uploadStream.end(buffer)
            }
        )
        const video = await prisma.video.create({
            data: {
                userId,
                title,
                description: description || null,
                publicId: result.public_id,
                originalSize: originalSize,
                compressedSize: String(result.bytes),
                duration: result.duration || 0,
            }
        })
        return NextResponse.json(video)

    } catch (error: unknown) {
        console.error("Video upload failed:", error)

        const message = error instanceof Error ? error.message : "Unknown server error"

        if (message.includes('column "userId"') || message.includes("Video_userId_createdAt_idx")) {
            return NextResponse.json(
                { error: "Database is not migrated yet. Run Prisma migration in production." },
                { status: 500 }
            )
        }

        return NextResponse.json({ error: message }, { status: 500 })
    }

}
