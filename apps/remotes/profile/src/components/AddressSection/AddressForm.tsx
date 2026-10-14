import { useRef, type FormEvent } from 'react';
import { useForm } from '../../hooks/useForm';
import type { AddressDraft, AddressType } from '../../types';
import { ADDRESS_TYPE_LABEL } from '../../utils/address';
import { cx } from '../../utils/cx';
import { validateAddress } from '../../utils/validation';
import { Button } from '../ui/Button/Button';
import { TextArea, TextField } from '../ui/TextField/TextField';
import styles from './AddressForm.module.css';
import { AddressTypeIcon } from './AddressTypeIcon';

interface AddressFormProps {
  initial: AddressDraft;
  submitLabel: string;
  /** When set, the address must stay default and the checkbox is locked with this explanation. */
  lockDefaultReason?: string;
  onSubmit: (draft: AddressDraft) => void;
  onCancel: () => void;
}

const TYPES: AddressType[] = ['home', 'work', 'other'];

function normalize(draft: AddressDraft): AddressDraft {
  return {
    ...draft,
    city: draft.city.trim(),
    street: draft.street.trim(),
    apartment: draft.apartment.trim(),
    entrance: draft.entrance.trim(),
    floor: draft.floor.trim(),
    intercom: draft.intercom.trim(),
    comment: draft.comment.trim(),
  };
}

export function AddressForm({ initial, submitLabel, lockDefaultReason, onSubmit, onCancel }: AddressFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { values, errors, setField, touch, submit } = useForm(initial, validateAddress);
  const lockDefault = lockDefaultReason !== undefined;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ok = submit((v) => onSubmit(normalize({ ...v, isDefault: v.isDefault || lockDefault })));
    if (!ok) {
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
    }
  };

  const text = (key: Exclude<keyof AddressDraft, 'type' | 'isDefault'>) => ({
    name: key,
    value: values[key],
    error: errors[key],
    onChange: (e: { target: { value: string } }) => setField(key, e.target.value),
    onBlur: () => touch(key),
  });

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Тип адреса</legend>
        <div className={styles.segmented}>
          {TYPES.map((type) => (
            <label key={type} className={cx(styles.segment, values.type === type && styles.segmentActive)}>
              <input
                className={styles.visuallyHidden}
                type="radio"
                name="type"
                value={type}
                checked={values.type === type}
                onChange={() => setField('type', type)}
              />
              <AddressTypeIcon type={type} size={18} />
              {ADDRESS_TYPE_LABEL[type]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.grid}>
        <TextField label="Город" autoComplete="address-level2" className={styles.span2} {...text('city')} />
        <TextField
          label="Улица и дом"
          autoComplete="street-address"
          className={styles.span2}
          {...text('street')}
        />
        <TextField label="Квартира / офис" maxLength={10} {...text('apartment')} />
        <TextField label="Домофон" maxLength={10} {...text('intercom')} />
        <TextField label="Подъезд" inputMode="numeric" maxLength={3} {...text('entrance')} />
        <TextField label="Этаж" inputMode="numeric" maxLength={3} {...text('floor')} />
        <TextArea label="Комментарий для курьера" maxLength={200} className={styles.span2} {...text('comment')} />
      </div>

      <label className={cx(styles.checkbox, lockDefault && styles.checkboxDisabled)}>
        <input
          type="checkbox"
          className={styles.checkboxInput}
          checked={values.isDefault || lockDefault}
          disabled={lockDefault}
          onChange={(e) => setField('isDefault', e.target.checked)}
        />
        <span>
          Основной адрес доставки
          {lockDefaultReason && <span className={styles.checkboxHint}>{lockDefaultReason}</span>}
        </span>
      </label>

      <div className={styles.actions}>
        <Button type="submit" size="l">
          {submitLabel}
        </Button>
        <Button variant="secondary" size="l" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  );
}
