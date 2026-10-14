# @marketplace/profile

Remote страницы профиля. Порт **5007**, exposes `./ProfileApp`. Shell рендерит его на `#profile`, если пользователь вошёл.

```bash
npm run dev:profile   # из корня репо, только этот remote → http://localhost:5007
npm run dev           # всё вместе → http://localhost:5000/#profile
```

## Откуда данные

| Что | Источник |
| --- | --- |
| Имя пользователя, email, дата регистрации | `useAuthStore` (`@marketplace/shared-state`) |
| Аватар | `useUserStore.avatar` — общий с хедером, хранится как data URL (сжат до 240px) |
| Заказы, счётчики избранного и корзины | `useUserStore` |
| Выход | `logout()` + `clearUserData()`, затем переход на главную |
| Фамилия, телефон, правки формы | локальный state, сбрасывается при перезагрузке |
| Адреса доставки | `useAddresses` (in-memory, моки из `src/mocks`) |

В standalone-режиме (`localhost:5007`) в сторе никого нет, поэтому страница показывает мок-профиль и скрывает «Выйти».

## Что дальше

- В `authStore` нет полей имени/фамилии/телефона и экшена обновления профиля — когда появятся, заменить `profileFromUser` и `handleSaveProfile` в `ProfileApp.tsx`.
- Адреса: заменить reducer в `hooks/useAddresses.ts` на стор или API; сигнатура `add / update / remove / setDefault` останется.

## Структура

```
src/
  ProfileApp.tsx           # exposed root; токены темы — в ProfileApp.module.css (--pf-*)
  index.ts, main.tsx, bootstrap.tsx
  components/
    UserCard/  ProfileNav/  PersonalInfoForm/  OrdersSection/  AddressSection/
    ui/                    # Button, TextField, Modal (<dialog>), Toast, Card, icons
  hooks/                   # useForm, useAddresses
  utils/                   # phone mask, validation, format, image resize
  mocks/
```
