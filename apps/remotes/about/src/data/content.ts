export type SectionId =
  | 'mission'
  | 'numbers'
  | 'directions'
  | 'history'
  | 'partners'
  | 'contacts';

export const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'mission', label: 'mission' },
  { id: 'numbers', label: 'numbers' },
  { id: 'directions', label: 'directions' },
  { id: 'history', label: 'history' },
  { id: 'partners', label: 'partners' },
  { id: 'contacts', label: 'contacts' },
];

export const HERO = {
  eyebrow: 'О компании',
  titleStart: 'Маркет, где удобно',
  titleAccent: 'покупать и продавать',
  description:
    'Помогаем людям быстро находить нужные товары по честной цене, а продавцам — выходить к покупателям по всей стране.',
};

export type Stat = { value: string; unit?: string; label: string };

export const STATS: Stat[] = [
  { value: '12', unit: 'лет', label: 'работаем на рынке' },
  { value: '50', unit: 'млн', label: 'покупателей в месяц' },
  { value: '80', unit: 'тыс.', label: 'продавцов на площадке' },
  { value: '1 200', label: 'пунктов выдачи' },
];

export type DirectionIcon = 'marketplace' | 'logistics' | 'sellers' | 'tech';

export type Direction = {
  icon: DirectionIcon;
  title: string;
  description: string;
  tags: string[];
};

export const DIRECTIONS: Direction[] = [
  {
    icon: 'marketplace',
    title: 'Маркетплейс',
    description: 'Каталог из миллионов товаров, отзывы покупателей и сравнение цен у разных продавцов.',
    tags: ['Каталог', 'Отзывы', 'Сравнение'],
  },
  {
    icon: 'logistics',
    title: 'Логистика',
    description: 'Свои склады, сортировочные центры и пункты выдачи. Большую часть заказов привозим за 1–2 дня.',
    tags: ['Склады', 'Курьеры', 'ПВЗ'],
  },
  {
    icon: 'sellers',
    title: 'Для бизнеса',
    description: 'Личный кабинет продавца со статистикой продаж, рекламой внутри площадки и быстрыми выплатами.',
    tags: ['Аналитика', 'Реклама', 'Выплаты'],
  },
  {
    icon: 'tech',
    title: 'Технологии',
    description: 'Персональные рекомендации, поиск по фото и ассистент, который подбирает товар по описанию задачи.',
    tags: ['Поиск', 'ML', 'Market AI'],
  },
];

export type Milestone = { year: string; title: string; text: string };

export const MILESTONES: Milestone[] = [
  { year: '', title: '', text: '' },
  { year: '', title: '', text: '' },
  { year: '', title: '', text: '' },
  { year: '', title: '', text: '' },
  { year: '', title: '', text: '' },
];

export const PARTNERS: string[] = [];

export const CONTACTS = {
  email: '',
  phone: '',
  phoneHref: '',
  address: '',
  hours: '',
};

export type Social = { id: 'telegram' | 'github' | 'vk'; label: string };

export const SOCIALS: Social[] = [
  { id: 'telegram', label: '' },
  { id: 'github', label: '' },
  { id: 'vk', label: '' },
];

export type Member = { initials: string; name: string; role: string };

  export const TEAM: Member[] = [
    { initials: 'IZ', name: 'izyjin', role: '' },
    { initials: 'K', name: 'Kuro', role: 'Shell' },
  ];