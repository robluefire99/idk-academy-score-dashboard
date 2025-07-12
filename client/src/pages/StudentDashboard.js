import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchScores } from '../redux/scoreSlice';
import { fetchSubjects, pickSubject } from '../redux/studentSlice';
import { loadMe } from '../redux/authSlice';
import Chart from '../components/Chart';
import FeedbackModal from '../components/FeedbackModal';
import { useNavigate } from 'react-router-dom';
import '../styles/modern.css';

export default function StudentDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(s => s.auth.user);
  const { list: scores, meta } = useSelector(s => s.score);
  const { subjects } = useSelector(s => s.student);
  const [page, setPage] = useState(1);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  // Support multiple subjects
  const [subjectId, setSubjectId] = useState('');
  const [showPicker, setShowPicker] = useState(!user?.subject || (Array.isArray(user?.subject) && user.subject.length === 0));

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(fetchScores({ page, limit: 15 }));
  }, [dispatch, page]);

  useEffect(() => {
    if (showPicker) dispatch(fetchSubjects());
  }, [dispatch, showPicker]);

  const handlePickSubject = async () => {
    if (!subjectId) return;
    await dispatch(pickSubject(subjectId));
    await dispatch(loadMe()); // Refresh user info in Redux
    setShowPicker(false);
  };

  if (showPicker) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-title">Pick Your Subject</div>
        <select value={subjectId} onChange={e => setSubjectId(e.target.value)}>
          <option value="">Select a subject</option>
          {(Array.isArray(subjects) ? subjects : []).map(s => (
            <option key={s._id} value={s._id}>{s.name} (Lecturer: {s.lecturer?.name || s.lecturer})</option>
          ))}
        </select>
        <button onClick={handlePickSubject} disabled={!subjectId}>Save</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-title" style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 8 }}>My Course Scores</div>
      {Array.isArray(user?.subject) && user.subject.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 18 }}>
            Subjects:
            <ul style={{ margin: '8px 0 0 0', padding: 0, listStyle: 'none' }}>
              {user.subject.map((subj, idx) => (
                <li key={subj._id || idx}>
                  <b>{subj.name}</b>
                  {subj.lecturer && (
                    <> &nbsp;| Lecturer: <b>{subj.lecturer.name}</b></>
                  )}
                </li>
              ))}
            </ul>
          </span>
        </div>
      )}
      <div className="dashboard-controls">
        <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
        <span>{page} / {meta.totalPages||1}</span>
        <button onClick={()=>setPage(p=>Math.min(meta.totalPages,p+1))} disabled={page===meta.totalPages}>Next</button>
      </div>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Semester</th>
            <th>Subject</th>
            <th>Score</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(scores) ? scores : []).map(s=>(
            <tr key={s._id}>
              <td>{s.subject?.semester || '—'}</td>
              <td>{s.subject?.name || '—'}</td>
              <td>{s.score ?? '—'}</td>
              <td>{s.feedback ? <button onClick={()=>setFeedbackMsg(s.feedback)}>View</button> : 'No Feedback'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={{ color: '#1976d2', marginTop: 32, marginBottom: 12 }}>Progress Chart</h2>
      <Chart labels={(Array.isArray(scores) ? scores : []).map(s=>s.subject?.name || '—')} data={(Array.isArray(scores) ? scores : []).map(s=>s.score||0)} />
      <FeedbackModal feedback={feedbackMsg} onClose={()=>setFeedbackMsg('')} />
    </div>
  )
}
