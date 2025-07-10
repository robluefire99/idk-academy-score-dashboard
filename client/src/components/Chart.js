import React, { useEffect, useRef } from 'react';
import ChartJS from 'chart.js/auto';

// Accepts datasets: [{ label, data, borderColor, backgroundColor }], labels
export default function Chart({ datasets, labels }) {
  const canvasRef = useRef();

  useEffect(() => {
    const chart = new ChartJS(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: datasets.map(ds => ({
          ...ds,
          fill: false,
          tension: 0.1
        }))
      },
      options: {
        scales: {
          y: { beginAtZero: true, max: 100 }
        }
      }
    });
    return () => chart.destroy();
  }, [datasets, labels]);

  return <canvas ref={canvasRef} />;
}
