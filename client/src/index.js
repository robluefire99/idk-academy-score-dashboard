import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Grab the <div id="root"> we defined in public/index.html
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
