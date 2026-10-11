import { PRODUCTS } from '../data/mock';
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