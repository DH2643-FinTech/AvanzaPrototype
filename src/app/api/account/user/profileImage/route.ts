import { User } from "@/../interfaces";
import { uploadToAzureBlob } from "@/lib/services/azure_storage_blob_service";
import clientPromise from "@/lib/integeration/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export const POST = async (request: Request) => {
  try {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) {
      return new Response("Unauthorized", { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("database");
    const user = await db.collection<User>("users").findOne({ email: session.user.email });
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return new Response("No image file provided", { status: 400 });
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const blobName = user._id.toString();


    await uploadToAzureBlob("profile-pictures", blobName, buffer);

    return NextResponse.json({ message: "Image uploaded successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
};
