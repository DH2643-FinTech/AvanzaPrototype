// import type { NextApiRequest, NextApiResponse } from 'next';
// import clientPromise from '../../lib/database/mongodb';
// import bcrypt from 'bcrypt';

// export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
//     if (req.method === 'POST') {
//         console.log("server trying to create user");
//         const { username, password } = req.body;

//         const client = await clientPromise;
//         const db = client.db('database');

//         const existingUser = await db.collection('company').findOne({ name: username });

//         if (existingUser) {
//             return res.status(409).json({ message: 'User already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = { name: username, password: hashedPassword };
//         const result = await db.collection('users').insertOne(newUser);

//         console.log("server trying to create user");

//         res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
//     } else {
//         console.log("server trying to create user");
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }

import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/database/mongodb'; // assuming you're using MongoDB client

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json(); // Extract username and password from the request body
    console.log("email: ", email);
    console.log("password", password);
    const client = await clientPromise;
    const db = client.db('database');

    // Check if the user already exists
    const existingUser = await db.collection('users').findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = { email: email, password: hashedPassword };
    const result = await db.collection('users').insertOne(newUser);
    // console.log("result: ", result);
    return NextResponse.json(
      { message: 'User created successfully', userId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
};
