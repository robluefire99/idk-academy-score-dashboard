import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchScores, createScore, updateScore } from '../redux/scoreSlice';
import StudentList from '../components/StudentList';
import ScoreForm from '../components/ScoreForm';
import FeedbackModal from '../components/FeedbackModal';
import Chart from '../components/Chart';

export default function LecturerDashboard() {
  const dispatch = useDispatch();
  const { list: scores, meta } = useSelector(s => s.score);
  const [selectedScore, setSelectedScore] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchScores({ page, limit: 15 }));
  }, [dispatch, page]);

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

  return (
    <div>
      <h1>Lecturer Dashboard</h1>
      <StudentList students={scores.map(s=>({ _id: s._id, name: s.student.name }))} onSelect={setSelectedScore}/>
      <ScoreForm onSubmit={handleSave} initial={selectedScore||{}} />
      <FeedbackModal feedback={feedbackMsg} onClose={()=>setFeedbackMsg('')} />
      <div>
        <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
        <span>{page} / {meta.totalPages}</span>
        <button onClick={()=>setPage(p=>Math.min(meta.totalPages,p+1))} disabled={page===meta.totalPages}>Next</button>
      </div>
      <Chart labels={scores.map(s=>s.student.name)} data={scores.map(s=>s.score)} />
    </div>
  );
}
