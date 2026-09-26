type IconProps = {
  size?: number;
  className?: string;
};

const base = {
  fill: 'none',
  viewBox: '0 0 24 24',
  'aria-hidden': true,
} as const;

export function StoreIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M4 9l1.2-4.2A1 1 0 0 1 6.2 4h11.6a1 1 0 0 1 1 .8L20 9"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M4 9h16v1.5a3 3 0 0 1-5.33 1.9 3 3 0 0 1-5.34 0A3 3 0 0 1 4 10.5V9z"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M5.5 13v6.5h13V13M10 19.5v-4h4v4" stroke="currentColor"
        strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function TruckIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" stroke="currentColor"
        strokeWidth="2" strokeLinejoin="round" />
      <circle cx="7" cy="17.5" r="2" fill="currentColor" />
      <circle cx="17.5" cy="17.5" r="2" fill="currentColor" />
    </svg>
  );
}

export function ChartIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M4 20V4M4 20h16" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" />
      <path d="M8 15l3.5-4 3 2.5L20 7" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SparklesIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"
        fill="currentColor" />
      <path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14z"
        fill="currentColor" />
    </svg>
  );
}

export function PackageIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M4 8l8-4 8 4v8l-8 4-8-4V8z" stroke="currentColor"
        strokeWidth="2" strokeLinejoin="round" />
      <path d="M4 8l8 4 8-4M12 12v8" stroke="currentColor" strokeWidth="2"
        strokeLinejoin="round" />
    </svg>
  );
}

export function HeartIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"
        fill="currentColor" />
    </svg>
  );
}

export function CartIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M4 6h16l-1.5 12h-13L4 6z" stroke="currentColor" strokeWidth="2"
        strokeLinejoin="round" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" />
    </svg>
  );
}

export function MailIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor"
        strokeWidth="2" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2"
        strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M6.6 3.5l2.6.4 1.2 4-2 1.6a12 12 0 0 0 6.1 6.1l1.6-2 4 1.2.4 2.6a2 2 0 0 1-2 2.1A16.5 16.5 0 0 1 4.5 5.5a2 2 0 0 1 2.1-2z"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function PinIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.3" fill="currentColor" />
    </svg>
  );
}

export function ClockIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SendIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M21 4L3 11l6 2.5M21 4l-3.5 16-8.5-6.5M21 4L9 13.5V19l3-3"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function CodeIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChatIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M4 5h16v11H9l-5 4V5z" stroke="currentColor" strokeWidth="2"
        strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowDownIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...base}>
      <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}