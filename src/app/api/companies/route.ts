
import { NextResponse } from 'next/server'; 
import clientPromise from '@/src/lib/database/mongodb'; 
import { CompanyID } from './dataTypes';
import fs from 'fs';
import path from 'path';

export const GET = async (request: Request) => {
  try {
    console.log("GET request to /api/companies");
    const { searchParams } = new URL(request.url); 

    const name = searchParams.get("name");
    const randomCount = searchParams.get("randomCount");

    const client = await clientPromise;
    const db = client.db('database'); 
    const stocksCollection = db.collection('stocks'); 

    if (name) {
      // const company = await stocksCollection.find<CompanyID>(
      //   { name: { $regex: name, $options: "i" } },
      //   { projection: { _id: 1, name: 1 } }
      // ).toArray(); 
      const company = await stocksCollection.find<CompanyID>(
{}
      ).toArray(); 

      const names = company.map(item => item.name).join("\n");

      // Define the file path
      const filePath = path.join(process.cwd(), "names.txt"); // Save in the root of your project
  
      // Write names to the file
      // fs.writeFile(filePath, names, (err) => {
      //   if (err) {
      //     console.error("Error writing to file:", err);
      //     // return res.status(500).json({ error: "Failed to write to file" });
      //   }
      //   // res.status(200).json({ message: "Names saved to names.txt" });
      // });


    //   console.log("Company : ", company);
      if (company.length === 0) {
        return NextResponse.json(
          { message: "No company found" },
          { status: 404 }
        );
      }

      return NextResponse.json(company);
    } else if (randomCount) {
      const count = parseInt(randomCount, 10);
      const companies = await stocksCollection.aggregate([
        { $sample: { size: count } },
      ]).toArray(); 

      return NextResponse.json(companies);
    } else {
      const companies = await stocksCollection.find<CompanyID>({}, { projection: { _id: 1, name: 1 } }, ).limit(20).toArray();
    //   console.log("Companies : ", companies);
      return NextResponse.json(companies);
    }
  } catch (error) {
    console.error('Failed to fetch stocks:', error);
    return NextResponse.json(
      { error: "Failed to fetch stocks" },
      { status: 500 }
    );
  }
};


/**
 * DEPRECATED: Mongoose is not used in this project yet!
 */

// import { NextResponse } from "next/server";
// import connectMongoDB from "@/src/lib/database/mongodb";
// import CompanyModel from "@/src/lib/database/models/Company";

// export const GET = async (request: Request) => {
//   try {
//     const { searchParams } = await new URL(request.url);

//     const name = searchParams.get("name");
//     const randomCount = searchParams.get("randomCount");

//     await connectMongoDB();

//     if (name) {
//       const company = await CompanyModel.find(
//         {
//           name: { $regex: name, $options: "i" },
//         },
//         {
//           _id: 1,
//           name: 1,
//         }
//       );

//       console.log("Company : ", company);
//       if (company.length === 0) {
//         return NextResponse.json(
//           { message: "No company found" },
//           { status: 404 }
//         );
//       }

//       return NextResponse.json(company);
//     } else if (randomCount) {
//       const count = parseInt(randomCount, 10);
//       const companies = await CompanyModel.aggregate([
//         { $sample: { size: count } },
//       ]);

//       return NextResponse.json(companies);
//     } else {
//       const companies = await CompanyModel.find();
//       const result = await NextResponse.json(companies);
//       console.log("Companies : ", companies);
//       return result;
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch companies" },
//       { status: 500 }
//     );
//   }
// };
