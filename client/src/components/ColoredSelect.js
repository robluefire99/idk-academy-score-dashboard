import React from 'react';

const SUBJECT_COLORS = [
  '#007bff', // blue
  '#28a745', // green
  '#ff9800', // orange
  '#e91e63', // pink
  '#9c27b0', // purple
  '#00bcd4', // cyan
  '#ff5722', // deep orange
  '#795548', // brown
  '#607d8b', // blue grey
  '#ffc107', // amber
];

export default function ColoredSelect({ value, options, onChange, placeholder, ...props }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <select
        value={value || ''}
        onChange={onChange}
        style={{ color: value ? SUBJECT_COLORS[options.findIndex(o => o.value === value) % SUBJECT_COLORS.length] : '#333', width: '100%', padding: '0.75rem 2.5rem 0.75rem 1rem', border: '1px solid #ccc', borderRadius: 4, fontSize: '1rem', background: '#fff' }}
        {...props}
      >
        <option value="" style={{ color: '#333' }}>{placeholder}</option>
        {options.map((opt, i) => (
          <option key={opt.value} value={opt.value} style={{ color: SUBJECT_COLORS[i % SUBJECT_COLORS.length] }}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
