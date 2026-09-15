import { useState } from 'react';
import { SearchIcon, CloseIcon } from './icons';
import styles from './SearchBar.module.css';

export function SearchBar() {
  const [value, setValue] = useState('');
  const hasText = value.length > 0;

  return (
    <div className={styles.wrap}>
      <SearchIcon size={20} className={styles.searchIcon} />
      <input
        type="text"
        className={styles.input}
        placeholder="Найти товары"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {hasText && (
        <button
          type="button"
          className={styles.clear}
          onClick={() => setValue('')}
          aria-label="Очистить"
        >
          <CloseIcon size={16} />
        </button>
      )}
      {hasText && (
        <button type="button" className={styles.submit}>
          Найти
        </button>
      )}
    </div>
  );
}