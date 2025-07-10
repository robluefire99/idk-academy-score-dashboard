import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

export default function LoginPage() {
  const [creds, setCreds] = useState({});
  const dispatch = useDispatch();

  return (
    <form onSubmit={e => { e.preventDefault(); dispatch(login(creds)); }}>
      <input
        type="email"
        placeholder="Email"
        onChange={e => setCreds({ ...creds, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setCreds({ ...creds, password: e.target.value })}
      />
      <button type="submit">Login</button>
      <a href="/api/auth/google">
        <button type="button">Login with Google</button>
      </a>
    </form>
  );
}