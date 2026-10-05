import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AboutPage from './AboutPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AboutPage />
  </StrictMode>,
);