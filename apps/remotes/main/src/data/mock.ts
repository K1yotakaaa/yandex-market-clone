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
};


export type Category = {
  hid: number;
  navnodeId: number;
  departmentId: number;
  name: string;
  slug: string;
  parentHid: number | null;
};

export type CategoryStripItem = {
  id: string;
  label: string;
  variant?: 'promo' | 'category';
};

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

export type Banner = {
  id: string;
  title: string;
  subtitle?: string;
  source?: string;
  background: string;
  accent?: string;
  image?: string;
};

export const BANNERS: Banner[] = [
  {
    id: 'chain-life',
    title: 'CHAIN LIFE 2026 В ДУБАЕ — 1-2 ЯНВАРЯ',
    subtitle: 'chain-life.com',
    background: 'linear-gradient(140deg, #1e242c 0%, #2d3540 60%, #3a4553 100%)',
    accent: '#7d9ffc',
    image: 'https://saintjohnjackson.org/wp-content/uploads/2026/09/life-chain-2026.png',
  },
  {
    id: 'yandex-pay',
    title: 'Оценивайте свои финансовые возможности',
    subtitle: 'Рассрочка «0-0-12» на Яндекс Пэй',
    background: 'linear-gradient(140deg, #b9a3ff 0%, #e0c3ff 50%, #ffe0b3 100%)',
    accent: '#5a3fbf',
    image: 'https://avatars.mds.yandex.net/get-market-adv/8276645/f8f65c3f-2b6b-4ceb-aad3-b1dbeb8c8c03/banner-width-1080',
  },
  {
    id: 'design',
    title: 'Выгода на дизайн-проект квартиры!',
    subtitle: '50% скидка до конца месяца',
    background: 'linear-gradient(140deg, #6b4f2a 0%, #a67c3f 60%, #d4a860 100%)',
    accent: '#fce000',
    image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1024,h_456/https://madwins.ru/wp-content/uploads/2020/10/zayavki_na_dizai_774_n_interyera-1024x456.png',
  },
  {
    id: 'tech-sale',
    title: 'Скидки на технику до 40%',
    subtitle: 'Только 3 дня',
    background: 'linear-gradient(140deg, #1e3a5f 0%, #2a5298 60%, #4a7bc8 100%)',
    accent: '#7dd3fc',
    image: 'https://www.technodom.kz/under/banners/gift-for-purchases-video-desktop-poster.png',
  },
  {
    id: 'new-collection',
    title: 'Новая коллекция одежды',
    subtitle: 'Смотреть новинки',
    background: 'linear-gradient(140deg, #6b2a5a 0%, #a84a8c 60%, #d478b0 100%)',
    accent: '#ffd6e7',
    image: 'https://cdn.dribbble.com/userupload/27714606/file/original-1ee6b8bf77f544e4f6336d8318ded376.jpg?resize=752x&vertical=center',
  },
  {
    id: 'holiday-gifts',
    title: 'Подарки к праздникам',
    subtitle: 'До −70% на избранное',
    background: 'linear-gradient(140deg, #7a1e1e 0%, #c23a3a 60%, #e87070 100%)',
    accent: '#ffe08a',
    image: 'https://www.cabinzero.com/cdn/shop/articles/image2_6df7b785-52d8-45c5-b7ad-9aa01f1277b2.png?v=1733480717',
  },
];

export const PRODUCTS: Product[] = [
  {
    oskuId: '103296357068',
    marketSku: '103296357068',
    wareId: 'ewQyPqXZNmuCBtrfAX-mPQ',
    modelId: 765476325,
    omodelId: 765476325,
    hid: 90561,
    vendorId: 37325630,
    businessId: '64713536',
    shopId: 64713542,
    supplierId: 64713542,
    supplierType: 0,
    title: 'Смартфон Honor 600 Lite, 8 ГБ, 256 ГБ, чёрный',
    type: 'model',
    snippetType: 'product',
    snippetTheme: 'GRID_FEED',
    price: 30789,
    additionalPrices: [
      { priceType: 'yaBank', priceValue: 29249 },
      { priceType: 'withDiscount', priceValue: 29850 },
    ],
    vat: 'VAT_20',
    featureBadges: [
      { badgeTitle: 'Оригинал', badgeType: 'Original' },
      { badgeTitle: 'Скидка 12%', badgeType: 'SIMPLEDiscountTokenType' },
    ],
    isCrossBorder: 'false',
    isExpress: true,
    isAvailable: true,
    sponsored: false,
    signals: [],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRq5iUg-iyOKaEVF27wLuhvOlyEpavMQh-OGS3tsol-g&s=10',
  },
  {
    oskuId: '103296357069',
    marketSku: '103296357069',
    wareId: 'aBcDeF1234567',
    modelId: 765476400,
    omodelId: 765476400,
    hid: 54726,
    vendorId: 12345678,
    businessId: '64713537',
    shopId: 64713543,
    supplierId: 64713543,
    supplierType: 0,
    title: 'Подписка Google AI Pro на 18 месяцев',
    type: 'model',
    snippetType: 'product',
    snippetTheme: 'GRID_FEED',
    price: 423,
    vat: 'VAT_20',
    featureBadges: [{ badgeTitle: 'Новинка', badgeType: 'Original' }],
    isCrossBorder: 'false',
    isAvailable: true,
    sponsored: false,
    signals: [],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBEYhLoCHEms1iUxUR6GvpsAmlEeuj6M7ZAfUwlrHCWQ&s=10'
  },
  {
    oskuId: '103296357070',
    marketSku: '103296357070',
    wareId: 'zZzYyX9876543',
    modelId: 765476500,
    omodelId: 765476500,
    hid: 54422,
    vendorId: 98765432,
    businessId: '64713538',
    shopId: 64713544,
    supplierId: 64713544,
    supplierType: 0,
    title: 'Панель ящика Атлант, пластик, 47 см × 18,5 см',
    type: 'model',
    snippetType: 'product',
    snippetTheme: 'GRID_FEED',
    price: 970,
    vat: 'VAT_20',
    isCrossBorder: 'false',
    isAvailable: true,
    sponsored: false,
    signals: [],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ycHHnIfxrBHYmrbx6d8V3ZWAwJ9yqpTBnRNoFIuZ-w&s=10',
  },
  {
    oskuId: '103296357071',
    marketSku: '103296357071',
    wareId: 'qWeRtY1112223',
    modelId: 765476600,
    omodelId: 765476600,
    hid: 54422,
    vendorId: 11111111,
    businessId: '64713539',
    shopId: 64713545,
    supplierId: 64713545,
    supplierType: 0,
    title: 'Ковер принтованный на шенилле "Persian 417", 120 × 170 см',
    type: 'model',
    snippetType: 'product',
    snippetTheme: 'GRID_FEED',
    price: 2422,
    vat: 'VAT_20',
    isCrossBorder: 'false',
    isAvailable: true,
    sponsored: false,
    signals: [],
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSb8WY49ynmpbnzTMl1q6mYSKNn68VxM3dTg4ydwsyHY_26ajaNn5l8mlAOaUpCtTCwO6I67iWpvySKc-7sDVkr8NQs2mljKaLQVgbiVzcQtU99g8Bdkj44-w&usqp=CAc',
  },
  {
    oskuId: '103296357072',
    marketSku: '103296357072',
    wareId: 'mNbVcX5554443',
    modelId: 765476700,
    omodelId: 765476700,
    hid: 7847,
    vendorId: 22222222,
    businessId: '64713540',
    shopId: 64713546,
    supplierId: 64713546,
    supplierType: 0,
    title: 'Конструктор «Город в деталях. Встречайте робота»',
    type: 'model',
    snippetType: 'product',
    snippetTheme: 'GRID_FEED',
    price: 2593,
    vat: 'VAT_20',
    isCrossBorder: 'false',
    isAvailable: true,
    sponsored: false,
    signals: [],
    image: 'https://avatars.mds.yandex.net/get-mpic/19770450/2a0000019eb10f831379a873b6e8b508aaa5/orig',
  },
  {
    oskuId: '103296357073',
    marketSku: '103296357073',
    wareId: 'pOiuYtRe7778889',
    modelId: 765476800,
    omodelId: 765476800,
    hid: 54726,
    vendorId: 33333333,
    businessId: '64713541',
    shopId: 64713547,
    supplierId: 64713547,
    supplierType: 3,
    title: 'Универсальный внешний аккумулятор COMMO AEON, 10 000 мАч',
    type: 'model',
    snippetType: 'product',
    snippetTheme: 'GRID_FEED',
    price: 2238,
    vat: 'NO_VAT',
    isCrossBorder: 'true',
    isAvailable: true,
    sponsored: false,
    signals: [{ type: 'crossborder', title: 'Из-за рубежа' }],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQTsO-B4B1Sx2XGnoy1cXbqYAlURtmZEPlkKiQ5aQL5Q&s=10',
  },
  {
    oskuId: '103296357074',
    marketSku: '103296357074',
    wareId: 'lKjHgF1112131',
    modelId: 765476900,
    omodelId: 765476900,
    hid: 54422,
    vendorId: 44444444,
    businessId: '64713542',
    shopId: 64713548,
    supplierId: 64713548,
    supplierType: 0,
    title: 'Настольная лампа с регулировкой яркости, LED, 12 Вт',
    type: 'model',
    snippetType: 'product',
    snippetTheme: 'GRID_FEED',
    price: 1890,
    additionalPrices: [{ priceType: 'withDiscount', priceValue: 1790 }],
    vat: 'VAT_20',
    isCrossBorder: 'false',
    isAvailable: true,
    sponsored: false,
    signals: [],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxFkE4zNMMD3zcYHZ-UMo2PL8AU-BJI5EeAIGwodynsQ&s=10',
  },
  {
    oskuId: '103296357075',
    marketSku: '103296357075',
    wareId: 'pPpOoO2223344',
    modelId: 765477000,
    omodelId: 765477000,
    hid: 54726,
    vendorId: 55555555,
    businessId: '64713543',
    shopId: 64713549,
    supplierId: 64713549,
    supplierType: 0,
    title: 'Беспроводные наушники с активным шумоподавлением',
    type: 'model',
    snippetType: 'product',
    snippetTheme: 'GRID_FEED',
    price: 5490,
    additionalPrices: [
      { priceType: 'yaBank', priceValue: 5216 },
      { priceType: 'withDiscount', priceValue: 4990 },
    ],
    vat: 'VAT_20',
    featureBadges: [
      { badgeTitle: 'Оригинал', badgeType: 'Original' },
      { badgeTitle: 'Скидка 9%', badgeType: 'SIMPLEDiscountTokenType' },
    ],
    isCrossBorder: 'false',
    isAvailable: true,
    sponsored: false,
    signals: [],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQRFZYPMYzB3hGMGe8LjFE7_r6nTQa6Da_nBQEQU-r8Q&s=10',
  },
  {
    oskuId: '103296357076',
    marketSku: '103296357076',
    wareId: 'uUuYyT3334455',
    modelId: 765477100,
    omodelId: 765477100,
    hid: 54422,
    vendorId: 66666666,
    businessId: '64713544',
    shopId: 64713550,
    supplierId: 64713550,
    supplierType: 0,
    title: 'Электрочайник стеклянный, 1.7 л, с подсветкой',
    type: 'model',
    snippetType: 'product',
    snippetTheme: 'GRID_FEED',
    price: 2310,
    vat: 'VAT_20',
    isCrossBorder: 'false',
    isAvailable: true,
    sponsored: false,
    signals: [],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6ZCGIfynQpRw3Hqowc4c_u1FEkxKVOY6QU_ju1K71TA&s=10',
  },
  {
    oskuId: '103296357077',
    marketSku: '103296357077',
    wareId: 'iIuUyY4445566',
    modelId: 765477200,
    omodelId: 765477200,
    hid: 90561,
    vendorId: 77777777,
    businessId: '64713545',
    shopId: 64713551,
    supplierId: 64713551,
    supplierType: 0,
    title: 'Рюкзак городской, водоотталкивающий, 22 л',
    type: 'model',
    snippetType: 'product',
    snippetTheme: 'GRID_FEED',
    price: 3450,
    additionalPrices: [{ priceType: 'withDiscount', priceValue: 3290 }],
    vat: 'VAT_20',
    isCrossBorder: 'false',
    isAvailable: true,
    sponsored: false,
    signals: [],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0BpP0OAHs4o0vSZ7mJeOBRGQMAhToDI-6dlbJuNjTrg&s=10',
  },
  {
    oskuId: '103296357078',
    marketSku: '103296357078',
    wareId: 'oOoPpP5556677',
    modelId: 765477300,
    omodelId: 765477300,
    hid: 54422,
    vendorId: 88888888,
    businessId: '64713546',
    shopId: 64713552,
    supplierId: 64713552,
    supplierType: 0,
    title: 'Комплект постельного белья, сатин, 2-спальный',
    type: 'model',
    snippetType: 'product',
    snippetTheme: 'GRID_FEED',
    price: 4120,
    vat: 'VAT_20',
    isCrossBorder: 'false',
    isAvailable: true,
    sponsored: false,
    signals: [],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZJuzaT85GQS3XdNDSNgIK4E-MSTQFhgLSfki0HBaCvQ&s=10',
  },
  {
    oskuId: '103296357079',
    marketSku: '103296357079',
    wareId: 'qQqWwE6667788',
    modelId: 765477400,
    omodelId: 765477400,
    hid: 54726,
    vendorId: 99999999,
    businessId: '64713547',
    shopId: 64713553,
    supplierId: 64713553,
    supplierType: 0,
    title: 'Умные часы с AMOLED-дисплеем и GPS',
    type: 'model',
    snippetType: 'product',
    snippetTheme: 'GRID_FEED',
    price: 8990,
    additionalPrices: [
      { priceType: 'yaBank', priceValue: 8540 },
      { priceType: 'withDiscount', priceValue: 7990 },
    ],
    vat: 'VAT_20',
    featureBadges: [
      { badgeTitle: 'Скидка 25%', badgeType: 'SIMPLEDiscountTokenType' },
    ],
    isCrossBorder: 'false',
    isAvailable: true,
    sponsored: true,
    signals: [],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXipQxFww-4-Z4MD1IRdOSTBta6v1Cfh3AlJFFrofnZQ&s=10',
  },
];