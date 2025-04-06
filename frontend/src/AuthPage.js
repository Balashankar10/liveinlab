import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = `${process.env.REACT_APP_API_BASE}/${role}/${isRegister ? 'register' : 'login'}`;
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save email to localStorage
        localStorage.setItem('email', email);
        // ✅ Navigate to appropriate dashboard
        navigate(`/${role}/dashboard`);
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>{isRegister ? 'Register' : 'Login'} as {role}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <p>
        {isRegister ? 'Already have an account?' : "Don't have an account?"}
        <button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
