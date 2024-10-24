import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/src/lib/database/mongodb";

export const GET = async (request: NextRequest) => {
  try {
    const client = await clientPromise;
    const db = client.db("database");
    const stocksCollection = db.collection("processedPDFs");
    const stockId = request.nextUrl.searchParams.get("id");

    if (stockId) {
      const recentReports = await stocksCollection
        .find({ stockId: stockId })
        .toArray();
      console.log(recentReports);
      return NextResponse.json(
        { data: recentReports, message: "Records fetched" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { data: [], message: "Invalid stock id" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Failed to fetch stocks:", error);
    return NextResponse.json(
      { error: "Failed to fetch stocks" },
      { status: 500 }
    );
  }
};
