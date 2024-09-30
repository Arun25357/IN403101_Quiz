// app/api/auth/logout/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { cookies } = req;

  if (cookies.token) {
    NextResponse.clearCookie('token');
  }

  return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
}
