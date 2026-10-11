import type { ReactNode } from 'react';
import styles from './HeaderAction.module.css';

type Props = {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
};

export function HeaderAction({ icon, label, onClick, href }: Props) {
  const content = (
    <>
      <span className={styles.iconWrap}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={styles.action}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={styles.action} onClick={onClick}>
      {content}
    </button>
  );
}