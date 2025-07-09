import React, { useState } from 'react';

export default function ScoreForm({ onSubmit, initial = {} }) {
  const [score, setScore] = useState(initial.score || '0');

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ score: Number(score) });
      }}
    >
      <label>
        Score:
        <input
          type="number"
          min="0"
          max="100"
          value={score}
          onChange={e => setScore(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}
