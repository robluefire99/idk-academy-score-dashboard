import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchScores, createScore, updateScore } from '../redux/scoreSlice';
import StudentList from '../components/StudentList';
import ScoreForm from '../components/ScoreForm';
import FeedbackModal from '../components/FeedbackModal';
import Chart from '../components/Chart';

export default function LecturerDashboard() {
  const dispatch = useDispatch();
  const { list: scores, meta } = useSelector(state => state.score);
  const [selectedScore, setSelectedScore] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [page, setPage] = useState(1);

  // Load paginated scores
  useEffect(() => {
    dispatch(fetchScores({ page, limit: 5 }));
  }, [dispatch, page]);

  // Handle form submission (create or update)
  const handleSave = async ({ score }) => {
    if (selectedScore) {
      // update existing
      await dispatch(updateScore({ id: selectedScore._id, score }));
      setSelectedScore(null);
    } else {
      // create new
      await dispatch(createScore({ student: 'someStudentId', subject: 'someSubjectId', score }));
    }
    // reload
    dispatch(fetchScores({ page, limit: 5 }));
  };

  // Open edit form
  const handleEdit = scoreItem => {
    setSelectedScore(scoreItem);
  };

  // Close feedback modal
  const closeFeedback = () => setFeedbackMessage('');

  return (
    <div>
      <h1>Lecturer Dashboard</h1>

      {/* List of students/scores */}
      <StudentList
        students={scores.map(s => ({ _id: s._id, name: s.student.name }))}
        onSelect={handleEdit}
      />

      {/* Score form for add/edit */}
      <ScoreForm onSubmit={handleSave} initial={selectedScore || {}} />

      {/* Feedback modal */}
      <FeedbackModal feedback={feedbackMessage} onClose={closeFeedback} />

      {/* Simple pagination controls */}
      <div>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} / {meta.totalPages}
        </span>
        <button
          onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
          disabled={page === meta.totalPages}
        >
          Next
        </button>
      </div>

      {/* Score progress chart for current page */}
      <Chart
        labels={scores.map(s => s.student.name)}
        data={scores.map(s => s.score)}
      />
    </div>
  );
}
