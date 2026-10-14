import type { Order } from '@marketplace/shared-state';
import { cx } from '../../utils/cx';
import { formatDate, formatPrice, pluralize } from '../../utils/format';
import { Button } from '../ui/Button/Button';
import { Card } from '../ui/Card/Card';
import { IconBox } from '../ui/icons';
import styles from './OrdersSection.module.css';

const STATUS_LABEL: Record<Order['status'], string> = {
  processing: 'В обработке',
  shipped: 'В пути',
  delivered: 'Доставлен',
};

interface OrdersSectionProps {
  id: string;
  orders: Order[];
}

export function OrdersSection({ id, orders }: OrdersSectionProps) {
  return (
    <Card
      id={id}
      title="Мои заказы"
      description={
        orders.length > 0
          ? `${orders.length} ${pluralize(orders.length, ['заказ', 'заказа', 'заказов'])}`
          : 'Здесь появятся оформленные заказы'
      }
    >
      {orders.length > 0 ? (
        <ul className={styles.list}>
          {orders.map((order) => {
            const qty = order.items.reduce((sum, item) => sum + item.qty, 0);
            return (
              <li key={order.id} className={styles.order}>
                <div className={styles.head}>
                  <span className={styles.number}>Заказ №{order.id}</span>
                  <span className={cx(styles.status, styles[order.status])}>
                    {STATUS_LABEL[order.status]}
                  </span>
                </div>
                <p className={styles.items}>
                  {order.items
                    .slice(0, 2)
                    .map((item) => item.title)
                    .join(', ')}
                  {order.items.length > 2 && ` и ещё ${order.items.length - 2}`}
                </p>
                <div className={styles.foot}>
                  <span className={styles.meta}>
                    {formatDate(order.createdAt)} · {qty} {pluralize(qty, ['товар', 'товара', 'товаров'])}
                  </span>
                  <span className={styles.total}>{formatPrice(order.total)}</span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>
            <IconBox size={28} />
          </span>
          <p className={styles.emptyTitle}>У вас пока нет заказов</p>
          <Button
            variant="secondary"
            onClick={() => {
              window.location.hash = '';
            }}
          >
            Перейти к покупкам
          </Button>
        </div>
      )}
    </Card>
  );
}
