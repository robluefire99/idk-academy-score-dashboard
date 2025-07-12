import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/modern.css';

// asset imports—only these two
import googleIcon from '../asset/google-icon.png';
import bgImage    from '../asset/login-bg.jpg';
import ColoredSelect from '../components/ColoredSelect';

export default function RegisterPage() {
  const [form, setForm] = useState({ role: 'student', name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [showSubjectPicker, setShowSubjectPicker] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/subjects')
      .then(res => {
      console.log('Subjects:', res.data); // <-- Add this line
      setSubjects(res.data);
    })
      .catch(() => setSubjects([]));
  }, []);

  useEffect(() => {
    setShowSubjectPicker(form.role === 'lecturer');
  }, [form.role]);

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = { ...form };
    if (!payload.subject) delete payload.subject;
    axios.post('/api/auth/register', payload)
      .then(() => {
        setMessage('✅ Registration successful! Redirecting to login…');
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch(err => {
        setMessage(err.response?.data?.message || 'Registration failed.');
      });
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize:   'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      }}
    >
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome to IDK Academy</h2>
        <h3>Create your account</h3>

        {message && <div className="success-msg">{message}</div>}

        {/* Name */}
        <div className="input-group">
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        {/* Email */}
        <div className="input-group">
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        {/* Password */}
        <div className="input-group password-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            style={{ paddingRight: '40px' }} // Add padding to make space for the button
            required
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {showPassword ? '🙈' : '👁️'} 
          </button>
        </div>

        {/* Role selector */}
        <div className="input-group">
          <ColoredSelect
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value, subject: undefined })}
            options={[
              { value: 'student', label: 'Student' },
              { value: 'lecturer', label: 'Lecturer' }
            ]}
            placeholder="Select Role"
          />
        </div>

        {/* Subject picker for lecturers */}
        {showSubjectPicker && (
          <div className="input-group">
            <ColoredSelect
              value={form.subject || ''}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              options={subjects.map((s) => ({ value: s._id, label: `Sem ${s.semester} — ${s.name}` }))}
              placeholder="Select Subject"
              required
            />
          </div>
        )}

        {/* Register button */}
        <button type="submit" className="primary">
          Register
        </button>

        {/* Link to login */}
        <div className="footer-links">
          <a href="/login">Already have an account? Sign In</a>
        </div>

        {/* Google register */}
        <div className="social-login">
          <span>Or register using Google</span>
          <br />
          <a href="http://localhost:5000/api/auth/google">
            <img src={googleIcon} alt="Register with Google" />
          </a>
        </div>
      </form>
    </div>
  );
}
