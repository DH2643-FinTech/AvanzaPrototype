// File: /app/api/password-reset/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/database/mongodb'; // MongoDB client
import crypto from 'crypto'; // For generating the reset token

export const POST = async (request: any) => {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('database'); // Use the correct database name

    // Check if the user exists
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Generate a reset token and expiry time
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = Date.now() + 3600000; // 1 hour expiry

    // Store the reset token and expiry in the database
    await db.collection('users').updateOne(
      { email },
      {
        $set: {
          resetPasswordToken: resetToken,
          resetPasswordExpires: resetTokenExpires,
        },
      }
    );

    // Generate the reset link
    const resetLink = `/reset-password?token=${resetToken}`;

    return NextResponse.json({ resetLink, email }, { status: 200 });
  } catch (error) {
    console.error('Error in password reset:', error);
    return NextResponse.json({ error: 'Failed to generate password reset link' }, { status: 500 });
  }
};
