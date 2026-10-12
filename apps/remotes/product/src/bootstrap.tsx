import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ProductPage from './ProductPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductPage oskuId="203296357102" />
  </StrictMode>,
);