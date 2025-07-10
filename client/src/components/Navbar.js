import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function Navbar() {
  const user = useSelector(s => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 8 }}>
      <Link to="/">Home</Link>
      {!user && <><Link to="/login">Login</Link><Link to="/register">Register</Link></>}
      {user && user.role === 'lecturer' && <Link to="/lecturer">Lecturer Dashboard</Link>}
      {user && user.role === 'student' && <Link to="/student">Student Dashboard</Link>}
      {user && (
        <>
          <span style={{ marginLeft: 16 }}>
            Welcome, {user.name} ({user.role.charAt(0).toUpperCase() + user.role.slice(1)})
          </span>
          <button style={{ marginLeft: 16 }} onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}