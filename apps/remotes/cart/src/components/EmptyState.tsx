import type { ReactNode } from 'react';
import styles from './EmptyState.module.css';

export function EmptyState({
  icon,
  title,
  text,
  action,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className={styles.wrap}>
      <span className={styles.icon}>{icon}</span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
      {action}
    </div>
  );
}