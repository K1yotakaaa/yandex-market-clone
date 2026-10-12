export type FeatureBadge = {
  badgeTitle: string;
  badgeType: 'Original' | 'SIMPLEDiscountTokenType' | string;
};

export type Signal = {
  type: 'crossborder' | string;
  title: string;
};

export type AdditionalPrice = {
  priceType: 'yaBank' | 'withDiscount' | string;
  priceValue: number;
};

export type ProductSpecGroup = {
  group: string;
  items: [string, string][];
};

export type DeliveryMethod = 'courier' | 'pickup' | 'post';

export type Product = {
  oskuId: string;
  marketSku: string;
  wareId: string;
  modelId: number;
  omodelId: number;
  hid: number;
  vendorId: number;
  businessId: string;
  shopId: number;
  supplierId: number;
  supplierType: number;
  title: string;
  type: 'model';
  snippetType: 'product';
  snippetTheme: 'GRID_FEED';
  price: number;
  additionalPrices?: AdditionalPrice[];
  vat?: 'NO_VAT' | 'VAT_20' | string;
  featureBadges?: FeatureBadge[];
  isCrossBorder: string;
  isUltima?: boolean;
  isExpress?: boolean;
  isAvailable: boolean;
  sponsored: boolean;
  signals: Signal[];
  image?: string;
  images?: string[];
  description?: string;
  specs?: ProductSpecGroup[];
  rating?: number;
  reviewCount?: number;
  soldCount?: number;
  brand?: string;
  breadcrumbs?: string[];
  warranty?: string;
  color?: string;
  material?: string;
  attributes?: Record<string, string>;
  deliveryMethods?: DeliveryMethod[];
};