"use client"; // Mark this file as a Client Component

import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import { useState } from 'react';

export default function Home() {
  const [triggerUpdate, setTriggerUpdate] = useState(0);

  const handleNewExpense = () => {
    setTriggerUpdate(prev => prev + 1);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Income and Expense Tracker</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <ExpenseForm onNewExpense={handleNewExpense} />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <ExpenseList key={triggerUpdate} />
      </div>
    </main>
  );
}
