declare module 'header/Header' {
  import type { ComponentType } from 'react';
  const Header: ComponentType;
  export default Header;
}

declare module 'main/MainPage' {
  import type { ComponentType } from 'react';
  const MainPage: ComponentType;
  export default MainPage;
}

declare module 'search/SearchPage' {
  import type { ComponentType } from 'react';
  const SearchPage: ComponentType<{ initialQuery: string }>;
  export default SearchPage;
}

declare module 'product/ProductPage' {
  import type { ComponentType } from 'react';
  const ProductPage: ComponentType<{ oskuId: string }>;
  export default ProductPage;
}

declare module 'auth/AuthPage' {
  import type { ComponentType } from 'react';
  const AuthPage: ComponentType;
  export default AuthPage;
}

declare module 'cart/CartPage' {
  import type { ComponentType } from 'react';
  const CartPage: ComponentType;
  export default CartPage;
}

declare module 'cart/FavoritesPage' {
  import type { ComponentType } from 'react';
  const FavoritesPage: ComponentType;
  export default FavoritesPage;
}

declare module 'profile/ProfileApp' {
  import type { ComponentType } from 'react';
  const ProfileApp: ComponentType;
  export default ProfileApp;
}

declare module 'about/AboutPage' {
  import type { ComponentType } from 'react';
  const AboutPage: ComponentType;
  export default AboutPage;
}