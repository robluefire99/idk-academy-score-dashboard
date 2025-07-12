import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ColoredSelect from '../components/ColoredSelect';
import '../styles/modern.css';

export default function CompleteProfilePage() {
  const [role, setRole] = useState('');
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get token from /oauth?token=...
  const token = new URLSearchParams(location.search).get('token');

  useEffect(() => {
    axios.get('/api/subjects').then(res => setSubjects(res.data)).catch(() => setSubjects([]));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.post('/api/auth/complete-profile', { role, subject: role === 'lecturer' ? subject : undefined }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Profile completed! Redirecting...');
      setTimeout(() => navigate(role === 'lecturer' ? '/lecturer' : '/student'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to complete profile.');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Complete Your Profile</h2>
        {message && <div className="success-msg">{message}</div>}
        <div className="input-group">
          <ColoredSelect
            value={role}
            onChange={e => { setRole(e.target.value); setSubject(''); }}
            options={[
              { value: 'student', label: 'Student' },
              { value: 'lecturer', label: 'Lecturer' }
            ]}
            placeholder="Select Role"
            required
          />
        </div>
        {role === 'lecturer' && (
          <div className="input-group">
            <ColoredSelect
              value={subject}
              onChange={e => setSubject(e.target.value)}
              options={subjects.map(s => ({ value: s._id, label: `Sem ${s.semester} — ${s.name}` }))}
              placeholder="Select Subject"
              required
            />
          </div>
        )}
        <button type="submit" className="primary" disabled={loading || !role || (role === 'lecturer' && !subject)}>
          {loading ? 'Saving...' : 'Complete Profile'}
        </button>
      </form>
    </div>
  );
}
