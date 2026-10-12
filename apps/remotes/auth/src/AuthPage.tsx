import { useAuthStore } from '@marketplace/shared-state';
import { AnimatedBackground } from './components/AnimatedBackground';
import { AuthFlow } from './components/AuthFlow';
import { Profile } from './components/Profile';
import styles from './AuthPage.module.css';

export default function AuthPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) return <Profile />;

  return (
    <div className={styles.page}>
      <AnimatedBackground />
      <a href="#/" className={styles.backLink}>
        ← На главную
      </a>
      <AuthFlow />
    </div>
  );
}