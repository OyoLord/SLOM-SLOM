import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/theme.css';

// Mount the root React application onto the #root element in
// index.html.  We wrap the app in a BrowserRouter to enable the
// declarative routing defined in App.tsx.  Service worker
// registration is performed outside of the React tree below.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Register the service worker to enable offline support.  This call
// waits for the window to finish loading before attempting to
// register; if registration fails it simply logs the error.
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/sw.js')
//       .catch((err) => console.error('Service worker registration failed', err));
//   });
// }
