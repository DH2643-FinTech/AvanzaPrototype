import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/src/lib/database/mongodb";
export const dynamic = 'force-dynamic';
export const GET = async (request: NextRequest) => {
    try {

        const queryParams = request.nextUrl.searchParams;
        
        // not used - just for reference
        // const headers = request.headers;
        // const pathName = request.nextUrl.pathname;
        // const body = request.json();

        const client = await clientPromise;
        const db = client.db("database");
        const reportCollection = db.collection("processedPDFs");

        const stockIds = queryParams.get("ids")?.split(",");
        const randomCompany = queryParams.get("random");
        const recentReport = queryParams.get("recent");
        const numberOfYears = queryParams.get("numberOfYears");
        const limit = queryParams.get("limit");
        if (randomCompany == "true") {
            const parsedLimit = parseInt(limit ?? "50");
            const randomDocuments = await reportCollection.aggregate([{ $sample: { size: parsedLimit } }]).toArray();
            return NextResponse.json({ data: randomDocuments, message: "Random records fetched" }, { status: 200 });
        }
        else if(recentReport == "true") {
            const yearsToSubtract = parseInt(numberOfYears ?? "1");
            const parsedLimit = parseInt(limit ?? "50");
            const yearsAgo = new Date();
            yearsAgo.setFullYear(yearsAgo.getFullYear() - yearsToSubtract);
            const records = await reportCollection.find({
                $expr: {
                    $and: [
                      { $gte: [{ $toDate: "$eventDate" }, yearsAgo] },
                      { $lt: [{ $toDate: "$eventDate" }, new Date()] }
                    ]
                  }
              })
              .limit(parsedLimit) 
              .toArray();
            
            return NextResponse.json({ data: records, message: "Records fetched" }, { status: 200 });
        }
        else {
            const records = await reportCollection.find({ stockId: { $in: stockIds } }).toArray();
            return NextResponse.json({ data: records, message: "Records fetched" }, { status: 200 }); 
        }
    } catch (error) {
        console.error("Failed to fetch stocks:", error);
        return NextResponse.json(
        { error: "Failed to fetch stocks" },
        { status: 500 }
        );
    }
};