import type { ReactNode } from 'react';
import type { SectionId } from '../data/content';
import styles from './Section.module.css';

type Props = {
  id: SectionId;
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, lead, children }: Props) {
  const titleId = `${id}-title`;
  return (
    <section id={id} className={styles.section} aria-labelledby={titleId}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        {lead && <p className={styles.lead}>{lead}</p>}
      </header>
      {children}
    </section>
  );
}