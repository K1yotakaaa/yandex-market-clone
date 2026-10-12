import { useEffect, useMemo, useRef, useState } from 'react';
import { PRODUCTS } from '@marketplace/shared-types';
import { FilterSidebar } from './components/FilterSidebar';
import { ResultRow } from './components/ResultRow';
import { ChevronDownIcon } from './components/icons';
import {
  DEFAULT_FILTERS,
  filterProducts,
  sortProducts,
  type Filters,
  type SortMode,
} from './lib/filters';
import styles from './SearchPage.module.css';

type Props = {
  initialQuery: string;
};

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: 'popular', label: 'Популярные' },
  { value: 'price_asc', label: 'Сначала дешёвые' },
  { value: 'price_desc', label: 'Сначала дорогие' },
];

export default function SearchPage({ initialQuery }: Props) {
  const [filters, setFilters] = useState<Filters>(() => ({
    ...DEFAULT_FILTERS,
    query: initialQuery,
  }));
  const [sortMode, setSortMode] = useState<SortMode>('popular');
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, query: initialQuery }));
  }, [initialQuery]);

  useEffect(() => {
    if (!sortOpen) return;
    const handler = (e: globalThis.MouseEvent) => {
      if (!sortRef.current?.contains(e.target as Node)) setSortOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [sortOpen]);

  const results = useMemo(
    () => sortProducts(filterProducts(PRODUCTS, filters), sortMode),
    [filters, sortMode],
  );

  const currentSort =
    SORT_OPTIONS.find((o) => o.value === sortMode) ?? SORT_OPTIONS[0];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <h1 className={styles.title}>
            {filters.query || 'Все товары'}
            <span className={styles.count}>{results.length}</span>
          </h1>

          <div className={styles.sortWrap} ref={sortRef}>
            <button
              type="button"
              className={styles.sortTrigger}
              onClick={() => setSortOpen((o) => !o)}
            >
              {currentSort.label}
              <ChevronDownIcon size={16} />
            </button>

            {sortOpen && (
              <ul className={styles.sortMenu}>
                {SORT_OPTIONS.map((opt) => (
                  <li key={opt.value}>
                    <button
                      type="button"
                      className={
                        opt.value === sortMode
                          ? `${styles.sortItem} ${styles.sortItemActive}`
                          : styles.sortItem
                      }
                      onClick={() => {
                        setSortMode(opt.value);
                        setSortOpen(false);
                      }}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.layout}>
          <FilterSidebar filters={filters} onChange={setFilters} products={PRODUCTS} />

          <div className={styles.results}>
            {results.length === 0 ? (
              <div className={styles.empty}>
                <p className={styles.emptyTitle}>Ничего не найдено</p>
                <p className={styles.emptyText}>
                  Попробуйте изменить запрос или сбросить фильтры
                </p>
              </div>
            ) : (
              <ul className={styles.list}>
                {results.map((product) => (
                  <li key={product.oskuId}>
                    <ResultRow product={product} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}