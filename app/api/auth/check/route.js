// app/api/auth/check/route.js
import { NextResponse } from 'next/server';

export async function GET(req) {
  // Check for the presence of a cookie or token to determine authentication
  const cookie = req.cookies.get('auth_token'); // Adjust this based on how you store the token

  if (cookie) {
    // If the cookie exists, the user is considered authenticated
    return NextResponse.json({ message: 'User is authenticated' });
  } else {
    // If the cookie does not exist, return a 401 status
    return NextResponse.json({ message: 'User is not authenticated' }, { status: 401 });
  }
}
