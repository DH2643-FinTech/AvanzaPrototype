import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import clientPromise from '../../../lib/integeration/mongodb';

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('database');

    const existingUser = await db.collection('users').findOne({ email });
    // console.log(existingUser);
   
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000);
    const verificationTokenExpiresTime = Date.now() + 150; 
    const newUser = {
      email,
      password: hashedPassword,
      verified: false,
      verificationToken: verificationToken,
      verificationTokenExpires: verificationTokenExpiresTime,
    };
    if(existingUser == null){
    const result = await db.collection('users').insertOne(newUser);
    }
    else{
      await db.collection('users').updateOne(
        { email},
        {
          $set: { 
            verificationToken: verificationToken,
            verificationTokenExpires : verificationTokenExpiresTime
          },
          

        }
      );
    }
    const verificationLink = verificationToken;
    if(existingUser != null){
      if (existingUser.verified == true) {
        return NextResponse.json({ message: 'User already exists', verificationLink, 
        email }, { status: 409 });
      }
      if (existingUser.verified == false) {
           return NextResponse.json({ message: 'A link has been already sent to you!', verificationLink, 
           email }, { status: 200 });
      }
    }
    return NextResponse.json(
  { 
    message: 'User created successfully. Please check your email to verify your account.', 
    verificationLink, 
    email 
  },
  { status: 201 }
);
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
};
