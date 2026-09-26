export type SectionId =
  | 'mission'
  | 'numbers'
  | 'directions'
  | 'history'
  | 'partners'
  | 'contacts';

export const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'mission', label: '' },
  { id: 'numbers', label: '' },
  { id: 'directions', label: '' },
  { id: 'history', label: '' },
  { id: 'partners', label: '' },
  { id: 'contacts', label: '' },
];

export const HERO = {
  eyebrow: '',
  titleStart: '',
  titleAccent: '',
  description: '',
};

export type Stat = { value: string; unit?: string; label: string };

export const STATS: Stat[] = [
  { value: '', unit: '', label: '' },
  { value: '', unit: '', label: '' },
  { value: '', unit: '', label: '' },
  { value: '', unit: '', label: '' },
];

export type DirectionIcon = 'marketplace' | 'logistics' | 'sellers' | 'tech';

export type Direction = {
  icon: DirectionIcon;
  title: string;
  description: string;
  tags: string[];
};

export const DIRECTIONS: Direction[] = [
  { icon: 'marketplace', title: '', description: '', tags: [] },
  { icon: 'logistics', title: '', description: '', tags: [] },
  { icon: 'sellers', title: '', description: '', tags: [] },
  { icon: 'tech', title: '', description: '', tags: [] },
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