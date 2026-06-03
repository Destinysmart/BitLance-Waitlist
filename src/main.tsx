import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import Admin from './Admin.tsx';
import './index.css';

const path = window.location.pathname.toLowerCase();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      {path === '/admin' ? <Admin /> : <App />}
    </HelmetProvider>
  </StrictMode>,
);
