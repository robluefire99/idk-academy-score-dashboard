import React, { useState } from 'react';
import axios from 'axios';
import '../styles/modern.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      // You may need to adjust the endpoint to match your backend
      await axios.post('/api/auth/forgot-password', { email });
      setMessage('If this email is registered, a password reset link has been sent.');
    } catch (err) {
      setMessage('Failed to send reset email.');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a password reset link.</p>
        {message && <div className="success-msg">{message}</div>}
        <div className="input-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="primary" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
}
