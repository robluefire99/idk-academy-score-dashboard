import React from 'react';

export default function FeedbackModal({ feedback, onClose }) {
  if (!feedback) return null;

  return (
    <div className="feedback-modal">
      <div className="feedback-content">
        <p>{feedback}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}