// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import clientPromise from '@/lib/mongodb';
import User from '@/models/User'; // Import User model

export async function POST(req) {
  // Ensure the MongoDB client is connected
  await clientPromise; // Make sure the client is connected
  const body = await req.json();
  
  const { email, password } = body;

  try {
    // Use Mongoose User model to find the user
    const user = await User.findOne({ email }); // Use User model

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Here you can create a session or JWT token for the user
    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Error logging in' }, { status: 500 });
  }
}
