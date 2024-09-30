// components/ExpenseChart.tsx
'use client';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// กำหนดประเภทของ Expense
interface Expense {
  _id: string;
  amount: number;
  date: string; // Date
  type: 'income' | 'expense';
  note: string; // Note
}

// กำหนดประเภทของ props
interface ExpenseChartProps {
  expenses: Expense[];
}

// ลงทะเบียนสเกลและแสดงผล
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart = ({ expenses }: ExpenseChartProps) => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const data = {
      labels: ['เดือน 1', 'เดือน 2'],
      datasets: [
        {
          label: 'รายรับ',
          data: [
            expenses.filter(exp => exp.type === 'income' && new Date(exp.date).getMonth() === new Date().getMonth() - 1).reduce((acc, curr) => acc + curr.amount, 0),
            expenses.filter(exp => exp.type === 'income' && new Date(exp.date).getMonth() === new Date().getMonth() - 2).reduce((acc, curr) => acc + curr.amount, 0),
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'รายจ่าย',
          data: [
            expenses.filter(exp => exp.type === 'expense' && new Date(exp.date).getMonth() === new Date().getMonth() - 1).reduce((acc, curr) => acc + curr.amount, 0),
            expenses.filter(exp => exp.type === 'expense' && new Date(exp.date).getMonth() === new Date().getMonth() - 2).reduce((acc, curr) => acc + curr.amount, 0),
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    };

    setChartData(data);
  }, [expenses]);

  return (
    <div>
      <h2>กราฟรายรับรายจ่าย</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ExpenseChart;
