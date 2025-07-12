// client/src/pages/LoginPage.js
import React, { useState } from 'react';
import { useDispatch }      from 'react-redux';
import { login }            from '../redux/authSlice';
import '../styles/modern.css';
import googleIcon from '../asset/google-icon.png';
import bgImage    from '../asset/login-bg.jpg';

export default function LoginPage() {
  const [creds, setCreds] = useState({ email:'', password:'', keep:false });
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email: creds.email, password: creds.password }));
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
        <h3>Sign in to your account</h3>
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

        <button type="submit" className="primary">LOG IN</button>

        <div className="footer-links">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/register">New User? Register</a>
        </div>

        <div className="social-login">
          <span>Or login using Google</span>
          <br />
          <a href="/api/auth/google">
            <img src={googleIcon} alt="Login with Google" />
          </a>
        </div>
      </form>
    </div>
  );
}
