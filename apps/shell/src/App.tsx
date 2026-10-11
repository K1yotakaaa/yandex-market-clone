import { lazy, Suspense, useEffect, useState } from 'react';
import { RemoteBoundary } from './components/RemoteBoundary';

const Header = lazy(() => import('header/Header'));
const MainPage = lazy(() => import('main/MainPage'));
const AboutPage = lazy(() => import('about/AboutPage'));

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

function RemoteFallback({ name }: { name: string }) {
  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', color: '#8a8a8a' }}>
      Загрузка {name}…
    </div>
  );
}

export default function App() {
  const hash = useHashRoute();
  const isAbout = hash === '#about';

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a' }}>
      <RemoteBoundary name="header">
        <Suspense fallback={<RemoteFallback name="header" />}>
          <Header />
        </Suspense>
      </RemoteBoundary>

      {isAbout ? (
        <RemoteBoundary name="about">
          <Suspense fallback={<RemoteFallback name="about" />}>
            <AboutPage />
          </Suspense>
        </RemoteBoundary>
      ) : (
        <RemoteBoundary name="main">
          <Suspense fallback={<RemoteFallback name="main" />}>
            <MainPage />
          </Suspense>
        </RemoteBoundary>
      )}
    </div>
  );
}