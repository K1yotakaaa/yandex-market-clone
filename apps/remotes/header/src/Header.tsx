import logo from './assets/logo.png';
import { useAuthStore, useUserStore } from '@marketplace/shared-state';
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
  const user = useAuthStore((s) => s.user);
  const avatar = useUserStore((s) => s.avatar);
  const favoritesCount = useUserStore((s) => s.favorites.length);

  const goToAccount = () => {
    window.location.hash = user ? '#profile' : '#auth';
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <a href="#/" className={styles.logoLink} aria-label="Яндекс Маркет">
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
        <HeaderAction
          icon={<HeartIcon size={24} />}
          label={favoritesCount > 0 ? `Избранное · ${favoritesCount}` : 'Избранное'}
          onClick={() => {
            window.location.hash = user ? '#profile' : '#auth';
          }}
        />
        <HeaderAction icon={<CartIcon size={24} />} label="Корзина" />
        <HeaderAction icon={<SparklesIcon size={24} />} label="Market AI" />
      </nav>

      <div className={styles.right}>
        <LangSwitcher />
        {user ? (
          <button type="button" className={styles.userBtn} onClick={goToAccount}>
            {avatar ? (
              <img src={avatar} alt="" className={styles.userAvatar} />
            ) : (
              <span className={styles.userInitial}>
                {user.username.charAt(0).toUpperCase()}
              </span>
            )}
            <span className={styles.userName}>{user.username}</span>
          </button>
        ) : (
          <button type="button" className={styles.loginBtn} onClick={goToAccount}>
            Войти
          </button>
        )}
      </div>
    </header>
  );
}