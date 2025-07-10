import React, { useState } from 'react';

export default function ScoreForm({ onSubmit, initial = {} }) {
  const [score, setScore] = useState(initial.score || 0);

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit({ score }); }}>
      <input
        type="number"
        min="0"
        max="100"
        value={score}
        onChange={e => setScore(Number(e.target.value))}
      />
      <button type="submit">Save</button>
    </form>
  );
}
