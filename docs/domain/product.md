# Product Card — Domain Model
Source: `market.yandex.ru`, data has been extracted from HTML-Response the site renders SSR markup with embedded
JSON state in the form of a widget tree (`widgets` -> `collections`)

## Product Fields

### Identifiers

- `oskuId` — offer ID — `103296357068`
- `marketSku` — another ID — `"103296357068"` (same value as oskuId, but as a string)
- `wareId` — another offer ID — `"ewQyPqXZNmuCBtrfAX-mPQ"`
- `modelId` / `omodelId` — product model ID — `765476325` (identical values)
- `hid` — category ID — `7812201`
- `vendorId` — brand ID — `37325630`
- `feedId` — seller's price feed ID — `22423900`
- `shopSku` — seller's SKU/article — `"А011/хаки"` (seller seems to encode the color "khaki" directly into the SKU via `/`). Format is not standardized — seen also as a plain barcode-like string, e.g. `"4690624133190"`, or a long composite string like `"199374719.0-1005005829495867-12000034500254380"`

### Seller / Supplier

- `businessId` — seller ID — `"64713536"` (string)
- `shopId` — shop ID — `64713542` (number — differs from businessId in type!)
- `supplierId` — supplier ID — `64713542`
- `supplierType` — supplier type (code) — `0` / `3` (meaning of each code not yet confirmed)
- `shopPromoIds` — list of active shop promo IDs — array of strings

### Basic info

- `title` — product name — `"Сумка мешок Meddo"`
- `type` — object type — `"model"`
- `snippet_type` — another "type" field, but with a different value — `"product"`
- `snippetTheme` — snippet display type — `"GRID_FEED"`

### Pricing

- `price` — price — `10000` (differs from the product page!)
- `additionalPrices` — additional prices based on payment method — array `[{priceType: "yaBank", priceValue: 2817}, {priceType: "withDiscount", priceValue: 2874}]`. Can also be an empty array `[]` when no alternative prices apply
- `vat` — VAT indicator — `"NO_VAT"`. **Not always present** — missing entirely on some products (e.g. the Happy Baby nibbler)
- `featureBadges` — badges shown on the card (discounts, originality, etc.) — array, can hold multiple badges at once, e.g. `[{badgeTitle: "Оригинал", badgeType: "Original"}, {badgeTitle: "Скидка 19%", badgeType: "SIMPLEDiscountTokenType"}]`
- `loyaltyPrices` / `promo_attributes` — empty arrays in every example seen so far, purpose unclear

### Flags

- `isCrossBorder` — "shipped from abroad" flag — `"false"` / `"true"` (string, not a real boolean!)
- `isCpmBoost` / `isUltima` / `isExpress` / `isOnDemand` / `isAvailable` / `isReferral` — various boolean flags — `false`/`true`
- `sponsored` — whether this is a paid/sponsored placement in the results feed — `false`/`true` (confirmed `true` on an ad slot)
- `isComfortPlus` — "Comfort+" program flag — `true` (seen only on one product so far, field itself may be optional)

### Signals (badges/labels tied to logistics or shipping)

- `signals` — array of label objects shown on the snippet. Empty (`[]`) on most products, but on cross-border items contains an entry like `[{"type": "crossborder", "title": "Из-за рубежа"}]`. This is the actual source of the "shipped from abroad" label seen visually on the site — it is NOT a separate boolean field, it's an entry inside this array

### Delivery

- `availableDelivery` — empty array in every example seen so far, purpose unclear

### Analytics / not part of the domain model

These fields are internal tracking/analytics data, not product data — probably should NOT go into the shared types package:

- `feeShow` — long encrypted token — purpose unclear, looks like an internal field for analytics/payment
- `eventPayload` — analytics data (recommendation system, session ID, source like `"FASHION"`/`"RETARGETING"`, etc.) — not directly related to the product
- `resultsPageParams` — search page number, request ID — internal, not about the product
- `showUid` / `promoLogJoinId` / `pp` / `pos` — internal analytics/positioning fields in the results feed