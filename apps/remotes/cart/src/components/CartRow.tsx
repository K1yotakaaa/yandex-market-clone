import { useUserStore, type CartItem } from '@marketplace/shared-state';
import { PRODUCTS } from '@marketplace/shared-types';
import { MinusIcon, PlusIcon, TrashIcon } from './icons';
import { formatPrice } from '../lib/format';
import styles from './CartRow.module.css';

export function CartRow({ item }: { item: CartItem }) {
  const setCartQty = useUserStore((s) => s.setCartQty);
  const removeFromCart = useUserStore((s) => s.removeFromCart);

  const product = PRODUCTS.find((p) => p.oskuId === item.oskuId);
  if (!product) return null;

  const lineTotal = product.price * item.qty;

  return (
    <article className={styles.row}>
      <a
        href={`#product/${product.oskuId}`}
        className={styles.imageLink}
        aria-label={product.title}
      >
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            className={styles.image}
            loading="lazy"
          />
        )}
      </a>

      <div className={styles.body}>
        <a href={`#product/${product.oskuId}`} className={styles.title}>
          {product.title}
        </a>
        {product.brand && <span className={styles.brand}>{product.brand}</span>}
        {product.isExpress && (
          <span className={styles.delivery}>Завтра, курьер</span>
        )}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.qtyBtn}
          onClick={() => setCartQty(item.oskuId, item.qty - 1)}
          aria-label="Уменьшить количество"
        >
          <MinusIcon />
        </button>
        <span className={styles.qty}>{item.qty}</span>
        <button
          type="button"
          className={styles.qtyBtn}
          onClick={() => setCartQty(item.oskuId, item.qty + 1)}
          aria-label="Увеличить количество"
        >
          <PlusIcon />
        </button>
      </div>

      <div className={styles.prices}>
        <span className={styles.lineTotal}>{formatPrice(lineTotal)}</span>
        {item.qty > 1 && (
          <span className={styles.unitPrice}>
            {formatPrice(product.price)} × {item.qty}
          </span>
        )}
      </div>

      <button
        type="button"
        className={styles.remove}
        onClick={() => removeFromCart(item.oskuId)}
        aria-label="Удалить из корзины"
      >
        <TrashIcon />
      </button>
    </article>
  );
}