import type { Product } from '@marketplace/shared-types';
import styles from './SpecsTable.module.css';

export function SpecsTable({ product }: { product: Product }) {
  if (!product.specs || product.specs.length === 0) return null;

  return (
    <section className={styles.wrap}>
      <h2 className={styles.heading}>Характеристики</h2>

      <div className={styles.groups}>
        {product.specs.map((group) => (
          <div key={group.group} className={styles.group}>
            <h3 className={styles.groupTitle}>{group.group}</h3>
            <dl className={styles.items}>
              {group.items.map(([label, value]) => (
                <div key={label} className={styles.item}>
                  <dt className={styles.label}>{label}</dt>
                  <dd className={styles.value}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}