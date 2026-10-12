import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CartPage from './CartPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartPage />
  </StrictMode>,
);