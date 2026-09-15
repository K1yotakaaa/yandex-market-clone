import { lazy, Suspense } from 'react';
import { RemoteBoundary } from './components/RemoteBoundary';

const Header = lazy(() => import('header/Header'));

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <RemoteBoundary name="header">
        <Suspense
          fallback={
            <div style={{ padding: 16, fontFamily: 'system-ui' }}>
              Loading header…
            </div>
          }
        >
          <Header />
        </Suspense>
      </RemoteBoundary>

      <main style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <h1>Shell</h1>
        <p>Banners and catalog remotes land here next.</p>
      </main>
    </div>
  );
}