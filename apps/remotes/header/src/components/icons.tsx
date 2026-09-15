type IconProps = {
  size?: number;
  className?: string;
};

export function SearchIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      className={className} aria-hidden="true">
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" />
    </svg>
  );
}

export function HeartIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      className={className} aria-hidden="true">
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"
        fill="currentColor" />
    </svg>
  );
}

export function CartIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      className={className} aria-hidden="true">
      <path d="M4 6h16l-1.5 12h-13L4 6z" stroke="currentColor" strokeWidth="2"
        strokeLinejoin="round" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" />
    </svg>
  );
}

export function PackageIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      className={className} aria-hidden="true">
      <path d="M4 8l8-4 8 4v8l-8 4-8-4V8z" stroke="currentColor"
        strokeWidth="2" strokeLinejoin="round" />
      <path d="M4 8l8 4 8-4M12 12v8" stroke="currentColor" strokeWidth="2"
        strokeLinejoin="round" />
    </svg>
  );
}

export function SparklesIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      className={className} aria-hidden="true">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"
        fill="currentColor" />
      <path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14z"
        fill="currentColor" />
    </svg>
  );
}

export function CoinIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" />
      <path d="M9 9h6M9 12h6M9 15h6" stroke="#1a1a1a" strokeWidth="1.5"
        strokeLinecap="round" />
    </svg>
  );
}