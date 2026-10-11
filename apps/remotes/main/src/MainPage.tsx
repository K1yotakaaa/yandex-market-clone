import { CategoryStrip } from './components/CategoryStrip';
import { PromoBanners } from './components/PromoBanners';
import { ProductGrid } from './components/ProductGrid';
import styles from './MainPage.module.css';

export default function MainPage() {
  return (
    <div className={styles.page}>
      <CategoryStrip />
      <PromoBanners />
      <ProductGrid />
    </div>
  );
}