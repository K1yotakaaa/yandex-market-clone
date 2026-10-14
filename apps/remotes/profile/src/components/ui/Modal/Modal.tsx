import { useEffect, useId, useRef, type MouseEvent, type ReactNode, type SyntheticEvent } from 'react';
import { cx } from '../../../utils/cx';
import { Button } from '../Button/Button';
import { IconClose } from '../icons';
import styles from './Modal.module.css';

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  size?: 's' | 'm';
}

/**
 * Native <dialog> (focus trap, Esc, top layer for free).
 * Renders inside the remote's root so design tokens are inherited — no portal needed.
 * Desktop: centered card. Mobile: bottom sheet.
 */
export function Modal({ open, title, onClose, children, size = 'm' }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const pressedOnBackdrop = useRef(false);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onClose();
  };

  // Close only when both press and release happen on the backdrop (avoids closing on text-selection drags).
  const handleMouseDown = (event: MouseEvent<HTMLDialogElement>) => {
    pressedOnBackdrop.current = event.target === event.currentTarget;
  };
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (pressedOnBackdrop.current && event.target === event.currentTarget) onClose();
    pressedOnBackdrop.current = false;
  };

  return (
    <dialog
      ref={ref}
      className={cx(styles.dialog, styles[size])}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      {open && (
        <div className={styles.inner}>
          <span className={styles.grabber} aria-hidden="true" />
          <header className={styles.header}>
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
            <Button
              variant="secondary"
              size="s"
              iconOnly
              icon={<IconClose />}
              aria-label="Закрыть"
              onClick={onClose}
            />
          </header>
          {children}
        </div>
      )}
    </dialog>
  );
}
