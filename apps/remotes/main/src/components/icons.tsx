type IconProps = { size?: number; className?: string };

export function HeartIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      className={className} aria-hidden="true">
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"
        fill="currentColor" />
    </svg>
  );
}

export function CartIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 6h16l-1.5 12h-13L4 6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}