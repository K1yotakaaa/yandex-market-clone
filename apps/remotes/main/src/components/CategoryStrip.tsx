import { CATEGORY_STRIP } from '../data/mock';
import styles from './CategoryStrip.module.css';

export function CategoryStrip() {
  return (
    <div className={styles.strip}>
      <ul className={styles.list}>
        {CATEGORY_STRIP.map((item) => (
          <li key={item.id} className={styles.item}>
            <a
              href={`#${item.id}`}
              className={
                item.variant === 'promo'
                  ? `${styles.pill} ${styles.promo}`
                  : styles.pill
              }
            >
              {item.variant === 'promo' && (
                <span className={styles.dot} aria-hidden="true" />
              )}
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.right}>
        <span className={styles.city}>Москва</span>
        <span className={styles.cityDivider}>·</span>
        <a href="#address" className={styles.cityLink}>
          Укажите адрес
        </a>
      </div>
    </div>
  );
}