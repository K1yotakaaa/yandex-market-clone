import { useCallback, useRef, useState } from 'react';
import { useAuthStore, useUserStore, type User } from '@marketplace/shared-state';
import { AddressSection } from './components/AddressSection/AddressSection';
import { OrdersSection } from './components/OrdersSection/OrdersSection';
import { PersonalInfoForm } from './components/PersonalInfoForm/PersonalInfoForm';
import { ProfileNav, type ProfileNavItem } from './components/ProfileNav/ProfileNav';
import { IconBox, IconCart, IconHeart, IconPin, IconUser } from './components/ui/icons';
import { Toast, type ToastMessage } from './components/ui/Toast/Toast';
import { UserCard } from './components/UserCard/UserCard';
import { useAddresses } from './hooks/useAddresses';
import { mockAddresses, mockProfile, mockStats } from './mocks/profile';
import type { AddressDraft, ProfileFormValues, ProfileStat, UserProfile } from './types';
import { formatDate } from './utils/format';
import { resizeToDataUrl } from './utils/image';
import styles from './ProfileApp.module.css';

const SECTION = {
  personal: 'pf-personal',
  orders: 'pf-orders',
  addresses: 'pf-addresses',
} as const;

/** Name and phone aren't part of the account model yet, so they start from the username. */
function profileFromUser(user: User): UserProfile {
  return {
    firstName: user.username,
    lastName: '',
    email: user.email,
    phone: '',
    memberSince: formatDate(user.createdAt),
  };
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function goTo(hash: string) {
  window.location.hash = hash;
}

/**
 * User Profile micro-frontend root, exposed as `profile/ProfileApp`.
 *
 * - In the shell: shows the signed-in account from @marketplace/shared-state
 *   (email, registration date, avatar, orders, favorites/cart counters, logout).
 * - Standalone (localhost:5007, nobody signed in): falls back to mock data.
 *
 * Name/phone edits and addresses are local placeholders (reset on reload) until the API exists.
 */
export function ProfileApp() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const avatar = useUserStore((s) => s.avatar);
  const setAvatar = useUserStore((s) => s.setAvatar);
  const orders = useUserStore((s) => s.orders);
  const favoritesCount = useUserStore((s) => s.favorites.length);
  const cartCount = useUserStore((s) => s.cart.reduce((sum, item) => sum + item.qty, 0));
  const clearUserData = useUserStore((s) => s.clearUserData);

  const [profile, setProfile] = useState<UserProfile>(() =>
    user ? profileFromUser(user) : mockProfile,
  );
  const { addresses, add, update, remove, setDefault } = useAddresses(mockAddresses);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const toastId = useRef(0);

  const notify = useCallback((text: string, tone: ToastMessage['tone'] = 'success') => {
    toastId.current += 1;
    setToast({ id: toastId.current, text, tone });
  }, []);
  const hideToast = useCallback(() => setToast(null), []);

  const stats: ProfileStat[] = user
    ? [
        { id: 'orders', label: 'Заказов', value: String(orders.length) },
        { id: 'favorites', label: 'Избранное', value: String(favoritesCount) },
        { id: 'cart', label: 'Корзина', value: String(cartCount) },
      ]
    : mockStats;

  const navItems: ProfileNavItem[] = [
    {
      id: 'personal',
      label: 'Личные данные',
      icon: <IconUser />,
      active: true,
      onSelect: () => scrollToSection(SECTION.personal),
    },
    {
      id: 'orders',
      label: 'Заказы',
      icon: <IconBox />,
      badge: orders.length,
      onSelect: () => scrollToSection(SECTION.orders),
    },
    {
      id: 'addresses',
      label: 'Адреса',
      icon: <IconPin />,
      onSelect: () => scrollToSection(SECTION.addresses),
    },
    {
      id: 'favorites',
      label: 'Избранное',
      icon: <IconHeart />,
      badge: favoritesCount,
      onSelect: () => goTo('#favorites'),
    },
    {
      id: 'cart',
      label: 'Корзина',
      icon: <IconCart />,
      badge: cartCount,
      onSelect: () => goTo('#cart'),
    },
  ];

  const handleLogout = () => {
    const endSession = () => {
      logout();
      clearUserData();
    };
    if (!window.location.hash) {
      endSession();
      return;
    }
    // Leave the page first: if the session ended while still on #profile,
    // the shell's guard would redirect to #auth instead of the home page.
    window.addEventListener('hashchange', endSession, { once: true });
    goTo('');
  };

  const handleSaveProfile = (values: ProfileFormValues) => {
    setProfile((prev) => ({ ...prev, ...values }));
    notify('Данные сохранены');
  };

  const handleAvatarChange = async (file: File | null) => {
    if (!file) {
      setAvatar(null);
      notify('Фото удалено');
      return;
    }
    try {
      setAvatar(await resizeToDataUrl(file));
      notify('Фото обновлено');
    } catch {
      notify('Не удалось загрузить изображение', 'error');
    }
  };

  const handleAdd = (draft: AddressDraft) => {
    add(draft);
    notify('Адрес добавлен');
  };
  const handleUpdate = (id: string, draft: AddressDraft) => {
    update(id, draft);
    notify('Адрес обновлён');
  };
  const handleRemove = (id: string) => {
    remove(id);
    notify('Адрес удалён');
  };
  const handleMakeDefault = (id: string) => {
    setDefault(id);
    notify('Основной адрес изменён');
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Профиль</h1>
          <p className={styles.pageSubtitle}>Личные данные, заказы и адреса доставки</p>
        </header>

        <div className={styles.layout}>
          <aside className={styles.aside}>
            <UserCard
              profile={profile}
              avatarUrl={avatar}
              stats={stats}
              onAvatarChange={(file) => void handleAvatarChange(file)}
            />
            <ProfileNav items={navItems} onLogout={user ? handleLogout : undefined} />
          </aside>

          <main className={styles.main}>
            <PersonalInfoForm id={SECTION.personal} profile={profile} onSave={handleSaveProfile} />
            <OrdersSection id={SECTION.orders} orders={orders} />
            <AddressSection
              id={SECTION.addresses}
              addresses={addresses}
              onAdd={handleAdd}
              onUpdate={handleUpdate}
              onRemove={handleRemove}
              onMakeDefault={handleMakeDefault}
            />
          </main>
        </div>
      </div>

      <Toast toast={toast} onHide={hideToast} />
    </div>
  );
}

export default ProfileApp;
