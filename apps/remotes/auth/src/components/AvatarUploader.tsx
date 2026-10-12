import { useRef } from 'react';
import { useUserStore } from '@marketplace/shared-state';
import { CameraIcon } from './icons';
import styles from './AvatarUploader.module.css';

const MAX_DIM = 240;

async function resizeToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Not an image'));
      img.onload = () => {
        const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas not supported'));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function AvatarUploader() {
  const avatar = useUserStore((s) => s.avatar);
  const setAvatar = useUserStore((s) => s.setAvatar);
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = () => inputRef.current?.click();

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const dataUrl = await resizeToDataUrl(file);
      setAvatar(dataUrl);
    } catch {
      alert('Could not load the image');
    }
  };

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.avatar}
        onClick={pick}
        aria-label="Change avatar"
      >
        {avatar ? (
          <img src={avatar} alt="" className={styles.image} />
        ) : (
          <span className={styles.placeholder}>
            <CameraIcon size={24} />
          </span>
        )}
        <span className={styles.overlay}>
          <CameraIcon size={20} />
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.input}
        onChange={onFile}
      />
      {avatar && (
        <button type="button" className={styles.remove} onClick={() => setAvatar(null)}>
          Remove
        </button>
      )}
    </div>
  );
}