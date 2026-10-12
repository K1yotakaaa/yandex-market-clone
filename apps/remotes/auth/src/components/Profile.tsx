import { useState } from 'react';
import { useAuthStore, useUserStore } from '@marketplace/shared-state';
import { PRODUCTS } from '@marketplace/shared-types';
import { AvatarUploader } from './AvatarUploader';
import { HeartIcon, LogoutIcon, PackageIcon, UserIcon } from './icons';
import styles from './Profile.module.css';

type Tab = 'overview' | 'favorites' | 'orders';

const formatPrice = (v: number) => v.toLocaleString('ru-RU') + ' ₽';

export function Profile() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const favorites = useUserStore((s) => s.favorites);
  const orders = useUserStore((s) => s.orders);
  const clearUserData = useUserStore((s) => s.clearUserData);

  const [tab, setTab] = useState<Tab>('overview');

  if (!user) return null;

  const favoriteProducts = PRODUCTS.filter((p) => favorites.includes(p.oskuId));
  const memberSince = new Date(user.createdAt).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const onLogout = () => {
    logout();
    clearUserData();
    window.location.hash = '';
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.headerCard}>
          <AvatarUploader />
          <div className={styles.identity}>
            <h1 className={styles.name}>{user.username}</h1>
            <p className={styles.email}>{user.email}</p>
            <p className={styles.since}>Member since {memberSince}</p>
          </div>
          <button type="button" className={styles.logoutBtn} onClick={onLogout}>
            <LogoutIcon />
            Log out
          </button>
        </div>

        <div className={styles.stats}>
          <button
            type="button"
            className={tab === 'favorites' ? `${styles.stat} ${styles.statActive}` : styles.stat}
            onClick={() => setTab('favorites')}
          >
            <HeartIcon size={20} />
            <span className={styles.statValue}>{favorites.length}</span>
            <span className={styles.statLabel}>Избранное</span>
          </button>
          <button
            type="button"
            className={tab === 'orders' ? `${styles.stat} ${styles.statActive}` : styles.stat}
            onClick={() => setTab('orders')}
          >
            <PackageIcon size={20} />
            <span className={styles.statValue}>{orders.length}</span>
            <span className={styles.statLabel}>Заказы</span>
          </button>
          <button
            type="button"
            className={tab === 'overview' ? `${styles.stat} ${styles.statActive}` : styles.stat}
            onClick={() => setTab('overview')}
          >
            <UserIcon size={20} />
            <span className={styles.statValue}>Профиль</span>
            <span className={styles.statLabel}>Аккаунт</span>
          </button>
        </div>

        <div className={styles.body}>
          {tab === 'overview' && (
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Информация об аккаунте</h2>
              <dl className={styles.infoList}>
                <div className={styles.infoRow}>
                  <dt>Имя пользователя</dt>
                  <dd>{user.username}</dd>
                </div>
                <div className={styles.infoRow}>
                  <dt>Email</dt>
                  <dd>{user.email}</dd>
                </div>
                <div className={styles.infoRow}>
                  <dt>Дата регистрации</dt>
                  <dd>{memberSince}</dd>
                </div>
                <div className={styles.infoRow}>
                  <dt>ID</dt>
                  <dd className={styles.mono}>{user.id}</dd>
                </div>
              </dl>
            </div>
          )}

          {tab === 'favorites' && (
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Избранное ({favorites.length})</h2>
              {favoriteProducts.length === 0 ? (
                <div className={styles.empty}>
                  <HeartIcon size={32} />
                  <p>Пока ничего не добавлено в избранное</p>
                  <span>Нажимайте на ♥ на карточках товаров, чтобы добавлять их сюда</span>
                </div>
              ) : (
                <ul className={styles.favGrid}>
                  {favoriteProducts.map((p) => (
                    <li key={p.oskuId} className={styles.favCard}>
                      <div className={styles.favImage}>
                        {p.image && <img src={p.image} alt={p.title} loading="lazy" />}
                      </div>
                      <p className={styles.favTitle}>{p.title}</p>
                      <p className={styles.favPrice}>{formatPrice(p.price)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {tab === 'orders' && (
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Заказы ({orders.length})</h2>
              {orders.length === 0 ? (
                <div className={styles.empty}>
                  <PackageIcon size={32} />
                  <p>У вас пока нет заказов</p>
                  <span>Ваши заказы появятся здесь после оформления</span>
                </div>
              ) : (
                <ul className={styles.orderList}>
                  {orders.map((order) => (
                    <li key={order.id} className={styles.orderCard}>
                      <div className={styles.orderHead}>
                        <span className={styles.orderId}>Заказ #{order.id}</span>
                        <span className={`${styles.orderStatus} ${styles[order.status]}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className={styles.orderDate}>
                        {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                      </p>
                      <p className={styles.orderTotal}>{formatPrice(order.total)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}