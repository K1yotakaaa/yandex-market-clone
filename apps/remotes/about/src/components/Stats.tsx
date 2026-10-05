import { STATS } from '../data/content';
import { Section } from './Section';
import styles from './Stats.module.css';

export function Stats() {
  return (
    <Section id="numbers" eyebrow="В цифрах" title="Маркет сегодня">
      <ul className={styles.grid}>
        {STATS.map((stat) => (
          <li key={stat.label} className={styles.card}>
            <p className={styles.value}>
              {stat.value}
              {stat.unit && <span className={styles.unit}>{stat.unit}</span>}
            </p>
            <p className={styles.label}>{stat.label}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}