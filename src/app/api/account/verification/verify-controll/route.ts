// /pages/api/verify-controll/[email].ts

import { NextResponse } from "next/server";
import clientPromise from "@/lib/integeration/mongodb";

export const POST = async (request: Request ) => {
    try {
        
        const { email } = await request.json();
        if (!email) {
            return NextResponse.json(
                { error: "Email query parameter is required" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("database");
        const userVerified = await db.collection("users").findOne({ email: email });

        if (userVerified && userVerified.verified === true) {
            return NextResponse.json(
                { message: "Login is successful" },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: "The user is not verified" },
                { status: 201 }
            );
        }
    } catch (error) {
       // console.error(error);
        return NextResponse.json(
            { error: "Failed to handle sign-In" },
            { status: 500 }
        );
    }
};
