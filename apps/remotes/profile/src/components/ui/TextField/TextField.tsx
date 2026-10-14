import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cx } from '../../../utils/cx';
import styles from './TextField.module.css';

interface FieldMeta {
  label: string;
  error?: string;
  hint?: string;
}

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> & FieldMeta;

/** Filled input with a floating label (label sits inside the field). */
export function TextField({ label, error, hint, id, className, ...rest }: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = `${inputId}-desc`;
  const description = error ?? hint;

  return (
    <div className={cx(styles.field, error && styles.invalid, className)}>
      <div className={styles.control}>
        <input
          id={inputId}
          className={styles.input}
          placeholder=" "
          aria-invalid={error ? true : undefined}
          aria-describedby={description ? descId : undefined}
          {...rest}
        />
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      </div>
      {description && (
        <p id={descId} className={error ? styles.error : styles.hint}>
          {description}
        </p>
      )}
    </div>
  );
}

export type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'placeholder'> &
  FieldMeta & { value: string };

export function TextArea({ label, error, hint, id, className, maxLength, value, ...rest }: TextAreaProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const descId = `${inputId}-desc`;
  const description = error ?? hint;

  return (
    <div className={cx(styles.field, error && styles.invalid, className)}>
      <div className={styles.control}>
        <textarea
          id={inputId}
          className={cx(styles.input, styles.textarea)}
          placeholder=" "
          rows={3}
          value={value}
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={description ? descId : undefined}
          {...rest}
        />
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      </div>
      <div className={styles.meta}>
        {description && (
          <p id={descId} className={error ? styles.error : styles.hint}>
            {description}
          </p>
        )}
        {maxLength !== undefined && (
          <span className={styles.counter} aria-hidden="true">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
