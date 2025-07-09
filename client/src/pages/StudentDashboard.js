import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchScores } from '../redux/scoreSlice';
import Chart from '../components/Chart';
import FeedbackModal from '../components/FeedbackModal';

export default function StudentDashboard() {
  const dispatch = useDispatch();
  const { list: scores, meta } = useSelector(state => state.score);
  const [page, setPage] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Load the student's own scores, paginated
  useEffect(() => {
    dispatch(fetchScores({ page, limit: 5 }));
  }, [dispatch, page]);

  // Show a feedback modal for a selected score
  const showFeedback = (message) => {
    setFeedbackMessage(message);
  };

  // Close the feedback modal
  const closeFeedback = () => {
    setFeedbackMessage('');
  };

  return (
    <div>
      <h1>My Course Scores</h1>

      {/* Scores Table */}
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Score</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s) => (
            <tr key={s._id}>
              <td>{s.subject.name}</td>
              <td>{s.score != null ? s.score : '—'}</td>
              <td>
                {s.feedback ? (
                  <button onClick={() => showFeedback(s.feedback)}>
                    View Feedback
                  </button>
                ) : (
                  'No Feedback'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ margin: '1rem 0' }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span style={{ margin: '0 1rem' }}>
          Page {page} of {meta.totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
          disabled={page === meta.totalPages}
        >
          Next
        </button>
      </div>

      {/* Progress Chart */}
      <h2>Score Progress</h2>
      <Chart
        labels={scores.map((s) => s.subject.name)}
        data={scores.map((s) => s.score != null ? s.score : 0)}
      />

      {/* Feedback Modal */}
      <FeedbackModal feedback={feedbackMessage} onClose={closeFeedback} />
    </div>
  );
}