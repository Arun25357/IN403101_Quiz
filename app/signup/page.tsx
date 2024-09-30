// app/signup/page.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Perform sign-up logic here, e.g., API call to your auth endpoint
    // Assume you have an endpoint at '/api/auth/signup'
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        // If sign-up is successful, you can redirect to the sign-in page
        router.push('/signin'); // Navigate to sign-in page
      } else {
        // Handle errors (e.g., display an error message)
        const errorData = await response.json();
        console.error('Sign-up error:', errorData.error);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
