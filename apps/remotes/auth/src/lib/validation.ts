export type ValidationResult = {
  valid: boolean;
  error?: string;
};

const USERNAME_MIN = 3;
const USERNAME_MAX = 20;

export function validateUsername(value: string): ValidationResult {
  const v = value.trim();
  if (v.length === 0) return { valid: false, error: 'Введите имя пользователя' };
  if (v.length < USERNAME_MIN) return { valid: false, error: `Минимум ${USERNAME_MIN} символа` };
  if (v.length > USERNAME_MAX) return { valid: false, error: `Максимум ${USERNAME_MAX} символов` };
  if (!/^[a-zA-Z]/.test(v)) return { valid: false, error: 'Должно начинаться с буквы' };
  if (!/^[a-zA-Z0-9_]+$/.test(v)) return { valid: false, error: 'Только буквы, цифры и _' };
  if (/__/.test(v)) return { valid: false, error: 'Два подряд идущих _ не допускаются' };
  return { valid: true };
}

export function validateEmail(value: string): ValidationResult {
  const v = value.trim();
  if (v.length === 0) return { valid: false, error: 'Введите email' };
  if (v.length > 254) return { valid: false, error: 'Слишком длинный email' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return { valid: false, error: 'Некорректный email' };
  return { valid: true };
}

export function validatePassword(value: string): ValidationResult {
  if (value.length === 0) return { valid: false, error: 'Введите пароль' };
  if (value.length < 8) return { valid: false, error: 'Минимум 8 символов' };
  if (!/[A-Z]/.test(value)) return { valid: false, error: 'Нужна заглавная буква' };
  if (!/[a-z]/.test(value)) return { valid: false, error: 'Нужна строчная буква' };
  if (!/\d/.test(value)) return { valid: false, error: 'Нужна цифра' };
  if (!/[^a-zA-Z0-9]/.test(value)) return { valid: false, error: 'Нужен спецсимвол (!@#$…)' };
  return { valid: true };
}

export function validateConfirmPassword(password: string, confirm: string): ValidationResult {
  if (confirm.length === 0) return { valid: false, error: 'Повторите пароль' };
  if (password !== confirm) return { valid: false, error: 'Пароли не совпадают' };
  return { valid: true };
}

export type PasswordStrength = {
  level: 0 | 1 | 2 | 3;
  label: string;
};

export function getPasswordStrength(value: string): PasswordStrength {
  if (value.length === 0) return { level: 0, label: '' };

  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^a-zA-Z0-9]/.test(value)) score++;

  if (score <= 1) return { level: 1, label: 'Слабый' };
  if (score <= 3) return { level: 2, label: 'Средний' };
  return { level: 3, label: 'Сильный' };
}