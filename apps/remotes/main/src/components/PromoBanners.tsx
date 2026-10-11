import { useEffect, useRef } from 'react';
import { BANNERS, type Banner } from '../data/mock';
import styles from './PromoBanners.module.css';

const COPIES = 3;

function BannerTile({ banner }: { banner: Banner }) {
  return (
    <a
      href={`#${banner.id}`}
      className={styles.tile}
      style={{
        background: banner.image
          ? `url(${banner.image}) center/cover no-repeat, ${banner.background}`
          : banner.background,
      }}
    >
      <div className={styles.content}>
        {banner.subtitle && (
          <p className={styles.subtitle}>{banner.subtitle}</p>
        )}
      </div>
      <span className={styles.ad}>РЕКЛАМА</span>
    </a>
  );
}

export function PromoBanners() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyWidthRef = useRef(0);

  const total = BANNERS.length;
  const slides = Array.from({ length: COPIES }).flatMap(() => BANNERS);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const measure = () => {
      const first = slideRefs.current[0];
      const firstOfNextCopy = slideRefs.current[total];
      if (!first || !firstOfNextCopy) return;
      copyWidthRef.current = firstOfNextCopy.offsetLeft - first.offsetLeft;
    };

    const updateFocus = () => {
      const sRect = scroller.getBoundingClientRect();
      const scrollerCenter = sRect.left + sRect.width / 2;
      slideRefs.current.forEach((slide) => {
        if (!slide) return;
        const rect = slide.getBoundingClientRect();
        const slideCenter = rect.left + rect.width / 2;
        const distance = Math.abs(slideCenter - scrollerCenter);
        const maxDistance = rect.width * 1.4;
        const proximity = Math.max(0, 1 - distance / maxDistance);
        slide.style.setProperty('--focus', proximity.toFixed(3));
      });
    };

    const wrapIfNeeded = () => {
      const cw = copyWidthRef.current;
      if (!cw) return;
      if (scroller.scrollLeft < cw * 0.5) {
        scroller.scrollLeft += cw;
      } else if (scroller.scrollLeft >= cw * 2.5) {
        scroller.scrollLeft -= cw;
      }
    };

    measure();
    const ro = new ResizeObserver(() => {
      measure();
      requestAnimationFrame(() => {
        const cw = copyWidthRef.current;
        if (cw > 0) scroller.scrollLeft = cw + (scroller.scrollLeft % cw);
        updateFocus();
      });
    });
    ro.observe(scroller);

    requestAnimationFrame(() => {
      const cw = copyWidthRef.current;
      if (cw > 0) scroller.scrollLeft = cw;
      updateFocus();
    });

    scroller.addEventListener('scroll', updateFocus, { passive: true });

    const onScrollEnd = () => wrapIfNeeded();
    scroller.addEventListener('scrollend', onScrollEnd);

    let fallbackTimer: number | undefined;
    const onScrollFallback = () => {
      window.clearTimeout(fallbackTimer);
      fallbackTimer = window.setTimeout(wrapIfNeeded, 120);
    };
    if (!('onscrollend' in window)) {
      scroller.addEventListener('scroll', onScrollFallback, { passive: true });
    }

    return () => {
      scroller.removeEventListener('scroll', updateFocus);
      scroller.removeEventListener('scrollend', onScrollEnd);
      scroller.removeEventListener('scroll', onScrollFallback);
      window.clearTimeout(fallbackTimer);
      ro.disconnect();
    };
  }, [total]);

  return (
    <section className={styles.carousel}>
      <div className={styles.scroller} ref={scrollerRef}>
        {slides.map((banner, i) => (
          <div
            key={`${banner.id}-${i}`}
            className={styles.slide}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
          >
            <BannerTile banner={banner} />
          </div>
        ))}
      </div>
    </section>
  );
}