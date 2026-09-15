import logo from './assets/logo.png';
import {
  HeartIcon,
  CartIcon,
  PackageIcon,
  SparklesIcon,
  CoinIcon,
} from './components/icons';
import { HeaderAction } from './components/HeaderAction';
import { SearchBar } from './components/SearchBar';
import { LangSwitcher } from './components/LangSwitcher';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <a href="/" className={styles.logoLink} aria-label="Яндекс Маркет">
          <img src={logo} alt="Яндекс Маркет" className={styles.logo} />
        </a>
        <button type="button" className={styles.catalogBtn}>
          Каталог
        </button>
      </div>

      <SearchBar />

      <nav className={styles.actions}>
        <HeaderAction icon={<CoinIcon size={24} />} label="Призы" />
        <HeaderAction icon={<PackageIcon size={24} />} label="Заказы" />
        <HeaderAction icon={<HeartIcon size={24} />} label="Избранное" />
        <HeaderAction icon={<CartIcon size={24} />} label="Корзина" />
        <HeaderAction icon={<SparklesIcon size={24} />} label="Market AI" />
      </nav>

      <div className={styles.right}>
        <LangSwitcher />
        <button type="button" className={styles.loginBtn}>
          Войти
        </button>
      </div>
    </header>
  );
}