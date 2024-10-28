//import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/integeration/mongodb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

 export const GET = async (request: Request) => {
   try {

    const session = request.headers.get("session"); 
    console.log(session);
    if(session) {

      const sessionJson = JSON.parse(session);
      const {
        session: {
          user: { id: userId, name: userName, email: userEmail },
          expires,
          id: sessionId,
          name: sessionName,
          email: sessionEmail,
        },
      } = sessionJson;      
      const client = await clientPromise;
      const db = client.db("database");
      const user = await db.collection("users").findOne({ email: userEmail });
      
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      
      const { firstName, lastName, phone, address } = user;
      return NextResponse.json({ firstName, lastName, phone, address }, { status: 200 });
    }
    else{
      return NextResponse.json({ message: "Email not sent" }, { status: 400 });
    }
   } catch (error) {
     console.error("Error fetching profile data:", error);
     return NextResponse.json({ error: "Failed to fetch profile data" }, { status: 500 });
   }
 };

export const POST = async (request: Request) => {
  try {
    const { updatedInfo, session } = await request.json();
    const client = await clientPromise;
    const db = client.db("database");
    console.log(updatedInfo);
    console.log(session.email);
    
    const email = session.email;
    if (updatedInfo) {
      const updateFields = Object.fromEntries(
        Object.entries(updatedInfo).filter(([_, value]) => value != null)
      );

      if (Object.keys(updateFields).length === 0) {
        return NextResponse.json({ message: "No valid fields to update" }, { status: 400 });
      }

      await db.collection("users").updateOne(
        { email },
        { $set: updateFields }
      );

      return NextResponse.json({ message: "Profile updated successfully!" }, { status: 200 });
    } else {
      const user = await db.collection("users").findOne({ email });
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      const { firstName, lastName, phone, address } = user;
      return NextResponse.json({ firstName, lastName, phone, address }, { status: 200 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
};
