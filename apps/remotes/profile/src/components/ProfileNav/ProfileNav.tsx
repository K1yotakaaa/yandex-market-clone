import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { IconChevronRight, IconLogout } from '../ui/icons';
import styles from './ProfileNav.module.css';

export interface ProfileNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: number;
  active?: boolean;
  onSelect: () => void;
}

interface ProfileNavProps {
  items: ProfileNavItem[];
  /** Omitted in standalone mode, where there is no session to end. */
  onLogout?: () => void;
}

export function ProfileNav({ items, onLogout }: ProfileNavProps) {
  return (
    <nav className={styles.nav} aria-label="Разделы профиля">
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={cx(styles.item, item.active && styles.active)}
              aria-current={item.active ? 'page' : undefined}
              onClick={item.onSelect}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
              {item.badge ? <span className={styles.badge}>{item.badge}</span> : null}
              <IconChevronRight size={18} className={styles.chevron} />
            </button>
          </li>
        ))}
        {onLogout && (
          <li className={styles.logoutItem}>
            <button type="button" className={cx(styles.item, styles.logout)} onClick={onLogout}>
              <span className={styles.icon}>
                <IconLogout />
              </span>
              <span className={styles.label}>Выйти</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
