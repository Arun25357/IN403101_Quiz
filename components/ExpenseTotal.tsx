// components/Total.tsx
import React from 'react';

interface TotalProps {
  income: number;
  expense: number;
}

const Total: React.FC<TotalProps> = ({ income, expense }) => {
  return (
    <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>ยอดรวม</h2>
      <h3>รายรับ: {income} บาท</h3>
      <h3>รายจ่าย: {expense} บาท</h3>
      <h3>ยอดสุทธิ: {income - expense} บาท</h3>
    </div>
  );
};

export default Total;
