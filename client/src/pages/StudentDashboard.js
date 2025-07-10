import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchScores } from '../redux/scoreSlice';
import Chart from '../components/Chart';
import FeedbackModal from '../components/FeedbackModal';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(s => s.auth.user);
  const { list: scores, meta } = useSelector(s => s.score);
  const [page, setPage] = useState(1);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(fetchScores({ page, limit: 15 }));
  }, [dispatch, page]);

  return (
    <div>
      <h1>My Course Scores</h1>
      <table>
        <thead><tr><th>Subject</th><th>Score</th><th>Feedback</th></tr></thead>
        <tbody>
          {scores.map(s=>(
            <tr key={s._id}>
              <td>{s.subject.name}</td>
              <td>{s.score ?? '—'}</td>
              <td>{s.feedback ? <button onClick={()=>setFeedbackMsg(s.feedback)}>View</button> : 'No Feedback'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
        <span>{page} / {meta.totalPages||1}</span>
        <button onClick={()=>setPage(p=>Math.min(meta.totalPages,p+1))} disabled={page===meta.totalPages}>Next</button>
      </div>
      <h2>Progress Chart</h2>
      <Chart labels={scores.map(s=>s.subject.name)} data={scores.map(s=>s.score||0)} />
      <FeedbackModal feedback={feedbackMsg} onClose={()=>setFeedbackMsg('')} />
    </div>
  )
}
