// app/signin/page.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Perform sign-in logic here, e.g., API call to your auth endpoint
  };

  const handleSignUpRedirect = () => {
    router.push('/signup'); // Navigate to signup page
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
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
        <button type="submit">Sign In</button>
      </form>
      <button onClick={handleSignUpRedirect}>Go to Sign Up</button>
    </div>
  );
};

export default SignIn;
