import React, { useState } from 'react';

export default function StudentList({ students, onSelect }) {
  const [page, setPage] = useState(1);
  const studentsPerPage = 15;
  const totalPages = Math.ceil(students.length / studentsPerPage);
  const startIdx = (page - 1) * studentsPerPage;
  const currentStudents = students.slice(startIdx, startIdx + studentsPerPage);

  return (
    <div>
      <ul>
        {currentStudents.map(s => (
          <li key={s._id} onClick={() => onSelect && onSelect(s)}>
            {s.name}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 10 }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
          Prev
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}