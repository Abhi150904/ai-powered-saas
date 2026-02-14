import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const title = String(body?.title || "").trim();
        const description = String(body?.description || "").trim();
        const publicId = String(body?.publicId || "").trim();
        const originalSize = String(body?.originalSize || "").trim();
        const compressedSize = String(body?.compressedSize || "").trim();
        const duration = Number(body?.duration || 0);

        if (!title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 })
        }

        if (!publicId) {
            return NextResponse.json({ error: "Cloudinary publicId is required" }, { status: 400 })
        }

        if (!originalSize || !compressedSize) {
            return NextResponse.json({ error: "Video size metadata is required" }, { status: 400 })
        }

        const video = await prisma.video.create({
            data: {
                userId,
                title,
                description: description || null,
                publicId,
                originalSize: originalSize,
                compressedSize,
                duration: Number.isFinite(duration) ? duration : 0,
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
