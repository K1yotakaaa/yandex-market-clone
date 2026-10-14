import { useCallback, useMemo, useState } from 'react';
import type { FormErrors } from '../types';

type Touched<T> = Partial<Record<keyof T, boolean>>;

/**
 * Minimal form state: errors are computed from values and shown
 * only for fields the user has left (blur) or after a submit attempt.
 */
export function useForm<T extends object>(initial: T, validate: (values: T) => FormErrors<T>) {
  const [values, setValues] = useState<T>(initial);
  const [touched, setTouched] = useState<Touched<T>>({});

  const allErrors = useMemo(() => validate(values), [validate, values]);

  const errors = useMemo(() => {
    const visible: FormErrors<T> = {};
    for (const key of Object.keys(allErrors) as (keyof T)[]) {
      if (touched[key]) visible[key] = allErrors[key];
    }
    return visible;
  }, [allErrors, touched]);

  const setField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const touch = useCallback((key: keyof T) => {
    setTouched((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  }, []);

  /** Marks every field as touched; calls `onValid` and returns true when there are no errors. */
  const submit = (onValid: (values: T) => void): boolean => {
    const all: Touched<T> = {};
    for (const key of Object.keys(values) as (keyof T)[]) all[key] = true;
    setTouched(all);

    if (Object.keys(allErrors).length > 0) return false;
    onValid(values);
    return true;
  };

  const reset = useCallback((next: T) => {
    setValues(next);
    setTouched({});
  }, []);

  return { values, errors, setField, touch, submit, reset };
}
