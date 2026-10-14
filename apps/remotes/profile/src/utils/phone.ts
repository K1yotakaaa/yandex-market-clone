const PHONE_LENGTH = 11;

export function phoneDigits(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Progressive mask: "+7 (XXX) XXX-XX-XX".
 * Separators are only added once the next group has a digit, so backspace never gets stuck.
 */
export function formatPhone(raw: string): string {
  let digits = phoneDigits(raw);
  if (!digits) return '';

  if (digits[0] === '8') digits = `7${digits.slice(1)}`;
  else if (digits[0] !== '7') digits = `7${digits}`;
  digits = digits.slice(0, PHONE_LENGTH);

  const code = digits.slice(1, 4);
  const first = digits.slice(4, 7);
  const second = digits.slice(7, 9);
  const third = digits.slice(9, 11);

  let result = '+7';
  if (code) result += ` (${code}`;
  if (first) result += `) ${first}`;
  if (second) result += `-${second}`;
  if (third) result += `-${third}`;
  return result;
}

export function isPhoneComplete(value: string): boolean {
  return phoneDigits(value).length === PHONE_LENGTH;
}
