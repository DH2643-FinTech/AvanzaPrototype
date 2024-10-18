import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/database/mongodb'; // MongoDB client
import crypto from 'crypto'; // For generating the reset token
import nodemailer from 'nodemailer'; // For sending email

export const POST = async (request: Request) => {
  try {
    // Parse the request body
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

    // Send email with the reset link
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "ermiyaghaffari81@gmail.com",
        accessToken: "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",
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Your email address
      to: email,
      subject: 'Password Reset Request',
      text: `Please use the following link to reset your password: ${resetLink}`,
      html: `<p>Please use the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`, // HTML version
    });

    return NextResponse.json({ message: 'Password reset link sent' }, { status: 200 });

  } catch (error) {
    console.error('Error in password reset:', error);
    return NextResponse.json({ error: 'Failed to generate password reset link' }, { status: 500 });
  }
};
