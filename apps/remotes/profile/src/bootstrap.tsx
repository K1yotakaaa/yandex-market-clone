import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ProfileApp from './ProfileApp';

// Standalone mode (http://localhost:5007). The shell imports ProfileApp directly and never runs this file.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProfileApp />
  </StrictMode>,
);
