import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import '../styles/modern.css';
import GoogleIcon from '../assets/google-icon.png'; // put a small Google logo in this path

export default function LoginPage() {
  const [creds, setCreds] = useState({ email: '', password: '', keep: false });
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email: creds.email, password: creds.password }));
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Log In</h2>

        {/* Email */}
        <div className="input-group">
          <input
            type="email"
            placeholder="Email Address"
            value={creds.email}
            onChange={e => setCreds({ ...creds, email: e.target.value })}
            required
          />
          <span className="icon">📧</span>
        </div>

        {/* Password */}
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={creds.password}
            onChange={e => setCreds({ ...creds, password: e.target.value })}
            required
          />
          <span className="icon">🔒</span>
        </div>

        {/* Keep Me Logged In */}
        <div className="actions">
          <label>
            <input
              type="checkbox"
              checked={creds.keep}
              onChange={e => setCreds({ ...creds, keep: e.target.checked })}
            />{' '}
            Keep Me Logged In
          </label>
        </div>

        {/* Primary Login Button */}
        <button type="submit" className="primary">
          LOG IN
        </button>

        {/* Footer Links */}
        <div className="footer-links">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/register">New User? Register</a>
        </div>

        {/* Only Google Login */}
        <div className="social-login">
          <span>Or login using Google</span>
          <br />
          <a href="/api/auth/google">
            <img src={GoogleIcon} alt="Google Login" />
          </a>
        </div>
      </form>
    </div>
  );
}
