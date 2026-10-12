import { lazy, Suspense, useEffect, useState } from 'react';
import { useAuthStore } from '@marketplace/shared-state';
import { RemoteBoundary } from './components/RemoteBoundary';

const Header = lazy(() => import('header/Header'));
const MainPage = lazy(() => import('main/MainPage'));
const SearchPage = lazy(() => import('search/SearchPage'));
const ProductPage = lazy(() => import('product/ProductPage'));
const AuthPage = lazy(() => import('auth/AuthPage'));
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
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const isAbout = hash === '#about';
  const isAuth = hash === '#auth';
  const isProfile = hash === '#profile';
  const searchMatch = hash.match(/^#search\?q=(.+)$/);
  const productMatch = hash.match(/^#product\/(.+)$/);

  const isSearch = Boolean(searchMatch);
  const isProduct = Boolean(productMatch);

  const searchQuery = searchMatch ? decodeURIComponent(searchMatch[1]) : '';
  const productId = productMatch ? decodeURIComponent(productMatch[1]) : '';

  useEffect(() => {
    if (isAuthenticated && isAuth) {
      window.location.hash = '#profile';
    }
    if (!isAuthenticated && isProfile) {
      window.location.hash = '#auth';
    }
  }, [isAuthenticated, isAuth, isProfile]);

  const showHeader = !isAuth;
  const showAccount = isAuth || isProfile;
  const showMain = !isAbout && !showAccount && !isSearch && !isProduct;

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a' }}>
      {showHeader && (
        <RemoteBoundary name="header">
          <Suspense fallback={<RemoteFallback name="header" />}>
            <Header />
          </Suspense>
        </RemoteBoundary>
      )}

      {isAbout && (
        <RemoteBoundary name="about">
          <Suspense fallback={<RemoteFallback name="about" />}>
            <AboutPage />
          </Suspense>
        </RemoteBoundary>
      )}

      {isSearch && (
        <RemoteBoundary name="search">
          <Suspense fallback={<RemoteFallback name="search" />}>
            <SearchPage initialQuery={searchQuery} />
          </Suspense>
        </RemoteBoundary>
      )}

      {isProduct && (
        <RemoteBoundary name="product">
          <Suspense fallback={<RemoteFallback name="product" />}>
            <ProductPage oskuId={productId} />
          </Suspense>
        </RemoteBoundary>
      )}

      {showAccount && (
        <RemoteBoundary name="auth">
          <Suspense fallback={<RemoteFallback name="auth" />}>
            <AuthPage />
          </Suspense>
        </RemoteBoundary>
      )}

      {showMain && (
        <RemoteBoundary name="main">
          <Suspense fallback={<RemoteFallback name="main" />}>
            <MainPage />
          </Suspense>
        </RemoteBoundary>
      )}
    </div>
  );
}