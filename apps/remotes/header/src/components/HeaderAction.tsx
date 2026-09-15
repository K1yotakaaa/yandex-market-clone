import type { ReactNode } from 'react';
import styles from './HeaderAction.module.css';

type Props = {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
};

export function HeaderAction({ icon, label, onClick }: Props) {
  return (
    <button type="button" className={styles.action} onClick={onClick}>
      <span className={styles.iconWrap}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </button>
  );
}