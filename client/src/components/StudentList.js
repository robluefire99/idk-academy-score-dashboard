import React from 'react';

export default function StudentList({ students }) {
  return (
    <table>
      <thead>
        <tr><th>Name</th></tr>
      </thead>
      <tbody>
        {students.map(s => (
          <tr key={s._id}><td>{s.name}</td></tr>
        ))}
      </tbody>
    </table>
  );
}
