// components/Total.tsx
import React from 'react';

interface TotalProps {
  income: number;
  expense: number;
}

const Total: React.FC<TotalProps> = ({ income, expense }) => {
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    };
  
    return (
      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>ยอดรวม</h2>
        <h3>รายรับ: {formatCurrency(income)} บาท</h3>
        <h3>รายจ่าย: {formatCurrency(expense)} บาท</h3>
        <h3>ยอดสุทธิ: {formatCurrency(income - expense)} บาท</h3>
      </div>
    );
  };

export default Total;
