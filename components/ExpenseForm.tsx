import { useState } from 'react';
import { Expense } from '../models/Expense'; // Import the Expense interface

const ExpenseForm = ({ onNewExpense }: { onNewExpense: () => void }) => {
  const [formData, setFormData] = useState<Expense>({
    amount: 0,
    date: '',
    type: 'income',
    note: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData), // ส่งข้อมูลในรูปแบบ Expense
    });
    if (response.ok) {
      setFormData({ amount: 0, date: '', type: 'income', note: '' });
      onNewExpense();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '0 auto', width: '300px' }}>
      <input
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        name="note"
        type="text"
        value={formData.note}
        onChange={handleChange}
        placeholder="Note"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default ExpenseForm;
