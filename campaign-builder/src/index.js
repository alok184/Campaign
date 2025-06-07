import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CampaignProvider } from './context/CampaignContext';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* Wrap your app with BrowserRouter */}
      <CampaignProvider>
        <App />
      </CampaignProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Performance measuring code unchanged
reportWebVitals();
