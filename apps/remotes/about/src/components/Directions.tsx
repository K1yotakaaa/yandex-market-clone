import type { ReactNode } from 'react';
import { DIRECTIONS, type DirectionIcon } from '../data/content';
import { ChartIcon, SparklesIcon, StoreIcon, TruckIcon } from './icons';
import { Section } from './Section';
import styles from './Directions.module.css';

const ICONS: Record<DirectionIcon, ReactNode> = {
  marketplace: <StoreIcon size={26} />,
  logistics: <TruckIcon size={26} />,
  sellers: <ChartIcon size={26} />,
  tech: <SparklesIcon size={26} />,
};

export function Directions() {
  return (
    <Section
      id="directions"
      eyebrow="Направления"
      title="Чем мы занимаемся"
      lead="Четыре направления, которые вместе делают покупки быстрыми, а продажи — предсказуемыми."
    >
      <ul className={styles.grid}>
        {DIRECTIONS.map((item, index) => (
          <li key={item.title} className={styles.card}>
            <div className={styles.top}>
              <span className={styles.icon}>{ICONS[item.icon]}</span>
              <span className={styles.index}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.text}>{item.description}</p>
            <ul className={styles.tags}>
              {item.tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}