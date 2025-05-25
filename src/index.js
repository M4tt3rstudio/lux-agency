import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LuxAgencyApp from './LuxAgencyApp';
import AdminPanel from './components/AdminPanel';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LuxAgencyApp/>
  </React.StrictMode>
);
