import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SearchPage from './SearchPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SearchPage initialQuery="смартфон" />
  </StrictMode>,
);