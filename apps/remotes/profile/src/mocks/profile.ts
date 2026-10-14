import type { Address, AddressDraft, ProfileStat, UserProfile } from '../types';

/** Used only in standalone mode (no signed-in user in shared-state). */
export const mockProfile: UserProfile = {
  firstName: 'Алия',
  lastName: 'Нурланова',
  email: 'aliya.nurlanova@example.com',
  phone: '+7 (701) 234-56-78',
  memberSince: '3 марта 2021',
};

export const mockStats: ProfileStat[] = [
  { id: 'orders', label: 'Заказов', value: '27' },
  { id: 'reviews', label: 'Отзывов', value: '8' },
  { id: 'points', label: 'Баллов', value: '1 240' },
];

export const mockAddresses: Address[] = [
  {
    id: 'a-1',
    type: 'home',
    city: 'Алматы',
    street: 'пр. Абая, 150',
    apartment: '24',
    entrance: '2',
    floor: '6',
    intercom: '24К',
    comment: 'Позвоните за 10 минут до приезда',
    isDefault: true,
  },
  {
    id: 'a-2',
    type: 'work',
    city: 'Алматы',
    street: 'ул. Тимирязева, 42, БЦ «Арман»',
    apartment: '512',
    entrance: '',
    floor: '5',
    intercom: '',
    comment: '',
    isDefault: false,
  },
];

export const emptyAddressDraft: AddressDraft = {
  type: 'home',
  city: '',
  street: '',
  apartment: '',
  entrance: '',
  floor: '',
  intercom: '',
  comment: '',
  isDefault: false,
};
