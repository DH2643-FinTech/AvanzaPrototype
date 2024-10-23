import { User } from "@/interfaces";
import { uploadToAzureBlob } from "@/src/lib/api/imageStorage";
import clientPromise from "@/src/lib/database/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Disable body parsing for this API route (use raw form data)
export const config = {
  api: {
    bodyParser: false,
  },
};

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

    // Parse the form data
    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return new Response("No image file provided", { status: 400 });
    }

    // Convert the file into an array buffer and then into a Buffer object
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const blobName = user._id.toString();


    // Upload the file to Azure Blob Storage
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
