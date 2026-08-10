export default function GearMark({ className }: { className?: string }) {
  const teeth = Array.from({ length: 8 }, (_, i) => i * 45);

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="7">
        {teeth.map((angle) => (
          <line
            key={angle}
            x1="50"
            y1="26"
            x2="50"
            y2="12"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="9">
        <circle cx="50" cy="50" r="25" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="6">
        <circle cx="50" cy="50" r="9" />
      </g>
    </svg>
  );
}
