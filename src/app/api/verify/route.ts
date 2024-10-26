import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/integeration/mongodb';

export const POST = async (request: Request) => {
  try {
    const { email, code } = await request.json();  
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ message: 'Verification code is required' }, { status: 400 });
    }
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('database');
    
    
    
    const user = await db.collection('users').findOne({
      email: email,    
    });
  
    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired verification code' }, { status: 400 });
    }
    if(user){
    if (user.verificationToken != code || user.verificationToken > Date.now()) {
      return NextResponse.json({ message: 'Invalid or expired verification code' }, { status: 400 });
    }
    }
    await db.collection('users').updateOne(
      { email: user.email },
      {
        $set: { verified: true },
        $unset: { verificationToken: '', verificationTokenExpires: '' },
      }
    );
    return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json({ error: 'Failed to verify email' }, { status: 500 });
  }
};
