export type FilterField = {
  key: string;
  label: string;
};

export type CategorySchema = {
  id: string;
  matchKeywords: string[];
  fields: FilterField[];
};

export const CATEGORY_SCHEMAS: CategorySchema[] = [
  {
    id: 'phones',
    matchKeywords: ['смартфон', 'телефон', 'iphone', 'айфон', 'samsung', 'galaxy', 'honor', 'xiaomi', 'mobile'],
    fields: [
      { key: 'memory', label: 'Встроенная память' },
      { key: 'ram', label: 'Оперативная память' },
      { key: 'screenDiagonal', label: 'Диагональ экрана' },
      { key: 'os', label: 'Операционная система' },
      { key: 'simType', label: 'SIM-карты' },
    ],
  },
  {
    id: 'backpacks',
    matchKeywords: ['рюкзак', 'backpack', 'сумка', 'ранец'],
    fields: [
      { key: 'volume', label: 'Объём' },
      { key: 'purpose', label: 'Назначение' },
      { key: 'waterproof', label: 'Водонепроницаемый' },
    ],
  },
  {
    id: 'electronics',
    matchKeywords: ['наушники', 'часы', 'аккумулятор', 'power bank', 'повербанк', 'bluetooth', 'audio'],
    fields: [
      { key: 'connection', label: 'Тип соединения' },
      { key: 'battery', label: 'Время работы' },
    ],
  },
  {
    id: 'home',
    matchKeywords: ['дом', 'кухня', 'спальня', 'ковер', 'ковёр', 'лампа', 'чайник', 'постельное', 'панель'],
    fields: [
      { key: 'room', label: 'Комната' },
      { key: 'type', label: 'Тип товара' },
    ],
  },
  {
    id: 'kids',
    matchKeywords: ['детям', 'конструктор', 'игрушка', 'детск'],
    fields: [
      { key: 'ageGroup', label: 'Возраст' },
      { key: 'pieces', label: 'Количество деталей' },
    ],
  },
  {
    id: 'software',
    matchKeywords: ['подписка', 'google', 'программное', 'софт'],
    fields: [
      { key: 'period', label: 'Период' },
      { key: 'platform', label: 'Платформа' },
    ],
  },
];

export function detectSchema(query: string): CategorySchema | null {
  const q = query.toLowerCase().trim();
  if (!q) return null;
  for (const schema of CATEGORY_SCHEMAS) {
    if (schema.matchKeywords.some((kw) => q.includes(kw))) return schema;
  }
  return null;
}