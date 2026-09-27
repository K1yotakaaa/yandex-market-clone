import { NAV_ITEMS } from './data/content';
import { useActiveSection } from './hooks/useActiveSection';
import { AnchorNav } from './components/AnchorNav';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Directions } from './components/Directions';
import { Timeline } from './components/Timeline';
import styles from './AboutPage.module.css';

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export default function AboutPage() {
  const { active, scrollTo } = useActiveSection(SECTION_IDS);

  return (
    <div className={styles.page}>
      <AnchorNav items={NAV_ITEMS} active={active} onSelect={scrollTo} />
      <main className={styles.main}>
        <Hero onNavigate={scrollTo} />
        <Stats />
        <Directions />
        <Timeline />
      </main>
    </div>
  );
}