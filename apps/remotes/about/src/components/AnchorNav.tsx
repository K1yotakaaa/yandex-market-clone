import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import type { SectionId } from '../data/content';
import styles from './AnchorNav.module.css';

type Props = {
  items: { id: SectionId; label: string }[];
  active: SectionId;
  onSelect: (id: SectionId) => void;
};

export function AnchorNav({ items, active, onSelect }: Props) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !link) return;
    const target = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left: target, behavior: 'smooth' });
  }, [active]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    event.preventDefault();
    onSelect(id);
  };

  return (
    <nav className={styles.nav} aria-label="Разделы страницы">
      <div className={styles.inner}>
        <span className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true" />
          О компании
        </span>

        <ul className={styles.list} ref={listRef}>
          {items.map((item) => {
            const isActive = item.id === active;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  data-id={item.id}
                  className={isActive ? `${styles.link} ${styles.active}` : styles.link}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(event) => handleClick(event, item.id)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}