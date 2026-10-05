import { MILESTONES } from '../data/content';
import { Section } from './Section';
import styles from './Timeline.module.css';

export function Timeline() {
  const lastIndex = MILESTONES.length - 1;

  return (
    <Section
      id="history"
      eyebrow="История"
      title="Как мы росли"
      lead="Коротко о ключевых этапах — от сервиса сравнения цен до большой экосистемы."
    >
      <ol className={styles.list}>
        {MILESTONES.map((item, index) => (
          <li
            key={item.year}
            className={index === lastIndex ? `${styles.item} ${styles.current}` : styles.item}
          >
            <span className={styles.dot} aria-hidden="true" />
            <p className={styles.year}>{item.year}</p>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.text}>{item.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}