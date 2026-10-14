import { useId, type ReactNode } from 'react';
import { cx } from '../../../utils/cx';
import styles from './Card.module.css';

interface CardProps {
  id?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Card({ id, title, description, action, children, className }: CardProps) {
  const headingId = useId();

  return (
    <section
      id={id}
      className={cx(styles.card, className)}
      aria-labelledby={title ? headingId : undefined}
    >
      {title && (
        <header className={styles.header}>
          <div className={styles.headings}>
            <h2 id={headingId} className={styles.title}>
              {title}
            </h2>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          {action && <div className={styles.action}>{action}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
