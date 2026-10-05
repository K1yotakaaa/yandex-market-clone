import { PARTNERS } from '../data/content';
import { PartnerLogo } from './PartnerLogo';
import { Section } from './Section';
import styles from './Partners.module.css';

export function Partners() {
  return (
    <Section
      id="partners"
      eyebrow="Партнёры"
      title="С нами работают"
      lead="Бренды, производители и сервисы, которые растут вместе с Маркетом."
    >
      <ul className={styles.grid}>
        {PARTNERS.map((name, index) => (
          <li key={name} className={styles.tile}>
            <PartnerLogo name={name} variant={index} className={styles.logo} />
          </li>
        ))}
      </ul>
    </Section>
  );
}