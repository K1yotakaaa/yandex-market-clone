import { useState } from 'react';
import type { Product } from '@marketplace/shared-types';
import { HeartIcon } from './icons';
import styles from './ProductCard.module.css';

const formatPrice = (value: number) =>
  value.toLocaleString('ru-RU') + ' ₽';

export function ProductCard({ product }: { product: Product }) {
  const [fav, setFav] = useState(false);

  const discountBadge = product.featureBadges?.find(
    (b) => b.badgeType === 'SIMPLEDiscountTokenType',
  );
  const originalBadge = product.featureBadges?.find(
    (b) => b.badgeType === 'Original',
  );
  const crossBorder = product.signals.find((s) => s.type === 'crossborder');

  const yaBankPrice = product.additionalPrices?.find(
    (p) => p.priceType === 'yaBank',
  )?.priceValue;

  const hasDiscount =
    !!discountBadge || (!!product.additionalPrices && product.additionalPrices.length > 0);

  return (
    <article
      className={styles.card}
      onClick={() => {
        window.location.hash = `#product/${product.oskuId}`;
      }}
    >
      <div className={styles.imageWrap}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className={styles.image}
            loading="lazy"
          />
        ) : null}

        {discountBadge && (
          <span className={styles.badge}>{discountBadge.badgeTitle}</span>
        )}

        <button
          type="button"
          className={`${styles.fav} ${fav ? styles.favActive : ''}`}
          aria-label="В избранное"
          aria-pressed={fav}
          onClick={(event) => {
            event.stopPropagation();
            setFav((v) => !v);
          }}
        >
          <HeartIcon size={30} />
        </button>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.prices}>
          {yaBankPrice && (
            <>
              <span className={styles.price}>{formatPrice(yaBankPrice)}</span>
              <span className={styles.priceStruck}>{formatPrice(product.price)}</span>
            </>
          )}
          {!yaBankPrice && (
            <span className={styles.price}>{formatPrice(product.price)}</span>
          )}
        </div>

        <div className={styles.meta}>
          {originalBadge && (
            <span className={`${styles.tag} ${styles.tagGold}`}>
              {originalBadge.badgeTitle}
            </span>
          )}
          {hasDiscount && !originalBadge && (
            <span className={styles.tag}>Скидка</span>
          )}
          {crossBorder && (
            <span className={styles.tag}>{crossBorder.title}</span>
          )}
        </div>
      </div>
    </article>
  );
}