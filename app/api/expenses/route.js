import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('expensesDb');

  try {
    const expenses = await db.collection('expenses').find({}).toArray();
    return NextResponse.json(expenses); // Ensure this returns an array
  } catch (error) {
    console.error("Failed to fetch expenses:", error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();
  const { amount, date, type, note } = body;
  const client = await clientPromise;
  const db = client.db('expensesDb');

  try {
    const result = await db.collection('expenses').insertOne({ amount, date, type, note });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to insert expense:", error);
    return NextResponse.json({ error: 'Failed to insert expense' }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { id } = req.query; // ดึง ID จาก query string

  const client = await clientPromise;
  const db = client.db('expensesDb');

  try {
    await db.collection('expenses').deleteOne({ _id: new ObjectId(id) }); // ใช้ ObjectId เพื่อค้นหารายการ
    return NextResponse.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error("Failed to delete expense:", error);
    return NextResponse.json({ error: 'Failed to delete expense' }, { status: 500 });
  }
}