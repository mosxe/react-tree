import React from 'react';
import ReactDOM from 'react-dom/client';
import TreePage from './pages';
import './index.css';

ReactDOM.createRoot(document.getElementById('root-tree') as HTMLElement).render(
  <React.StrictMode>
    <TreePage />
  </React.StrictMode>
);
