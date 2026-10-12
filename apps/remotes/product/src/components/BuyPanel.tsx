import { useState } from 'react';
import type { Product } from '@marketplace/shared-types';
import { CompareIcon, HeartIcon, ShareIcon } from './icons';
import styles from './BuyPanel.module.css';

const formatPrice = (v: number) => v.toLocaleString('ru-RU') + ' ₽';

export function BuyPanel({ product }: { product: Product }) {
  const [inCart, setInCart] = useState(false);

  const yaBankPrice = product.additionalPrices?.find(
    (p) => p.priceType === 'yaBank',
  )?.priceValue;
  const withDiscount = product.additionalPrices?.find(
    (p) => p.priceType === 'withDiscount',
  )?.priceValue;

  const currentPrice = yaBankPrice ?? product.price;
  const strikePrice =
    yaBankPrice !== undefined
      ? product.price
      : withDiscount !== undefined
        ? product.price
        : undefined;

  const discountPercent =
    strikePrice !== undefined
      ? Math.round((1 - currentPrice / strikePrice) * 100)
      : undefined;

  const discountBadge = product.featureBadges?.find(
    (b) => b.badgeType === 'SIMPLEDiscountTokenType',
  );

  return (
    <aside className={styles.panel}>
      {discountBadge && (
        <div className={styles.promo}>
          <span className={styles.promoTitle}>{discountBadge.badgeTitle}</span>
          <span className={styles.promoSubtitle}>Скидка недели</span>
        </div>
      )}

      <div className={styles.prices}>
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(currentPrice)}</span>
          {strikePrice !== undefined && (
            <>
              <span className={styles.strike}>{formatPrice(strikePrice)}</span>
              {discountPercent !== undefined && (
                <span className={styles.discount}>−{discountPercent}%</span>
              )}
            </>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.buyNow}>
          Купить сейчас
        </button>
        <button
          type="button"
          className={inCart ? `${styles.cart} ${styles.cartActive}` : styles.cart}
          onClick={() => setInCart((v) => !v)}
        >
          {inCart ? 'В корзине' : 'В корзину'}
        </button>
      </div>

      <div className={styles.linkRow}>
        <button type="button" className={styles.linkBtn}>
          <CompareIcon size={16} />
          Сравнить
        </button>
        <button type="button" className={styles.linkBtn}>
          <HeartIcon size={16} />
          В избранное
        </button>
        <button type="button" className={styles.linkBtn}>
          <ShareIcon size={16} />
          Поделиться
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Доставка</span>
          <span className={styles.infoValue}>Завтра, курьер</span>
        </div>
        {product.warranty && (
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Гарантия</span>
            <span className={styles.infoValue}>{product.warranty}</span>
          </div>
        )}
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Продавец</span>
          <span className={styles.infoValue}>Market Official</span>
        </div>
      </div>
    </aside>
  );
}