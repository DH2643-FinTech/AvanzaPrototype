import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/integeration/mongodb";

export const POST = async (request: Request) => {
	try {
		const { email, password } = await request.json();
		const client = await clientPromise;
		const db = client.db("database");
		const existingUser = await db.collection("users").findOne({ email: email });
		if (existingUser) {
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 409 }
			);
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = {
			email: email,
			name: email,
			password: hashedPassword,
			provider: "email",
		};
		const result = await db.collection("users").insertOne(newUser);
		return NextResponse.json(
			{ message: "User created successfully", userId: result.insertedId },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating user:", error);
		return NextResponse.json(
			{ error: "The user is not verified" },
			{ status: 400 }
		);
	}
};
