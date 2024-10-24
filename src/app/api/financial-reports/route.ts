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
        const numberOfRandomRecords = queryParams.get("numberOfRandomRecords");
        // console.log(headers, pathName, body);
        if (randomCompany == "true") {
            const randomDocuments = await reportCollection.aggregate([{ $sample: { size: numberOfRandomRecords ?? 50 } }]).toArray();
            return NextResponse.json({ data: randomDocuments, message: "Random records fetched" }, { status: 200 });
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