import type { Category, CategoryStripItem } from '../category';

export const CATEGORY_STRIP: CategoryStripItem[] = [
  { id: 'works', label: 'Работаем, чтобы всё работало!', variant: 'promo' },
  { id: 'speshit', label: 'Спешл' },
  { id: 'ultima', label: 'Ultima' },
  { id: 'obzory', label: 'Обзоры' },
  { id: 'zarubezh', label: 'Из-за рубежа' },
  { id: 'dom', label: 'Дом' },
  { id: 'remont', label: 'Ремонт' },
  { id: 'krasota', label: 'Красота' },
  { id: 'urlico', label: 'Покупайте как юрлицо' },
  { id: 'sell', label: 'Продавайте на Маркете' },
];

export const DEPARTMENTS: Category[] = [
  { hid: 90561, navnodeId: 90561, departmentId: 90561, name: 'Одежда', slug: 'odezhda', parentHid: null },
  { hid: 54422, navnodeId: 54422, departmentId: 54422, name: 'Дом', slug: 'dom', parentHid: null },
  { hid: 7879,  navnodeId: 7879,  departmentId: 7879,  name: 'Ремонт', slug: 'remont', parentHid: null },
  { hid: 7847,  navnodeId: 7847,  departmentId: 7847,  name: 'Детям', slug: 'detyam', parentHid: null },
  { hid: 90089, navnodeId: 90089, departmentId: 90089, name: 'Красота', slug: 'krasota', parentHid: null },
  { hid: 54726, navnodeId: 54726, departmentId: 54726, name: 'Электроника', slug: 'elektronika', parentHid: null },
  { hid: 7802,  navnodeId: 7802,  departmentId: 7802,  name: 'Продукты', slug: 'produkty', parentHid: null },
];