import { NextResponse } from "next/server";
import clientPromise from "@/lib/database/mongodb";
import { CompanyID } from "./dataTypes";

export const GET = async (request: Request) => {
  try {
    // console.log("GET request to /api/companies");
    const client = await clientPromise;
    const db = client.db("database");
    const stocksCollection = db.collection("stocks");

      const companies = await stocksCollection.find<CompanyID>({}).toArray();
      const result = companies.map((company) => ({ _id: company._id, name: company.name }));
      return NextResponse.json(result);

  } catch (error) {
    console.error("Failed to fetch stocks:", error);
    return NextResponse.json(
      { error: "Failed to fetch stocks" },
      { status: 500 }
    );
  }
};
