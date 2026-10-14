import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../../utils/cx';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 's' | 'm' | 'l';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  fullWidth?: boolean;
  /** Square button with an icon only — pass `aria-label`. */
  iconOnly?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'm',
  icon,
  fullWidth = false,
  iconOnly = false,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        iconOnly && styles.iconOnly,
        className,
      )}
      {...rest}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {!iconOnly && children}
    </button>
  );
}
