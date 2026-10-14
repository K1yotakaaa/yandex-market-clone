import { useMemo, useRef, type FormEvent } from 'react';
import { useForm } from '../../hooks/useForm';
import type { ProfileFormValues, UserProfile } from '../../types';
import { formatPhone } from '../../utils/phone';
import { validateProfile } from '../../utils/validation';
import { Button } from '../ui/Button/Button';
import { Card } from '../ui/Card/Card';
import { TextField } from '../ui/TextField/TextField';
import styles from './PersonalInfoForm.module.css';

interface PersonalInfoFormProps {
  id?: string;
  profile: UserProfile;
  onSave: (values: ProfileFormValues) => void;
}

const FIELDS: (keyof ProfileFormValues)[] = ['firstName', 'lastName', 'email', 'phone'];

function toValues(profile: UserProfile): ProfileFormValues {
  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone,
  };
}

function normalize(values: ProfileFormValues): ProfileFormValues {
  return {
    firstName: values.firstName.trim().replace(/\s+/g, ' '),
    lastName: values.lastName.trim().replace(/\s+/g, ' '),
    email: values.email.trim().toLowerCase(),
    phone: values.phone,
  };
}

export function PersonalInfoForm({ id, profile, onSave }: PersonalInfoFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const initial = useMemo(() => toValues(profile), [profile]);
  const { values, errors, setField, touch, submit, reset } = useForm(initial, validateProfile);

  const normalized = normalize(values);
  const isDirty = FIELDS.some((key) => normalized[key] !== initial[key]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ok = submit(() => {
      onSave(normalized);
      reset(normalized);
    });
    if (!ok) {
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
    }
  };

  return (
    <Card
      id={id}
      title="Личные данные"
      description="Используются для оформления заказов и связи с вами"
    >
      <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.grid}>
          <TextField
            label="Имя"
            name="firstName"
            autoComplete="given-name"
            value={values.firstName}
            error={errors.firstName}
            onChange={(e) => setField('firstName', e.target.value)}
            onBlur={() => touch('firstName')}
            maxLength={60}
          />
          <TextField
            label="Фамилия"
            name="lastName"
            autoComplete="family-name"
            value={values.lastName}
            error={errors.lastName}
            onChange={(e) => setField('lastName', e.target.value)}
            onBlur={() => touch('lastName')}
            maxLength={60}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            error={errors.email}
            hint="Пришлём сюда чеки и статусы заказов"
            onChange={(e) => setField('email', e.target.value)}
            onBlur={() => touch('email')}
            maxLength={120}
          />
          <TextField
            label="Телефон"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            error={errors.phone}
            hint="Курьер позвонит по этому номеру"
            onChange={(e) => setField('phone', formatPhone(e.target.value))}
            onBlur={() => touch('phone')}
          />
        </div>

        <div className={styles.actions}>
          <Button type="submit" size="l" disabled={!isDirty}>
            Сохранить
          </Button>
          {isDirty && (
            <Button variant="secondary" size="l" onClick={() => reset(initial)}>
              Отменить
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
