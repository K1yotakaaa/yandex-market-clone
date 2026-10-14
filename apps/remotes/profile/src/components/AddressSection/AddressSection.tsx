import { useState } from 'react';
import { emptyAddressDraft } from '../../mocks/profile';
import type { Address, AddressDraft } from '../../types';
import { formatAddressLine } from '../../utils/address';
import { Button } from '../ui/Button/Button';
import { Card } from '../ui/Card/Card';
import { IconPin, IconPlus } from '../ui/icons';
import { Modal } from '../ui/Modal/Modal';
import { AddressCard } from './AddressCard';
import { AddressForm } from './AddressForm';
import styles from './AddressSection.module.css';

interface AddressSectionProps {
  id?: string;
  addresses: Address[];
  onAdd: (draft: AddressDraft) => void;
  onUpdate: (id: string, draft: AddressDraft) => void;
  onRemove: (id: string) => void;
  onMakeDefault: (id: string) => void;
}

type EditorState = { mode: 'closed' } | { mode: 'create' } | { mode: 'edit'; address: Address };

function toDraft(address: Address): AddressDraft {
  return {
    type: address.type,
    city: address.city,
    street: address.street,
    apartment: address.apartment,
    entrance: address.entrance,
    floor: address.floor,
    intercom: address.intercom,
    comment: address.comment,
    isDefault: address.isDefault,
  };
}

export function AddressSection({ id, addresses, onAdd, onUpdate, onRemove, onMakeDefault }: AddressSectionProps) {
  const [editor, setEditor] = useState<EditorState>({ mode: 'closed' });
  const [toDelete, setToDelete] = useState<Address | null>(null);

  const closeEditor = () => setEditor({ mode: 'closed' });
  const openCreate = () => setEditor({ mode: 'create' });

  const handleSubmit = (draft: AddressDraft) => {
    if (editor.mode === 'edit') onUpdate(editor.address.id, draft);
    else onAdd(draft);
    closeEditor();
  };

  const confirmDelete = () => {
    if (toDelete) onRemove(toDelete.id);
    setToDelete(null);
  };

  // The default flag can't be unset directly: one address must always be default.
  let lockDefaultReason: string | undefined;
  if (editor.mode === 'create' && addresses.length === 0) {
    lockDefaultReason = 'Первый адрес всегда становится основным';
  } else if (editor.mode === 'edit' && editor.address.isDefault) {
    lockDefaultReason =
      addresses.length > 1
        ? 'Чтобы сменить основной, нажмите «Сделать основным» у другого адреса'
        : 'Единственный адрес всегда основной';
  }

  return (
    <Card
      id={id}
      title="Адреса доставки"
      description={
        addresses.length > 0
          ? 'Основной адрес подставляется при оформлении заказа'
          : 'Добавьте адрес, чтобы быстрее оформлять заказы'
      }
      action={
        addresses.length > 0 && (
          <Button variant="secondary" icon={<IconPlus size={18} />} onClick={openCreate}>
            <span className={styles.addLabel}>Добавить</span>
          </Button>
        )
      }
    >
      {addresses.length > 0 ? (
        <ul className={styles.list}>
          {addresses.map((address) => (
            <li key={address.id} className={styles.item}>
              <AddressCard
                address={address}
                onEdit={(a) => setEditor({ mode: 'edit', address: a })}
                onDelete={setToDelete}
                onMakeDefault={(a) => onMakeDefault(a.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>
            <IconPin size={28} />
          </span>
          <p className={styles.emptyTitle}>Пока нет сохранённых адресов</p>
          <p className={styles.emptyText}>Курьер привезёт заказ туда, куда удобно вам</p>
          <Button icon={<IconPlus size={18} />} size="l" onClick={openCreate}>
            Добавить адрес
          </Button>
        </div>
      )}

      <Modal
        open={editor.mode !== 'closed'}
        title={editor.mode === 'edit' ? 'Редактирование адреса' : 'Новый адрес'}
        onClose={closeEditor}
      >
        {editor.mode !== 'closed' && (
          <AddressForm
            key={editor.mode === 'edit' ? editor.address.id : 'new'}
            initial={editor.mode === 'edit' ? toDraft(editor.address) : emptyAddressDraft}
            submitLabel={editor.mode === 'edit' ? 'Сохранить' : 'Добавить адрес'}
            lockDefaultReason={lockDefaultReason}
            onSubmit={handleSubmit}
            onCancel={closeEditor}
          />
        )}
      </Modal>

      <Modal open={toDelete !== null} title="Удалить адрес?" size="s" onClose={() => setToDelete(null)}>
        {toDelete && (
          <div className={styles.confirm}>
            <p className={styles.confirmText}>
              {formatAddressLine(toDelete)}
              {toDelete.isDefault && addresses.length > 1 && (
                <span className={styles.confirmNote}>Основным станет следующий адрес в списке.</span>
              )}
            </p>
            <div className={styles.confirmActions}>
              <Button variant="danger" size="l" onClick={confirmDelete}>
                Удалить
              </Button>
              <Button variant="secondary" size="l" onClick={() => setToDelete(null)}>
                Отмена
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
}
