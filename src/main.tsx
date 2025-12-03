import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error('Root element #root not found. Ensure index.html contains <div id="root"></div>.');
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
