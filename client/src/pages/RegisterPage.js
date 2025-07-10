import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/modern.css';

const googleIcon = (
  <svg width="20" height="20" viewBox="0 0 48 48" style={{ verticalAlign: 'middle' }}>
    <g>
      <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.2 3.23l6.9-6.9C36.6 2.7 30.7 0 24 0 14.8 0 6.7 5.8 2.7 14.1l8.1 6.3C12.7 13.7 17.9 9.5 24 9.5z"/>
      <path fill="#34A853" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9.1h12.4c-.5 2.7-2.1 5-4.4 6.6l7 5.4c4.1-3.8 6.5-9.4 6.5-16.5z"/>
      <path fill="#FBBC05" d="M10.8 28.2c-1-2.7-1-5.7 0-8.4l-8.1-6.3C.6 17.2 0 20.5 0 24c0 3.5.6 6.8 1.7 10l8.1-6.3z"/>
      <path fill="#EA4335" d="M24 48c6.5 0 12-2.1 16-5.7l-7-5.4c-2 1.3-4.5 2-9 2-6.1 0-11.3-4.1-13.2-9.6l-8.1 6.3C6.7 42.2 14.8 48 24 48z"/>
      <path fill="none" d="M0 0h48v48H0z"/>
    </g>
  </svg>
);

export default function RegisterPage() {
  const [form, setForm] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/auth/register', form)
      .then(() => {
        setMessage('Registration successful! Please check your email to verify your account.');
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch(err => {
        setMessage(err.response?.data?.message || 'Registration failed.');
      });
  };

  return (
    <div className="main-form">
      <div className="form-title">Register</div>
      {message && <div className="success-msg">{message}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <select onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
        <a href="/api/auth/google" style={{ textDecoration: 'none' }}>
          <button type="button" className="google-btn">{googleIcon} Register with Google</button>
        </a>
      </div>
    </div>
  );
}
