import { User } from "@/../interfaces";
import clientPromise from "@/lib/integeration/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { uploadToAzureBlob } from "@/lib/api/imageStorage";

export const GET = async (request: Request) => {
  try {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) {
      return new Response("Unauthorized", { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("database");
    const user = await db.collection<User>("users").findOne({ email: session.user.email });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const { firstName, lastName, email, phone, address, profilePicture } = user;
    return NextResponse.json({ firstName, lastName, email, phone, address, profilePicture }, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return NextResponse.json({ error: "Failed to fetch profile data" }, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) {
      return new Response("Unauthorized", { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("database");

    const { firstName, lastName, email, phone, address } = await request.json();
    const updateData: Partial<User> = { firstName, lastName, email, phone, address };

    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;
    
    const result = await db.collection("users").updateOne(
      { email: session.user.email },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "No changes were made" }, { status: 400 });
    }

    return NextResponse.json({ message: "Profile updated successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
};
