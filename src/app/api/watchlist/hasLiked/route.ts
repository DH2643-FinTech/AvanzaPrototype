//Check if user already favorited the stock

import clientPromise from "@/src/lib/database/mongodb";
import { getServerSession } from "next-auth";

export const POST = async (request: Request) => {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    return new Response("Unauthorized", { status: 401 });
  }
  const client = await clientPromise;
  const db = client.db("database");
  const user = await db.collection("users").findOne({ email: session.user.email });
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await request.json();
  if(!id) {
    return new Response("Bad Request: Missing id", { status: 400 });
  }
  const collection = db.collection("userFavourites");
  const result = await collection.findOne({ userId: user._id, stockId: id });
  if (result) {
    return new Response("true", { status: 200 });
  }
  return new Response("false", { status: 200 });

};
