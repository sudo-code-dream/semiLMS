// app/api/upload/route.ts
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("📨 File upload API hit");
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  try {
    const blob = await put(file.name, file, {
      access: "public", // or "private"
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Blob upload error:", error);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
