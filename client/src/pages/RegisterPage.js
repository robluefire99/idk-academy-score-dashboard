import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [form, setForm] = useState({});

  return (
    <form onSubmit={e => { e.preventDefault(); axios.post('/api/auth/register', form); }}>
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
  );
}
