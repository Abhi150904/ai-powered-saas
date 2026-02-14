import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";

const cloudName =
  process.env.CLOUDINARY_CLOUD_NAME?.trim() ||
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY?.trim();
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!cloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
      return NextResponse.json(
        { error: "Cloudinary credentials not configured on server" },
        { status: 500 }
      );
    }

    const timestamp = Math.round(Date.now() / 1000);
    const folder = "video-uploads";
    const signature = cloudinary.utils.api_sign_request(
      { folder, timestamp },
      cloudinaryApiSecret
    );

    return NextResponse.json({
      cloudName,
      apiKey: cloudinaryApiKey,
      timestamp,
      folder,
      signature,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
