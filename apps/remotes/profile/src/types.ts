/**
 * Local view model for the profile page.
 * Account identity (username, email, registration date) comes from @marketplace/shared-state;
 * name / phone / addresses are still local placeholders until the real API exists.
 */

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  /** Stored formatted: +7 (XXX) XXX-XX-XX, empty when not set */
  phone: string;
  /** Human-readable, e.g. "14 октября 2026" */
  memberSince: string;
}

export type ProfileFormValues = Pick<UserProfile, 'firstName' | 'lastName' | 'email' | 'phone'>;

export type AddressType = 'home' | 'work' | 'other';

export interface Address {
  id: string;
  type: AddressType;
  city: string;
  street: string;
  apartment: string;
  entrance: string;
  floor: string;
  intercom: string;
  comment: string;
  isDefault: boolean;
}

export type AddressDraft = Omit<Address, 'id'>;

export interface ProfileStat {
  id: string;
  label: string;
  value: string;
}

export type FormErrors<T> = Partial<Record<keyof T, string>>;
