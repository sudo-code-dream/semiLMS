import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { put } from '@vercel/blob'; // Import Vercel Blob put function

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const formData = await req.formData();
        // The file is expected to be sent with the key 'file'
        const file = formData.get('file') as File | null;

        if (!file) {
            return new NextResponse("No file provided", { status: 400 });
        }

        // Upload the file to Vercel Blob storage
        // The first argument is the desired filename in storage,
        // the second is the file data, and options can set access control.
        const blob = await put(file.name, file, {
            access: 'public', // Make the file publicly accessible
        });

        // The 'blob' object returned by put contains the public URL
        const fileUrl = blob.url;

        // Return the public URL of the uploaded file
        return NextResponse.json({ url: fileUrl });

    } catch (error) {
        console.error("[FILE_UPLOAD_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
