import { useState } from 'react';
import type { Product } from '@marketplace/shared-types';
import { CartIcon, HeartIcon, StarIcon } from './icons';
import styles from './ResultRow.module.css';

const formatPrice = (value: number) => value.toLocaleString('ru-RU') + ' ₽';
const formatCount = (value: number) => value.toLocaleString('ru-RU');

export function ResultRow({ product }: { product: Product }) {
  const [fav, setFav] = useState(false);
  const [inCart, setInCart] = useState(false);

  const discountBadge = product.featureBadges?.find(
    (b) => b.badgeType === 'SIMPLEDiscountTokenType',
  );
  const originalBadge = product.featureBadges?.find((b) => b.badgeType === 'Original');
  const crossBorder = product.signals.find((s) => s.type === 'crossborder');

  const yaBankPrice = product.additionalPrices?.find(
    (p) => p.priceType === 'yaBank',
  )?.priceValue;
  const currentPrice = yaBankPrice ?? product.price;
  const hasOldPrice = yaBankPrice !== undefined;

  return (
    <article className={styles.row}>
      <div className={styles.imageWrap}>
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            className={styles.image}
            loading="lazy"
          />
        )}
        {discountBadge && (
          <span className={styles.discountBadge}>{discountBadge.badgeTitle}</span>
        )}
      </div>

      <div className={styles.body}>
        {product.brand && <span className={styles.brand}>{product.brand}</span>}
        <h3 className={styles.title}>{product.title}</h3>

        {product.rating !== undefined && (
          <div className={styles.ratingRow}>
            <span className={styles.rating}>
              <StarIcon size={14} />
              {product.rating.toFixed(1)}
            </span>
            {product.reviewCount !== undefined && (
              <span className={styles.reviewCount}>({formatCount(product.reviewCount)})</span>
            )}
            {product.soldCount !== undefined && (
              <>
                <span className={styles.dot}>·</span>
                <span className={styles.soldCount}>
                  {formatCount(product.soldCount)} купили
                </span>
              </>
            )}
          </div>
        )}

        <div className={styles.tags}>
          {originalBadge && (
            <span className={`${styles.tag} ${styles.tagGold}`}>
              {originalBadge.badgeTitle}
            </span>
          )}
          {product.isExpress && <span className={styles.tag}>Экспресс</span>}
          {product.isUltima && <span className={styles.tag}>Ultima</span>}
          {crossBorder && <span className={styles.tag}>{crossBorder.title}</span>}
          {product.color && <span className={styles.tag}>{product.color}</span>}
        </div>

        {product.isExpress && (
          <span className={styles.deliveryInfo}>Завтра, курьер</span>
        )}
      </div>

      <div className={styles.right}>
        <div className={styles.prices}>
          <span className={styles.price}>{formatPrice(currentPrice)}</span>
          {hasOldPrice && (
            <span className={styles.oldPrice}>{formatPrice(product.price)}</span>
          )}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={fav ? `${styles.favBtn} ${styles.favActive}` : styles.favBtn}
            aria-label="В избранное"
            aria-pressed={fav}
            onClick={() => setFav((v) => !v)}
          >
            <HeartIcon size={20} />
          </button>

          <button
            type="button"
            className={inCart ? `${styles.cartBtn} ${styles.inCart}` : styles.cartBtn}
            onClick={() => setInCart((v) => !v)}
            aria-label="В корзину"
          >
            {inCart ? 'В корзине' : <CartIcon size={20} />}
          </button>
        </div>
      </div>
    </article>
  );
}