type Props = {
  name: string;
  variant: number;
  className?: string;
};

const MARK = 'var(--partner-mark, currentColor)';

const MARKS = [
  <circle key="c" cx="14" cy="14" r="11" style={{ fill: MARK }} />,
  <rect key="r" x="4" y="4" width="20" height="20" rx="6" transform="rotate(45 14 14)" style={{ fill: MARK }} />,
  <path key="t" d="M14 3l11 20H3L14 3z" style={{ fill: MARK }} />,
  <g key="rings">
    <circle cx="10" cy="14" r="7" fill="none" strokeWidth="3" style={{ stroke: MARK }} />
    <circle cx="18" cy="14" r="7" fill="none" strokeWidth="3" style={{ stroke: MARK }} />
  </g>,
  <g key="bars">
    <rect x="3" y="12" width="5" height="12" rx="2" style={{ fill: MARK }} />
    <rect x="11.5" y="7" width="5" height="17" rx="2" style={{ fill: MARK }} />
    <rect x="20" y="3" width="5" height="21" rx="2" style={{ fill: MARK }} />
  </g>,
  <path key="half" d="M3 18a11 11 0 0 1 22 0v3H3v-3z" style={{ fill: MARK }} />,
  <path key="hex" d="M14 3l9.5 5.5v11L14 25l-9.5-5.5v-11L14 3z" style={{ fill: MARK }} />,
  <path key="wave" d="M3 16c3.5-6 7-6 11 0s7.5 6 11 0" fill="none" strokeWidth="4" strokeLinecap="round" style={{ stroke: MARK }} />,
];

export function PartnerLogo({ name, variant, className }: Props) {
  const width = 44 + name.length * 13;
  return (
    <svg
      viewBox={`0 0 ${width} 28`}
      height="28"
      className={className}
      role="img"
      aria-label={name}
    >
      {MARKS[variant % MARKS.length]}
      <text
        x="36"
        y="20"
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        fontSize="18"
        fontWeight="700"
        letterSpacing="-0.3"
        fill="currentColor"
      >
        {name}
      </text>
    </svg>
  );
}