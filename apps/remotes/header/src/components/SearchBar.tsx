import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import { PRODUCTS, type Product } from '@marketplace/shared-types';
import { SearchIcon, CloseIcon } from './icons';
import styles from './SearchBar.module.css';

const MAX_SUGGESTIONS = 8;

function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = PRODUCTS
    .map((product) => {
      const title = product.title.toLowerCase();
      const idx = title.indexOf(q);
      if (idx === -1) return null;
      const isWordStart = idx === 0 || /\s/.test(title[idx - 1]);
      const score = (isWordStart ? 0 : 1000) + idx;
      return { product, score };
    })
    .filter((entry): entry is { product: Product; score: number } => entry !== null)
    .sort((a, b) => a.score - b.score);

  return scored.slice(0, MAX_SUGGESTIONS).map((entry) => entry.product);
}

function formatPrice(value: number): string {
  return value.toLocaleString('ru-RU') + ' ₽';
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const lower = text.toLowerCase();
  const qLower = q.toLowerCase();
  const idx = lower.indexOf(qLower);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className={styles.mark}>{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

export function SearchBar() {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const suggestions = value.trim() ? searchProducts(value) : [];
  const hasText = value.length > 0;
  const showDropdown = open && suggestions.length > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | globalThis.MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setHighlighted(0);
  }, [value]);

  const navigateToSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    window.location.hash = `#search?q=${encodeURIComponent(trimmed)}`;
    setOpen(false);
  };

  const navigateToProduct = (oskuId: string) => {
    window.location.hash = `#product/${oskuId}`;
    setOpen(false);
  };

  const handleSubmit = () => {
    navigateToSearch(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (showDropdown && suggestions[highlighted]) {
        navigateToProduct(suggestions[highlighted].oskuId);
      } else {
        handleSubmit();
      }
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div className={styles.wrap} ref={wrapperRef}>
      <SearchIcon size={20} className={styles.searchIcon} />
      <input
        type="text"
        className={styles.input}
        placeholder="Найти товары"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
      />

      {hasText && (
        <button
          type="button"
          className={styles.clear}
          onClick={() => {
            setValue('');
            setOpen(false);
          }}
          aria-label="Очистить"
        >
          <CloseIcon size={16} />
        </button>
      )}

      {hasText && (
        <button type="button" className={styles.submit} onClick={handleSubmit}>
          Найти
        </button>
      )}

      {showDropdown && (
        <ul className={styles.dropdown}>
          {suggestions.map((product, index) => (
            <li key={product.oskuId}>
              <button
                type="button"
                className={
                  index === highlighted
                    ? `${styles.suggestion} ${styles.suggestionActive}`
                    : styles.suggestion
                }
                onMouseEnter={() => setHighlighted(index)}
                onClick={() => navigateToProduct(product.oskuId)}
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt=""
                    className={styles.suggestionImage}
                    loading="lazy"
                  />
                )}
                <span className={styles.suggestionBody}>
                  <span className={styles.suggestionTitle}>
                    <HighlightMatch text={product.title} query={value} />
                  </span>
                  <span className={styles.suggestionPrice}>
                    {formatPrice(product.price)}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}