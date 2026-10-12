import { useMemo } from 'react';
import styles from './AnimatedBackground.module.css';

export function AnimatedBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: -Math.random() * 14,
        duration: 8 + Math.random() * 8,
        size: 1 + Math.random() * 2,
      })),
    [],
  );

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.sphere1} />
      <div className={styles.sphere2} />
      <div className={styles.sphere3} />
      <div className={styles.particles}>
        {particles.map((p) => (
          <span
            key={p.id}
            className={styles.particle}
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>
    </div>
  );
}