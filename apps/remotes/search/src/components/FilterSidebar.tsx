import type { ReactNode } from 'react';
import type { DeliveryMethod, Product } from '@marketplace/shared-types';
import {
  DEFAULT_FILTERS,
  getAvailableAttributeValues,
  getAvailableBrands,
  getAvailableColors,
  getAvailableDeliveryMethods,
  getAvailableMaterials,
  type Filters,
} from '../lib/filters';
import { detectSchema, type FilterField } from '../lib/filterSchemas';
import { UserIcon } from './icons';
import styles from './FilterSidebar.module.css';

type Props = {
  filters: Filters;
  onChange: (filters: Filters) => void;
  products: Product[];
};

const DELIVERY_LABELS: Record<DeliveryMethod, string> = {
  courier: 'Курьером',
  pickup: 'В пункт выдачи',
  post: 'Почтой',
};

function FilterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      {children}
    </section>
  );
}

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={selected ? `${styles.chip} ${styles.chipActive}` : styles.chip}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function toggle<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

function AttributeSection({
  field,
  values,
  selected,
  onToggle,
}: {
  field: FilterField;
  values: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  if (values.length === 0) return null;
  return (
    <FilterSection title={field.label}>
      <div className={styles.chipGroup}>
        {values.map((value) => (
          <Chip
            key={value}
            label={value}
            selected={selected.includes(value)}
            onClick={() => onToggle(value)}
          />
        ))}
      </div>
    </FilterSection>
  );
}

export function FilterSidebar({ filters, onChange, products }: Props) {
  const update = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    onChange({ ...filters, [key]: value });

  const queryProducts = products.filter((p) => {
    if (!filters.query) return true;
    const words = filters.query.toLowerCase().split(/\s+/).filter(Boolean);
    const haystack = [
      p.title,
      p.brand ?? '',
      p.color ?? '',
      p.material ?? '',
      ...(p.breadcrumbs ?? []),
    ]
      .join(' ')
      .toLowerCase();
    return words.every((w) => haystack.includes(w));
  });

  const schema = detectSchema(filters.query);

  const brands = getAvailableBrands(queryProducts);
  const colors = getAvailableColors(queryProducts);
  const materials = getAvailableMaterials(queryProducts);
  const deliveryMethods = getAvailableDeliveryMethods(queryProducts);

  const hasActiveFilters =
    filters.minPrice !== '' ||
    filters.maxPrice !== '' ||
    filters.brands.length > 0 ||
    filters.colors.length > 0 ||
    filters.materials.length > 0 ||
    filters.minRating !== null ||
    filters.badges.length > 0 ||
    filters.services.length > 0 ||
    filters.crossBorder ||
    filters.deliveryMethods.length > 0 ||
    Object.values(filters.attributes).some((v) => v.length > 0);

  const resetAll = () =>
    onChange({ ...DEFAULT_FILTERS, query: filters.query });

  const toggleAttribute = (key: string, value: string) => {
    const current = filters.attributes[key] ?? [];
    const next = toggle(current, value);
    update('attributes', { ...filters.attributes, [key]: next });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.loginCard}>
        <div className={styles.loginRow}>
          <span className={styles.loginIcon} aria-hidden="true">
            <UserIcon />
          </span>
          <div className={styles.loginText}>
            <p className={styles.loginTitle}>Войдите, и станет дешевле</p>
            <p className={styles.loginSubtitle}>В аккаунте доступны скидки</p>
          </div>
        </div>
        <button type="button" className={styles.loginBtn}>
          Войти
        </button>
      </div>

      <FilterSection title="Цена, ₽">
        <div className={styles.priceRow}>
          <input
            type="text"
            inputMode="numeric"
            placeholder="От"
            value={filters.minPrice}
            onChange={(e) => update('minPrice', e.target.value)}
            className={styles.priceInput}
          />
          <input
            type="text"
            inputMode="numeric"
            placeholder="До"
            value={filters.maxPrice}
            onChange={(e) => update('maxPrice', e.target.value)}
            className={styles.priceInput}
          />
        </div>
      </FilterSection>

      {brands.length > 0 && (
        <FilterSection title="Бренд">
          <div className={styles.chipGroup}>
            {brands.map((brand) => (
              <Chip
                key={brand}
                label={brand}
                selected={filters.brands.includes(brand)}
                onClick={() => update('brands', toggle(filters.brands, brand))}
              />
            ))}
          </div>
        </FilterSection>
      )}

      {schema &&
        schema.fields.map((field) => (
          <AttributeSection
            key={field.key}
            field={field}
            values={getAvailableAttributeValues(queryProducts, field.key)}
            selected={filters.attributes[field.key] ?? []}
            onToggle={(value) => toggleAttribute(field.key, value)}
          />
        ))}

      {colors.length > 0 && (
        <FilterSection title="Цвет">
          <div className={styles.chipGroup}>
            {colors.map((color) => (
              <Chip
                key={color}
                label={color}
                selected={filters.colors.includes(color)}
                onClick={() => update('colors', toggle(filters.colors, color))}
              />
            ))}
          </div>
        </FilterSection>
      )}

      {materials.length > 0 && (
        <FilterSection title="Материал">
          <div className={styles.chipGroup}>
            {materials.map((material) => (
              <Chip
                key={material}
                label={material}
                selected={filters.materials.includes(material)}
                onClick={() => update('materials', toggle(filters.materials, material))}
              />
            ))}
          </div>
        </FilterSection>
      )}

      <FilterSection title="Рейтинг">
        <div className={styles.chipGroup}>
          <Chip
            label="от 4.0"
            selected={filters.minRating === 4.0}
            onClick={() => update('minRating', filters.minRating === 4.0 ? null : 4.0)}
          />
          <Chip
            label="от 4.5"
            selected={filters.minRating === 4.5}
            onClick={() => update('minRating', filters.minRating === 4.5 ? null : 4.5)}
          />
        </div>
      </FilterSection>

      <FilterSection title="Акции">
        <div className={styles.chipGroup}>
          <Chip
            label="Ниже рынка"
            selected={filters.badges.includes('discount')}
            onClick={() => update('badges', toggle(filters.badges, 'discount'))}
          />
          <Chip label="Баллы за отзыв" selected={false} onClick={() => {}} />
        </div>
      </FilterSection>

      <FilterSection title="Проверено Маркетом">
        <div className={styles.chipGroup}>
          <Chip
            label="Оригинал"
            selected={filters.badges.includes('original')}
            onClick={() => update('badges', toggle(filters.badges, 'original'))}
          />
        </div>
      </FilterSection>

      <FilterSection title="Сервис">
        <div className={styles.chipGroup}>
          <Chip
            label="Ultima"
            selected={filters.services.includes('ultima')}
            onClick={() => update('services', toggle(filters.services, 'ultima'))}
          />
          <Chip
            label="Экспресс"
            selected={filters.services.includes('express')}
            onClick={() => update('services', toggle(filters.services, 'express'))}
          />
        </div>
      </FilterSection>

      {deliveryMethods.length > 0 && (
        <FilterSection title="Способ доставки">
          <div className={styles.chipGroup}>
            {deliveryMethods.map((method) => (
              <Chip
                key={method}
                label={DELIVERY_LABELS[method]}
                selected={filters.deliveryMethods.includes(method)}
                onClick={() =>
                  update('deliveryMethods', toggle(filters.deliveryMethods, method))
                }
              />
            ))}
          </div>
        </FilterSection>
      )}

      <FilterSection title="Отправка">
        <div className={styles.chipGroup}>
          <Chip
            label="Из-за рубежа"
            selected={filters.crossBorder}
            onClick={() => update('crossBorder', !filters.crossBorder)}
          />
        </div>
      </FilterSection>

      {hasActiveFilters && (
        <button type="button" className={styles.resetBtn} onClick={resetAll}>
          Сбросить фильтры
        </button>
      )}
    </aside>
  );
}