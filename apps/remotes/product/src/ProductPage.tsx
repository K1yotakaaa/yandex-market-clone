import { useMemo } from 'react';
import { PRODUCTS } from '@marketplace/shared-types';
import { Gallery } from './components/Gallery';
import { ProductInfo } from './components/ProductInfo';
import { BuyPanel } from './components/BuyPanel';
import { SpecsTable } from './components/SpecsTable';
import styles from './ProductPage.module.css';

type Props = {
  oskuId: string;
};

export default function ProductPage({ oskuId }: Props) {
  const product = useMemo(
    () => PRODUCTS.find((p) => p.oskuId === oskuId),
    [oskuId],
  );

  if (!product) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1 className={styles.notFoundTitle}>Товар не найден</h1>
          <p className={styles.notFoundText}>
            Возможно, он был удалён или ссылка неверна
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Gallery product={product} />
          <ProductInfo product={product} />
          <BuyPanel product={product} />
        </div>

        <SpecsTable product={product} />
      </div>
    </div>
  );
}