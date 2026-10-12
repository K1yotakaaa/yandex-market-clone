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