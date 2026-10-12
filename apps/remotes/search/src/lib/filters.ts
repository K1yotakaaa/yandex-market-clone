import type { DeliveryMethod, Product } from '@marketplace/shared-types';

export type Filters = {
  query: string;
  minPrice: string;
  maxPrice: string;
  brands: string[];
  colors: string[];
  materials: string[];
  minRating: number | null;
  badges: string[];
  services: string[];
  crossBorder: boolean;
  deliveryMethods: DeliveryMethod[];
  attributes: Record<string, string[]>;
};

export type SortMode = 'popular' | 'price_asc' | 'price_desc';

export const DEFAULT_FILTERS: Filters = {
  query: '',
  minPrice: '',
  maxPrice: '',
  brands: [],
  colors: [],
  materials: [],
  minRating: null,
  badges: [],
  services: [],
  crossBorder: false,
  deliveryMethods: [],
  attributes: {},
};

function parsePrice(value: string): number | null {
  const digits = value.replace(/\D/g, '');
  if (!digits) return null;
  const num = parseInt(digits, 10);
  return Number.isFinite(num) ? num : null;
}

function matchesQuery(product: Product, query: string): boolean {
  if (!query) return true;
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const haystack = [
    product.title,
    product.brand ?? '',
    product.color ?? '',
    product.material ?? '',
    ...(product.breadcrumbs ?? []),
  ]
    .join(' ')
    .toLowerCase();
  return words.every((word) => haystack.includes(word));
}

function matchesPrice(product: Product, min: number | null, max: number | null): boolean {
  if (min !== null && product.price < min) return false;
  if (max !== null && product.price > max) return false;
  return true;
}

function matchesArray<T extends string>(actual: T[] | undefined, expected: T[]): boolean {
  if (expected.length === 0) return true;
  if (!actual || actual.length === 0) return false;
  return expected.some((v) => actual.includes(v));
}

function matchesBadges(product: Product, badges: string[]): boolean {
  if (badges.length === 0) return true;
  const productBadges = new Set(product.featureBadges?.map((b) => b.badgeType) ?? []);
  if (badges.includes('original') && !productBadges.has('Original')) return false;
  if (badges.includes('discount') && !productBadges.has('SIMPLEDiscountTokenType')) return false;
  return true;
}

function matchesServices(product: Product, services: string[]): boolean {
  if (services.length === 0) return true;
  if (services.includes('express') && !product.isExpress) return false;
  if (services.includes('ultima') && !product.isUltima) return false;
  return true;
}

function matchesAttributes(
  product: Product,
  attributes: Record<string, string[]>,
): boolean {
  for (const [key, values] of Object.entries(attributes)) {
    if (values.length === 0) continue;
    const actual = product.attributes?.[key];
    if (!actual || !values.includes(actual)) return false;
  }
  return true;
}

export function filterProducts(products: Product[], filters: Filters): Product[] {
  const min = parsePrice(filters.minPrice);
  const max = parsePrice(filters.maxPrice);

  return products.filter((p) => {
    if (!matchesQuery(p, filters.query)) return false;
    if (!matchesPrice(p, min, max)) return false;
    if (filters.brands.length > 0 && (!p.brand || !filters.brands.includes(p.brand))) return false;
    if (filters.colors.length > 0 && (!p.color || !filters.colors.includes(p.color))) return false;
    if (filters.materials.length > 0 && (!p.material || !filters.materials.includes(p.material))) return false;
    if (filters.minRating !== null && (p.rating === undefined || p.rating < filters.minRating)) return false;
    if (!matchesBadges(p, filters.badges)) return false;
    if (!matchesServices(p, filters.services)) return false;
    if (filters.crossBorder && p.isCrossBorder !== 'true') return false;
    if (!matchesArray(p.deliveryMethods, filters.deliveryMethods)) return false;
    if (!matchesAttributes(p, filters.attributes)) return false;
    return true;
  });
}

export function sortProducts(products: Product[], mode: SortMode): Product[] {
  const copy = [...products];
  switch (mode) {
    case 'price_asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'popular':
    default:
      return copy;
  }
}

export function getAvailableBrands(products: Product[]): string[] {
  const set = new Set<string>();
  products.forEach((p) => p.brand && set.add(p.brand));
  return [...set].sort();
}

export function getAvailableColors(products: Product[]): string[] {
  const set = new Set<string>();
  products.forEach((p) => p.color && set.add(p.color));
  return [...set].sort();
}

export function getAvailableMaterials(products: Product[]): string[] {
  const set = new Set<string>();
  products.forEach((p) => p.material && set.add(p.material));
  return [...set].sort();
}

export function getAvailableDeliveryMethods(products: Product[]): DeliveryMethod[] {
  const set = new Set<DeliveryMethod>();
  products.forEach((p) => p.deliveryMethods?.forEach((m) => set.add(m)));
  return [...set];
}

export function getAvailableAttributeValues(
  products: Product[],
  key: string,
): string[] {
  const set = new Set<string>();
  products.forEach((p) => {
    const value = p.attributes?.[key];
    if (value) set.add(value);
  });
  return [...set].sort((a, b) => a.localeCompare(b, 'ru'));
}