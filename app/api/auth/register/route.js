// app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import clientPromise from '@/lib/mongodb';
import User from '@/models/User'; // Import User model

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db('yourDatabaseName');
  const body = await req.json();
  
  const { email, password } = body;

  try {
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });

    // Save the user using the User model
    await user.save(); // Save user directly with Mongoose

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
  }
}
