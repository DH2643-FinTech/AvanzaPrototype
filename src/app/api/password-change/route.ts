import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/integeration/mongodb'; 
import crypto from 'crypto'; 

import bcrypt from 'bcrypt';

export const POST = async (request: any) => {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json({ message: 'Token and new password are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('database'); 

    const user = await db.collection('users').findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, 

    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);

  
    await db.collection('users').updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
        },
        $unset: {
          resetPasswordToken: '',
          resetPasswordExpires: '',
        },
      }
    );

    return NextResponse.json({ message: 'Password reset successful' }, { status: 200 });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
  }
};
