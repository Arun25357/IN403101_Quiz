// components/ExpenseList.tsx
'use client';
import { useState, useEffect } from 'react';

interface Expense {
  _id: string;
  amount: number;
  date: string; // Date
  type: 'income' | 'expense';
  note: string; // Note
}

const formatCurrency = (amount: number) => {
  return Number(amount).toFixed(2); // Format as currency with two decimal places
};

const ExpenseList = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totals, setTotals] = useState<{ income: number; expense: number; total: number }>({
    income: 0,
    expense: 0,
    total: 0,
  });

  const fetchExpenses = async () => {
    const response = await fetch('/api/expenses');
    const data: Expense[] = await response.json();
    setExpenses(data);

    // Calculate totals
    const calculatedTotals = data.reduce(
      (acc, item) => {
        if (item.type === 'income') {
          acc.income += item.amount;
        } else {
          acc.expense += item.amount;
        }
        return acc;
      },
      { income: 0, expense: 0 } // Initial accumulator without total
    );

    // Set the total property
    const total = calculatedTotals.income - calculatedTotals.expense; // Calculate net total
    setTotals({ ...calculatedTotals, total }); // Set totals state including total
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/expenses/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchExpenses(); // Refresh the list after deletion
    } else {
      console.error("Failed to delete expense");
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
      <h3 style={{ color: 'blue' }}>Net Total: {formatCurrency(totals.total)} Baht</h3> {/* Display net total */}
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
