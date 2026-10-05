import type { ReactNode } from 'react';
import { HERO, type SectionId } from '../data/content';
import {
  ArrowDownIcon,
  CartIcon,
  HeartIcon,
  PackageIcon,
  SparklesIcon,
  StoreIcon,
  TruckIcon,
} from './icons';
import styles from './Hero.module.css';

type Props = {
  onNavigate: (id: SectionId) => void;
};

type Tile = { tone: 'yellow' | 'dark' | 'ghost' | 'light'; icon?: ReactNode };

const TILES: Tile[] = [
  { tone: 'yellow', icon: <CartIcon size={40} /> },
  { tone: 'dark' },
  { tone: 'light', icon: <HeartIcon size={40} /> },
  { tone: 'ghost' },
  { tone: 'dark', icon: <SparklesIcon size={40} /> },
  { tone: 'yellow', icon: <PackageIcon size={40} /> },
  { tone: 'light', icon: <TruckIcon size={40} /> },
  { tone: 'yellow', icon: <StoreIcon size={40} /> },
  { tone: 'ghost' },
];

export function Hero({ onNavigate }: Props) {
  return (
    <section id="mission" className={styles.hero} aria-labelledby="mission-title">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.eyebrow}>{HERO.eyebrow}</p>
        <h1 id="mission-title" className={styles.title}>
          {HERO.titleStart}{' '}
          <span className={styles.accent}>{HERO.titleAccent}</span>
        </h1>
        <p className={styles.description}>{HERO.description}</p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primary}
            onClick={() => onNavigate('directions')}
          >
            Чем мы занимаемся
            <ArrowDownIcon />
          </button>
          <button
            type="button"
            className={styles.secondary}
            onClick={() => onNavigate('contacts')}
          >
            Связаться с нами
          </button>
        </div>
      </div>

      <div className={styles.visual} aria-hidden="true">
        {TILES.map((tile, index) => (
          <span
            key={index}
            className={`${styles.tile} ${styles[tile.tone]}`}
            style={{ animationDelay: `${index * 60}ms` }}
          >
            {tile.icon}
          </span>
        ))}
      </div>
    </section>
  );
}