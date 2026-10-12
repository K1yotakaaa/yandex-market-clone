import { useState } from 'react';
import { useUserStore } from '@marketplace/shared-state';
import { PRODUCTS } from '@marketplace/shared-types';
import { CartRow } from './components/CartRow';
import { EmptyState } from './components/EmptyState';
import { CartIcon } from './components/icons';
import { formatPrice } from './lib/format';
import styles from './CartPage.module.css';

export default function CartPage() {
  const cart = useUserStore((s) => s.cart);
  const clearCart = useUserStore((s) => s.clearCart);
  const addOrder = useUserStore((s) => s.addOrder);
  const [placed, setPlaced] = useState<string | null>(null);

  const detailed = cart
    .map((item) => {
      const product = PRODUCTS.find((p) => p.oskuId === item.oskuId);
      if (!product) return null;
      return { item, product, lineTotal: product.price * item.qty };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const total = detailed.reduce((sum, d) => sum + d.lineTotal, 0);

  const placeOrder = () => {
    if (detailed.length === 0) return;
    const orderId = 'ord_' + Math.random().toString(36).slice(2, 8).toUpperCase();
    addOrder({
      id: orderId,
      createdAt: new Date().toISOString(),
      items: detailed.map((d) => ({
        oskuId: d.product.oskuId,
        title: d.product.title,
        price: d.product.price,
        qty: d.item.qty,
      })),
      total,
      status: 'processing',
    });
    clearCart();
    setPlaced(orderId);
  };

  if (placed) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.successCard}>
            <span className={styles.successIcon}>
              <CartIcon size={32} />
            </span>
            <h1 className={styles.successTitle}>Заказ оформлен</h1>
            <p className={styles.successText}>
              Номер заказа: <b>#{placed}</b>
            </p>
            <p className={styles.successHint}>
              Мы отправили детали на ваш email. Отслеживать статус можно в личном кабинете.
            </p>
            <div className={styles.successActions}>
              <a href="#profile" className={styles.successBtn}>Мои заказы</a>
              <a href="#/" className={styles.successBtnGhost}>На главную</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.head}>
          <h1 className={styles.title}>
            Корзина
            {detailed.length > 0 && (
              <span className={styles.count}>{detailed.length}</span>
            )}
          </h1>
        </header>

        {detailed.length === 0 ? (
          <EmptyState
            icon={<CartIcon size={32} />}
            title="Корзина пуста"
            text="Добавьте товары, чтобы оформить заказ. Нажмите на иконку корзины на карточке товара или на странице товара."
            action={<a href="#/" className={styles.browseBtn}>Перейти к покупкам</a>}
          />
        ) : (
          <div className={styles.layout}>
            <ul className={styles.list}>
              {detailed.map(({ item }) => (
                <li key={item.oskuId}>
                  <CartRow item={item} />
                </li>
              ))}
            </ul>

            <aside className={styles.summary}>
              <h2 className={styles.summaryTitle}>Итого</h2>

              <div className={styles.summaryRow}>
                <span>Товары ({detailed.length})</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Доставка</span>
                <span className={styles.free}>Бесплатно</span>
              </div>

              <div className={styles.summaryDivider} />

              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <span>К оплате</span>
                <span>{formatPrice(total)}</span>
              </div>

              <button type="button" className={styles.checkout} onClick={placeOrder}>
                Оформить заказ
              </button>

              <button type="button" className={styles.clearBtn} onClick={clearCart}>
                Очистить корзину
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}