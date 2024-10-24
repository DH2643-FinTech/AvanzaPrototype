import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/database/mongodb'; 
import crypto from 'crypto'; 

export const POST = async (request: any) => {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('database'); 

    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = Date.now() + 3600000;

   
    db.collection('users').updateOne(
      { email },
      {
        $set: {
          resetPasswordToken: resetToken,
          resetPasswordExpires: resetTokenExpires,
        },
      }
    );

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset?token=${resetToken}`;

    return NextResponse.json({ resetLink, email }, { status: 200 });
  } catch (error) {
    console.error('Error in password reset:', error);
    return NextResponse.json({ error: 'Failed to generate password reset link' }, { status: 500 });
  }
};
