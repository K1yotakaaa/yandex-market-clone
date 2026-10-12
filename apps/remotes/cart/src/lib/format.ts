export const formatPrice = (v: number) => v.toLocaleString('ru-RU') + ' ₽';

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });