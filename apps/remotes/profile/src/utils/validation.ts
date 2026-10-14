import type { AddressDraft, FormErrors, ProfileFormValues } from '../types';
import { isPhoneComplete } from './phone';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE = /^\p{L}[\p{L}\s'-]*$/u;
const SMALL_NUMBER_RE = /^\d{1,3}$/;

function validateName(value: string, emptyMessage: string): string | undefined {
  const name = value.trim();
  if (!name) return emptyMessage;
  if (name.length < 2) return 'Минимум 2 символа';
  if (name.length > 50) return 'Не более 50 символов';
  if (!NAME_RE.test(name)) return 'Только буквы, пробел, дефис или апостроф';
  return undefined;
}

export function validateProfile(values: ProfileFormValues): FormErrors<ProfileFormValues> {
  const errors: FormErrors<ProfileFormValues> = {};

  const firstName = validateName(values.firstName, 'Укажите имя');
  if (firstName) errors.firstName = firstName;

  const lastName = validateName(values.lastName, 'Укажите фамилию');
  if (lastName) errors.lastName = lastName;

  const email = values.email.trim();
  if (!email) errors.email = 'Укажите email';
  else if (!EMAIL_RE.test(email)) errors.email = 'Проверьте формат: name@example.com';

  if (!values.phone) errors.phone = 'Укажите номер телефона';
  else if (!isPhoneComplete(values.phone)) errors.phone = 'Введите номер полностью';

  return errors;
}

export function validateAddress(values: AddressDraft): FormErrors<AddressDraft> {
  const errors: FormErrors<AddressDraft> = {};

  const city = values.city.trim();
  if (!city) errors.city = 'Укажите город';
  else if (city.length < 2) errors.city = 'Минимум 2 символа';

  const street = values.street.trim();
  if (!street) errors.street = 'Укажите улицу и дом';
  else if (!/\d/.test(street)) errors.street = 'Добавьте номер дома';

  if (values.apartment.length > 10) errors.apartment = 'Не более 10 символов';
  if (values.entrance && !SMALL_NUMBER_RE.test(values.entrance)) errors.entrance = 'Только цифры';
  if (values.floor && !SMALL_NUMBER_RE.test(values.floor)) errors.floor = 'Только цифры';
  if (values.intercom.length > 10) errors.intercom = 'Не более 10 символов';
  if (values.comment.length > 200) errors.comment = 'Не более 200 символов';

  return errors;
}
