import type { Address, AddressType } from '../types';

export const ADDRESS_TYPE_LABEL: Record<AddressType, string> = {
  home: 'Дом',
  work: 'Работа',
  other: 'Другое',
};

export function formatAddressLine(address: Pick<Address, 'city' | 'street'>): string {
  return [address.city.trim(), address.street.trim()].filter(Boolean).join(', ');
}

export function formatAddressDetails(address: Address): string {
  return [
    address.apartment && `кв./офис ${address.apartment}`,
    address.entrance && `подъезд ${address.entrance}`,
    address.floor && `этаж ${address.floor}`,
    address.intercom && `домофон ${address.intercom}`,
  ]
    .filter(Boolean)
    .join(' · ');
}

let counter = 0;
export function createAddressId(): string {
  counter += 1;
  return `a-${Date.now().toString(36)}-${counter}`;
}
