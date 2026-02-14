import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

export async function GET() {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const videos = await prisma.video.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(videos)
    } catch {
        return NextResponse.json({ error: "Error fetching videos" }, { status: 500 })
    }
}
