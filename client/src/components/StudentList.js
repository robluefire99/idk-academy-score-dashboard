import React from 'react';

export default function StudentList({ students, onSelect }) {
  return (
    <ul>
      {students.map(s => (
        <li key={s._id} onClick={() => onSelect && onSelect(s)}>
          {s.name}
        </li>
      ))}
    </ul>
  );
}