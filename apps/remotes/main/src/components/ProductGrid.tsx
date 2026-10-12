import { PRODUCTS } from '@marketplace/shared-types';
import { ProductCard } from './ProductCard';
import styles from './ProductGrid.module.css';

export function ProductGrid() {
  return (
    <section className={styles.wrap}>
      <div className={styles.grid}>
        {PRODUCTS.map((product) => (
          <ProductCard key={product.oskuId} product={product} />
        ))}
      </div>
    </section>
  );
}