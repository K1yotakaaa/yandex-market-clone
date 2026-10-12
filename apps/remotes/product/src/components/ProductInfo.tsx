import type { Product } from '@marketplace/shared-types';
import { StarIcon } from './icons';
import styles from './ProductInfo.module.css';

function formatCount(n: number): string {
  return n.toLocaleString('ru-RU');
}

export function ProductInfo({ product }: { product: Product }) {
  const breadcrumbs = product.breadcrumbs ?? [];

  return (
    <div className={styles.wrap}>
      {breadcrumbs.length > 0 && (
        <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb} className={styles.crumbWrap}>
              <span
                className={
                  i === breadcrumbs.length - 1
                    ? `${styles.crumb} ${styles.crumbActive}`
                    : styles.crumb
                }
              >
                {crumb}
              </span>
              {i < breadcrumbs.length - 1 && (
                <span className={styles.crumbDivider}>•</span>
              )}
            </span>
          ))}
        </nav>
      )}

      <h1 className={styles.title}>{product.title}</h1>

      <div className={styles.meta}>
        {product.rating !== undefined && (
          <span className={styles.rating}>
            <StarIcon size={14} />
            {product.rating}
          </span>
        )}
        {product.reviewCount !== undefined && (
          <span className={styles.metaItem}>({product.reviewCount})</span>
        )}
        {product.soldCount !== undefined && (
          <>
            <span className={styles.metaDot}>·</span>
            <span className={styles.metaItem}>
              {formatCount(product.soldCount)} купили
            </span>
          </>
        )}
      </div>

      {product.description && (
        <p className={styles.description}>{product.description}</p>
      )}
    </div>
  );
}