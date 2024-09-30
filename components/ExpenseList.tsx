// components/ExpenseList.tsx
'use client';
import { useState, useEffect } from 'react';
import ExpenseChart from './ExpenseChart'; // นำเข้าคอมโพเนนต์กราฟ

interface Expense {
  _id: string;
  amount: number;
  date: string; // Date
  type: 'income' | 'expense';
  note: string; // Note
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
};
  

const ExpenseList = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totals, setTotals] = useState<{ income: number; expense: number; total: number }>({
    income: 0,
    expense: 0,
    total: 0,
  });

  // ตรวจสอบให้แน่ใจว่า API นี้ถูกต้อง
  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/expenses');
      if (!response.ok) throw new Error('Network response was not ok');
      const data: Expense[] = await response.json();
      console.log("Fetched data:", data); // ล็อกข้อมูลที่ดึงมา
      setExpenses(data);
      
      // คำนวณยอดรวม
      const calculatedTotals = data.reduce(
        (acc, item) => {
            if (item.type === 'income') {
                acc.income += Number(item.amount); // Ensure this is a number
            } else {
                acc.expense += Number(item.amount); // Ensure this is a number
            }
            return acc;
        },
        { income: 0, expense: 0 }
    );
  
      // ตั้งค่าทรัพย์สินรวม
      const total = calculatedTotals.income - calculatedTotals.expense;
      setTotals({ ...calculatedTotals, total });
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };
  

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/api/expenses/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete expense');
        fetchExpenses(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Income and Expenses</h2>
      <h3 style={{ color: 'green' }}>Total Income: {formatCurrency(totals.income)} Baht</h3>
      <h3 style={{ color: 'red' }}>Total Expenses: {formatCurrency(totals.expense)} Baht</h3>
      <h3 style={{ color: 'blue' }}>Net Total: {formatCurrency(totals.total)} Baht</h3>
      
      <ExpenseChart expenses={expenses} /> {/* เพิ่มคอมโพเนนต์กราฟที่นี่ */}

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {expenses.map((item) => (
          <li key={item._id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px 0', backgroundColor: item.type === 'income' ? '#e7f9e7' : '#f9e7e7' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                {item.date}: {item.type === 'income' ? 'Income' : 'Expense'} {formatCurrency(item.amount)} Baht
              </div>
              <button onClick={() => handleDelete(item._id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
            {/* Display the note below the amount */}
            {item.note && <p style={{ margin: '5px 0', fontStyle: 'italic' }}>Note: {item.note}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
