import { useEffect, useRef, useState } from 'react';
import type { Product } from '@marketplace/shared-types';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import styles from './Gallery.module.css';

export function Gallery({ product }: { product: Product }) {
  const list = product.images?.length
    ? product.images
    : product.image
      ? [product.image]
      : [];

  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActive(0);
  }, [product.oskuId]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActive((i) => (i - 1 + list.length) % list.length);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActive((i) => (i + 1) % list.length);
      }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [list.length]);

  if (list.length === 0) {
    return <div className={styles.placeholder} />;
  }

  const multiple = list.length > 1;
  const prev = () => setActive((i) => (i - 1 + list.length) % list.length);
  const next = () => setActive((i) => (i + 1) % list.length);

  return (
    <div className={styles.wrap}>
      {multiple && (
        <ul className={styles.thumbs}>
          {list.map((src, index) => (
            <li key={index}>
              <button
                type="button"
                className={
                  index === active
                    ? `${styles.thumb} ${styles.thumbActive}`
                    : styles.thumb
                }
                onClick={() => setActive(index)}
                aria-label={`Фото ${index + 1}`}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div
        className={styles.main}
        ref={wrapRef}
        tabIndex={multiple ? 0 : -1}
        role={multiple ? 'region' : undefined}
        aria-label={multiple ? 'Галерея товара' : undefined}
      >
        <img
          src={list[active]}
          alt={product.title}
          className={styles.mainImage}
        />

        {multiple && (
          <>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={prev}
              aria-label="Предыдущее фото"
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={next}
              aria-label="Следующее фото"
            >
              <ChevronRightIcon size={20} />
            </button>

            <span className={styles.counter}>
              {active + 1} / {list.length}
            </span>

            <div className={styles.dots}>
              {list.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={
                    i === active
                      ? `${styles.dot} ${styles.dotActive}`
                      : styles.dot
                  }
                  onClick={() => setActive(i)}
                  aria-label={`Фото ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}