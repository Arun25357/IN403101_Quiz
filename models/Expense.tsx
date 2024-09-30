export interface Expense {
    amount: number; // Amount of money
    date: string;   // Date in string format (e.g., '2024-09-30')
    type: 'income' | 'expense'; // Type (income or expense)
    note: string;  // Additional notes or details
  }
  