export default function GearMark({ className }: { className?: string }) {
  const teeth = Array.from({ length: 10 }, (_, i) => i * 36);

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="4">
        <circle cx="50" cy="50" r="26" />
        <circle cx="50" cy="50" r="11" />
        {teeth.map((angle) => (
          <line
            key={angle}
            x1="50"
            y1="20"
            x2="50"
            y2="9"
            transform={`rotate(${angle} 50 50)`}
            strokeLinecap="round"
          />
        ))}
      </g>
    </svg>
  );
}
