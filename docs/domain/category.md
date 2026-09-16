# Category Taxonomy — Domain Model

Source: `market.yandex.ru`, breadcrumbs on product pages and the top-level catalog menu.

> Status: first draft. Based on breadcrumb trails confirmed on real products across
> several different departments. Not a full traversal of the entire catalog menu.

## Top-level departments (from the site header)

- Все хиты
- Спешл
- Ultima
- Из-за рубежа
- Одежда
- Дом
- Ремонт
- Детям
- Красота
- Электроника
- Продукты

Each links to its own URL, e.g. `/special/electronics_dep` (Электроника),
`/catalog--tovary-dlia-doma/54422` (Дом). The trailing number is `departmentId`,
same ID that appears on product objects (see `product.md`).

## Confirmed category paths (breadcrumbs from real products)

### Дом → Менажницы

Товары для дома → Посуда и кухонные принадлежности → Посуда и приборы для сервировки стола → Блюда и салатники для сервировки → Менажницы

### Аптека → Витаминные комплексы NFO

Аптека → Витамины, БАД и добавки → Витаминные комплексы → Витаминные комплексы NFO

> Note: this last level ("Витаминные комплексы NFO") looks like an auto-generated
> brand-specific bucket inside the general category, not a "real" subcategory.

### Электроника → Мобильные телефоны Samsung

Электроника → Смартфоны и гаджеты → Мобильные телефоны → Мобильные телефоны Samsung

## Full subcategory list for "Электроника" (confirmed)

- Смартфоны и гаджеты
- Наушники и аудиотехника
- Аксессуары для смартфонов
- Компьютеры и комплектующие
- Ноутбуки
- Телевизоры
- Проекторы и видеотехника
- Умные колонки
- Умные часы и браслеты
- Фото- и видеокамеры
- Квадрокоптеры
- Оргтехника и расходные материалы
- Умный дом
- Робототехника и 3D принтеры
- Автомобильная электроника
- Сетевое оборудование

## Notes / inconsistencies

- Each category has its own `categoryId`/`hid` AND a separate `navnodeId` — these
  are two different numeric spaces for the same category, both need to be captured.
- URL format is inconsistent: most categories use `/category/{slug}`, but some use
  a legacy `/catalog--{slug}/{id}/list` format.
- The last level of a breadcrumb path is not always a "real" category — sometimes
  it's a brand-specific filter presented as if it were a category level.

## To do

- Walk the full catalog menu (button "Каталог" in the header) for departments not
  yet covered: Одежда, Красота, Продукты, Детям, Ремонт
- Confirm at least one more full breadcrumb path per department