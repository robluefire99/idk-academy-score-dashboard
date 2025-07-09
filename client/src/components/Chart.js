import React, { useEffect, useRef } from 'react';
import ChartJS from 'chart.js/auto';

export default function Chart({ data, labels }) {
  const canvasRef = useRef();

  useEffect(() => {
    const chart = new ChartJS(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Score Progress',
            data,
            fill: false,
            tension: 0.1
          }
        ]
      },
      options: {
        scales: {
          y: { beginAtZero: true, max: 100 }
        }
      }
    });

    return () => chart.destroy();
  }, [data, labels]);

  return <canvas ref={canvasRef} />;
}
