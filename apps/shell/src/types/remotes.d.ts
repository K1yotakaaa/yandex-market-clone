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

declare module 'about/AboutPage' {
  import type { ComponentType } from 'react';
  const AboutPage: ComponentType;
  export default AboutPage;
}