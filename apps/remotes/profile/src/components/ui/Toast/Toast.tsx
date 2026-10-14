import { useEffect } from 'react';
import { cx } from '../../../utils/cx';
import { IconCheck, IconClose } from '../icons';
import styles from './Toast.module.css';

export interface ToastMessage {
  id: number;
  text: string;
  tone?: 'success' | 'error';
}

interface ToastProps {
  toast: ToastMessage | null;
  onHide: () => void;
  duration?: number;
}

export function Toast({ toast, onHide, duration = 2600 }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(onHide, duration);
    return () => window.clearTimeout(timer);
  }, [toast, onHide, duration]);

  const isError = toast?.tone === 'error';

  return (
    <div className={styles.region} role="status" aria-live="polite">
      {toast && (
        <div key={toast.id} className={styles.toast}>
          <span className={cx(styles.badge, isError && styles.badgeError)}>
            {isError ? (
              <IconClose size={14} strokeWidth={2.6} />
            ) : (
              <IconCheck size={14} strokeWidth={2.6} />
            )}
          </span>
          {toast.text}
        </div>
      )}
    </div>
  );
}
