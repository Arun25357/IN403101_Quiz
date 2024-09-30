// app/api/expenses/[id]/route.js
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb'; // นำเข้า ObjectId

export async function DELETE(req) {
  const { pathname } = req.nextUrl; // ดึง pathname จาก URL
  const id = pathname.split('/').pop(); // แยก ID ออกจาก URL

  const client = await clientPromise;
  const db = client.db('expensesDb');

  try {
    const result = await db.collection('expenses').deleteOne({ _id: new ObjectId(id) }); // ใช้ ObjectId
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error("Failed to delete expense:", error);
    return NextResponse.json({ error: 'Failed to delete expense' }, { status: 500 });
  }
}
