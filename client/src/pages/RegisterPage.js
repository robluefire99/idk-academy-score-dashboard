import React, { useState, useEffect } from 'react';
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
  const [form, setForm] = useState({ role: 'student' });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [showSubjectPicker, setShowSubjectPicker] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all subjects for subject select
    axios.get('/api/subjects')
      .then(res => setSubjects(res.data))
      .catch(() => setSubjects([]));
  }, []);

  useEffect(() => {
    setShowSubjectPicker(form.role === 'lecturer');
  }, [form.role]);

  const handleSubmit = async e => {
    e.preventDefault();
    // Only send subject if selected
    const payload = { ...form };
    if (!payload.subject) delete payload.subject;
    axios.post('/api/auth/register', payload)
      .then(() => {
        setMessage('Registration successful! You can now log in.');
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
      {/* <pre style={{color:'red',fontSize:12}}>{JSON.stringify(subjects, null, 2)}</pre> */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <div className="password-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPassword(v => !v)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1l22 22"/><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7.5a11.05 11.05 0 0 1 5.17-5.92"/><path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c1.38 0 2.63-.83 3.16-2.03"/><path d="M14.47 14.47A3.5 3.5 0 0 1 12 8.5c-.41 0-.8.07-1.17.2"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="10" ry="7"/><circle cx="12" cy="12" r="3.5"/></svg>
            )}
          </button>
        </div>
        <select onChange={e => setForm({ ...form, role: e.target.value, subject: undefined })} value={form.role}>
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
        </select>
        {showSubjectPicker && (
          <select onChange={e => setForm({ ...form, subject: e.target.value })} value={form.subject || ''} required>
            <option value="">Select Subject</option>
            {subjects.map(s => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        )}
        <button type="submit" disabled={form.role === 'lecturer' && subjects.length === 0}>Register</button>
      </form>
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
        <a
          href="http://localhost:5000/api/auth/google"
          className="google-btn"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none' }}
        >
          {googleIcon} Register with Google
        </a>
      </div>
    </div>
  );
}
