import { useState } from 'react';
import { useUserStore } from '@marketplace/shared-state';
import type { Product } from '@marketplace/shared-types';
import { CartIcon, HeartIcon } from './icons';
import { formatPrice } from '../lib/format';
import styles from './ProductMiniCard.module.css';

export function ProductMiniCard({ product }: { product: Product }) {
  const favorites = useUserStore((s) => s.favorites);
  const toggleFavorite = useUserStore((s) => s.toggleFavorite);
  const addToCart = useUserStore((s) => s.addToCart);
  const cartItem = useUserStore((s) => s.cart.find((i) => i.oskuId === product.oskuId));

  const fav = favorites.includes(product.oskuId);
  const inCart = !!cartItem;
  const [justAdded, setJustAdded] = useState(false);

  const onAddToCart = () => {
    addToCart(product.oskuId);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const onToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.oskuId);
  };

  return (
    <article className={styles.card}>
      <a href={`#product/${product.oskuId}`} className={styles.link}>
        <div className={styles.imageWrap}>
          {product.image && (
            <img src={product.image} alt={product.title} className={styles.image} loading="lazy" />
          )}
        </div>
      </a>

      <button
        type="button"
        className={`${styles.fav} ${fav ? styles.favActive : ''}`}
        onClick={onToggleFav}
        aria-label="В избранное"
        aria-pressed={fav}
      >
        <HeartIcon size={18} />
      </button>

      <div className={styles.body}>
        <a href={`#product/${product.oskuId}`} className={styles.title}>
          {product.title}
        </a>
        <div className={styles.bottom}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <button
            type="button"
            className={inCart || justAdded ? `${styles.cartBtn} ${styles.cartBtnIn}` : styles.cartBtn}
            onClick={onAddToCart}
            aria-label={inCart ? 'В корзине' : 'В корзину'}
          >
            <CartIcon size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}