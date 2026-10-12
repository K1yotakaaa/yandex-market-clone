import { useUserStore } from '@marketplace/shared-state';
import { PRODUCTS } from '@marketplace/shared-types';
import { EmptyState } from './components/EmptyState';
import { ProductMiniCard } from './components/ProductMiniCard';
import { HeartIcon } from './components/icons';
import styles from './FavoritesPage.module.css';

export default function FavoritesPage() {
  const favorites = useUserStore((s) => s.favorites);
  const addToCart = useUserStore((s) => s.addToCart);

  const products = PRODUCTS.filter((p) => favorites.includes(p.oskuId));

  const addAllToCart = () => {
    products.forEach((p) => addToCart(p.oskuId));
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.head}>
          <h1 className={styles.title}>
            Избранное
            {products.length > 0 && (
              <span className={styles.count}>{products.length}</span>
            )}
          </h1>
          {products.length > 0 && (
            <button type="button" className={styles.addAll} onClick={addAllToCart}>
              Добавить всё в корзину
            </button>
          )}
        </header>

        {products.length === 0 ? (
          <EmptyState
            icon={<HeartIcon size={32} />}
            title="В избранном пусто"
            text="Нажимайте на сердечко на карточках товаров или на странице товара, чтобы сохранять их здесь."
            action={<a href="#/" className={styles.browseBtn}>Найти товары</a>}
          />
        ) : (
          <ul className={styles.grid}>
            {products.map((p) => (
              <li key={p.oskuId}>
                <ProductMiniCard product={p} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}