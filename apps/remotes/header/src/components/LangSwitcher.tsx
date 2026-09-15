import { useState } from 'react';
import styles from './LangSwitcher.module.css';

const LANGS = ['RU', 'EN', 'KK'] as const;
type Lang = (typeof LANGS)[number];

export function LangSwitcher() {
  const [lang, setLang] = useState<Lang>('RU');

  return (
    <div className={styles.wrap} role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          className={`${styles.btn} ${l === lang ? styles.active : ''}`}
          onClick={() => setLang(l)}
        >
          {l}
        </button>
      ))}
    </div>
  );
}