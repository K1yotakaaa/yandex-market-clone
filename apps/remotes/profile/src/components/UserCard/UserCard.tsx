import { useRef, type ChangeEvent } from 'react';
import type { ProfileStat, UserProfile } from '../../types';
import { cx } from '../../utils/cx';
import { IconCamera, IconMail, IconPhone } from '../ui/icons';
import styles from './UserCard.module.css';

interface UserCardProps {
  profile: UserProfile;
  avatarUrl: string | null;
  stats: ProfileStat[];
  onAvatarChange: (file: File | null) => void;
}

function getInitials({ firstName, lastName }: UserProfile): string {
  return `${firstName.trim().charAt(0)}${lastName.trim().charAt(0)}`.toUpperCase() || '?';
}

export function UserCard({ profile, avatarUrl, stats, onAvatarChange }: UserCardProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const fullName = `${profile.firstName} ${profile.lastName}`.trim();

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onAvatarChange(file);
    event.target.value = '';
  };

  return (
    <section className={styles.card} aria-label="Информация о пользователе">
      <div className={styles.identity}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>
            {avatarUrl ? (
              <img className={styles.avatarImage} src={avatarUrl} alt={fullName} />
            ) : (
              <span aria-hidden="true">{getInitials(profile)}</span>
            )}
          </div>
          <button
            type="button"
            className={styles.avatarButton}
            onClick={() => fileRef.current?.click()}
            aria-label="Изменить фото профиля"
            title="Изменить фото"
          >
            <IconCamera size={18} />
          </button>
          <input
            ref={fileRef}
            className={styles.fileInput}
            type="file"
            accept="image/*"
            tabIndex={-1}
            aria-hidden="true"
            onChange={handleFile}
          />
        </div>

        <div className={styles.info}>
          <h2 className={styles.name}>{fullName}</h2>
          <p className={styles.since}>С нами с {profile.memberSince}</p>
          {avatarUrl && (
            <button type="button" className={styles.linkButton} onClick={() => onAvatarChange(null)}>
              Удалить фото
            </button>
          )}
        </div>
      </div>

      <ul className={styles.contacts}>
        <li className={styles.contact}>
          <IconMail size={18} className={styles.contactIcon} />
          <span className={styles.contactText}>{profile.email}</span>
        </li>
        <li className={styles.contact}>
          <IconPhone size={18} className={styles.contactIcon} />
          <span className={cx(styles.contactText, !profile.phone && styles.contactEmpty)}>
            {profile.phone || 'Телефон не указан'}
          </span>
        </li>
      </ul>

      <dl className={styles.stats}>
        {stats.map((stat) => (
          <div key={stat.id} className={styles.stat}>
            <dt className={styles.statLabel}>{stat.label}</dt>
            <dd className={styles.statValue}>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
