import type { Address } from '../../types';
import { ADDRESS_TYPE_LABEL, formatAddressDetails, formatAddressLine } from '../../utils/address';
import { cx } from '../../utils/cx';
import { Button } from '../ui/Button/Button';
import { IconEdit, IconTrash } from '../ui/icons';
import styles from './AddressCard.module.css';
import { AddressTypeIcon } from './AddressTypeIcon';

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
  onMakeDefault: (address: Address) => void;
}

export function AddressCard({ address, onEdit, onDelete, onMakeDefault }: AddressCardProps) {
  const line = formatAddressLine(address);
  const details = formatAddressDetails(address);

  return (
    <article className={cx(styles.card, address.isDefault && styles.isDefault)} aria-label={line}>
      <header className={styles.header}>
        <span className={styles.typeIcon}>
          <AddressTypeIcon type={address.type} />
        </span>
        <span className={styles.type}>{ADDRESS_TYPE_LABEL[address.type]}</span>
        {address.isDefault && <span className={styles.badge}>Основной</span>}
        <div className={styles.actions}>
          <Button
            variant="ghost"
            size="s"
            iconOnly
            icon={<IconEdit size={18} />}
            aria-label={`Редактировать адрес: ${line}`}
            title="Редактировать"
            onClick={() => onEdit(address)}
          />
          <Button
            variant="ghost"
            size="s"
            iconOnly
            icon={<IconTrash size={18} />}
            aria-label={`Удалить адрес: ${line}`}
            title="Удалить"
            className={styles.delete}
            onClick={() => onDelete(address)}
          />
        </div>
      </header>

      <p className={styles.line}>{line}</p>
      {details && <p className={styles.details}>{details}</p>}
      {address.comment && <p className={styles.comment}>«{address.comment}»</p>}

      {!address.isDefault && (
        <button type="button" className={styles.makeDefault} onClick={() => onMakeDefault(address)}>
          Сделать основным
        </button>
      )}
    </article>
  );
}
