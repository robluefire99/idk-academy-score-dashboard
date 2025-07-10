import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchScores, createScore, updateScore, updateFeedback } from '../redux/scoreSlice';
import { fetchMyStudents } from '../redux/lecturerSlice';
import StudentList from '../components/StudentList';
import ScoreForm from '../components/ScoreForm';
import FeedbackModal from '../components/FeedbackModal';
import Chart from '../components/Chart';
import { useNavigate } from 'react-router-dom';
import '../styles/modern.css';

export default function LecturerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(s => s.auth.user);
  const { list: scores, meta } = useSelector(s => s.score);
  const [selectedScore, setSelectedScore] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [page, setPage] = useState(1);
  const [feedbackInputs, setFeedbackInputs] = useState({});
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!user || user.role !== 'lecturer') {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(fetchScores({ page, limit: 15 }));
  }, [dispatch, page]);

  // Fetch students for this lecturer
  useEffect(() => {
    async function getStudents() {
      const res = await dispatch(fetchMyStudents());
      if (res.payload) setStudents(res.payload);
    }
    if (user && user.role === 'lecturer') getStudents();
  }, [dispatch, user]);

  const handleSave = async ({ score }) => {
    if (selectedScore) {
      await dispatch(updateScore({ id: selectedScore._id, score }));
      setSelectedScore(null);
    } else {
      // replace with real IDs
      await dispatch(createScore({ student: 'studentId', subject: 'subjectId', score }));
    }
    dispatch(fetchScores({ page, limit: 15 }));
  };

  const handleFeedbackChange = (id, value) => {
    setFeedbackInputs(inputs => ({ ...inputs, [id]: value }));
  };

  const handleSendFeedback = async (id) => {
    const feedback = feedbackInputs[id];
    if (feedback) {
      await dispatch(updateFeedback({ id, feedback }));
      setFeedbackInputs(inputs => ({ ...inputs, [id]: '' }));
      dispatch(fetchScores({ page, limit: 15 }));
    }
  };

  // Group scores by semester and subject
  const semesters = ['2024-S1', '2024-S2', '2025-S1', '2025-S2'];
  const subjects = Array.from(new Set(scores.map(s => s.subject?.name)));
  const colors = ['#1976d2', '#d32f2f', '#388e3c', '#fbc02d', '#7b1fa2', '#0288d1'];

  // For each subject, plot a line for each semester
  const datasets = subjects.flatMap((subject, subjIdx) =>
    semesters.map((semester, semIdx) => {
      const data = scores
        .filter(s => s.subject?.name === subject && s.semester === semester)
        .map(s => s.score);
      return {
        label: `${subject} (${semester})`,
        data,
        borderColor: colors[(subjIdx * semesters.length + semIdx) % colors.length],
        backgroundColor: colors[(subjIdx * semesters.length + semIdx) % colors.length]
      };
    })
  );
  // Use student names as labels (for the current page)
  const chartLabels = scores.map(s => s.student.name);

  return (
    <div className="dashboard-container">
      <div className="dashboard-title">Lecturer Dashboard</div>
      <h2 style={{ color: '#1976d2', margin: '12px 0 20px 0', textAlign: 'center' }}>IDK Academy Score Dashboard</h2>
      <div className="dashboard-controls">
        <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
        <span>{page} / {meta.totalPages}</span>
        <button onClick={()=>setPage(p=>Math.min(meta.totalPages,p+1))} disabled={page===meta.totalPages}>Next</button>
      </div>
      <Chart labels={chartLabels} datasets={datasets} />
      <div style={{margin:'20px 0'}}>
        <h3>Students for Your Subject(s):</h3>
        <ul>
          {students.map(s => (
            <li key={s._id}>{s.name} ({s.email}) - {s.subject?.name || 'No subject'}</li>
          ))}
        </ul>
      </div>
      <StudentList students={scores.map(s=>({ _id: s._id, name: s.student.name }))} onSelect={setSelectedScore}/>
      <ScoreForm onSubmit={handleSave} initial={selectedScore||{}} />
      <FeedbackModal feedback={feedbackMsg} onClose={()=>setFeedbackMsg('')} />
      <table className="dashboard-table">
        <thead><tr><th>Student</th><th>Score</th><th>Feedback</th></tr></thead>
        <tbody>
          {scores.map(s => (
            <tr key={s._id}>
              <td>{s.student.name}</td>
              <td>{s.score}</td>
              <td>
                <input
                  type="text"
                  placeholder="Write feedback..."
                  value={feedbackInputs[s._id] || ''}
                  onChange={e => handleFeedbackChange(s._id, e.target.value)}
                  style={{ width: 120 }}
                />
                <button onClick={() => handleSendFeedback(s._id)} disabled={!feedbackInputs[s._id]}>Send</button>
                {s.feedback && <span style={{ marginLeft: 8, color: 'green' }}>Sent</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
