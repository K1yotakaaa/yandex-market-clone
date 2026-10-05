import type { ReactNode } from 'react';
import { CONTACTS, SOCIALS, TEAM, type Social } from '../data/content';
import {
  ChatIcon,
  ClockIcon,
  CodeIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  SendIcon,
} from './icons';
import { Section } from './Section';
import styles from './Contacts.module.css';

const SOCIAL_ICONS: Record<Social['id'], ReactNode> = {
  telegram: <SendIcon />,
  github: <CodeIcon />,
  vk: <ChatIcon />,
};

type RowProps = {
  icon: ReactNode;
  label: string;
  children: ReactNode;
};

function ContactRow({ icon, label, children }: RowProps) {
  return (
    <li className={styles.row}>
      <span className={styles.rowIcon}>{icon}</span>
      <span className={styles.rowBody}>
        <span className={styles.rowLabel}>{label}</span>
        <span className={styles.rowValue}>{children}</span>
      </span>
    </li>
  );
}

export function Contacts() {
  return (
    <Section
      id="contacts"
      eyebrow="Контакты"
      title="Связь"
      lead="Вопросы о проекте, идеи и предложения — пишите, ответим в течение рабочего дня."
    >
      <div className={styles.grid}>
        <div className={styles.main}>
          <ul className={styles.rows}>
            <ContactRow icon={<MailIcon />} label="Почта">
              <a className={styles.link} href={`mailto:${CONTACTS.email}`}>
                {CONTACTS.email}
              </a>
            </ContactRow>
            <ContactRow icon={<PhoneIcon />} label="Телефон">
              <a className={styles.link} href={`tel:${CONTACTS.phoneHref}`}>
                {CONTACTS.phone}
              </a>
            </ContactRow>
            <ContactRow icon={<PinIcon />} label="Адрес">
              {CONTACTS.address}
            </ContactRow>
            <ContactRow icon={<ClockIcon />} label="Часы работы">
              {CONTACTS.hours}
            </ContactRow>
          </ul>

          <div className={styles.socials}>
            {SOCIALS.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
              >
                {SOCIAL_ICONS[social.id]}
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.team}>
          <h3 className={styles.teamTitle}>Команда проекта</h3>
          <p className={styles.teamLead}>Кто работает над проектом</p>
          <ul className={styles.members}>
            {TEAM.map((member) => (
              <li key={member.name} className={styles.member}>
                <span className={styles.avatar} aria-hidden="true">
                  {member.initials}
                </span>
                <span className={styles.memberBody}>
                  <span className={styles.memberName}>{member.name}</span>
                  {member.role && (
                  <span className={styles.memberRole}>{member.role}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}