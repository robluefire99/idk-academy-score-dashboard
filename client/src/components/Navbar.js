import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import '../styles/modern.css';

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
    <nav className="main-navbar">
      <span className="nav-app-title" style={{ fontWeight: 'bold', color: '#043819ff', fontSize: 20, marginRight: 24 }}>
        IDK Academy Score Dashboard
      </span>
      <Link to="/" className="nav-link">Home</Link>
      {!user && <><Link to="/login" className="nav-link">Login</Link><Link to="/register" className="nav-link">Register</Link></>}
      {user && user.role === 'lecturer' && <Link to="/lecturer" className="nav-link">Lecturer Dashboard</Link>}
      {user && user.role === 'student' && <Link to="/student" className="nav-link">Student Dashboard</Link>}
      {user && (
        <>
          <span className="nav-user-info">
            Welcome, {user.name} ({user.role.charAt(0).toUpperCase() + user.role.slice(1)})
          </span>
          <button className="nav-logout-btn" onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}