import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { store } from './store/store.js';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
          <Toaster position="top-right" toastOptions={{ style: { background: '#111116', color: '#F8FAFC', border: '1px solid rgba(139,92,246,.35)' } }} />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
