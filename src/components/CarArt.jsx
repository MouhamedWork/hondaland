/**
 * Transparent inline-SVG artwork (car & spare parts) used as decorative
 * backgrounds. Everything inherits `currentColor`, so parents control the
 * tone with text color and opacity utilities — no image assets required.
 */

export function CarSilhouette({ className = '', filled = false }) {
  return (
    <svg
      viewBox="0 0 640 210"
      className={className}
      aria-hidden="true"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* body */}
      <path
        d="M16 142c28-4 50-10 76-22 40-19 84-42 138-46 58-4 102 8 138 28 30 17 72 25 114 29 28 3 48 6 48 15v14c0 6-5 11-13 11h-40a46 46 0 0 0-91-3 46 46 0 0 0-91 3H218a46 46 0 0 0-91-3 46 46 0 0 0-91 3H29c-8 0-13-5-13-11z"
        fillOpacity={filled ? 0.08 : 0}
      />
      {/* windows */}
      <path
        d="M226 92c26-12 56-18 88-18 30 0 56 6 78 17l-14 8c-38-8-92-9-152-7z"
        fill={filled ? 'currentColor' : 'none'}
        fillOpacity={filled ? 0.12 : 0}
      />
      {/* wheels */}
      <circle cx="127" cy="160" r="24" />
      <circle cx="127" cy="160" r="9" />
      <circle cx="477" cy="160" r="24" />
      <circle cx="477" cy="160" r="9" />
      {/* ground line */}
      <path d="M40 196h560" strokeDasharray="14 12" strokeWidth="2" opacity="0.5" />
    </svg>
  )
}

export function GearArt({ className = '' }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      {/* dashed outer ring fakes the cog teeth */}
      <circle cx="60" cy="60" r="34" strokeWidth="14" strokeDasharray="9 7" opacity="0.9" />
      <circle cx="60" cy="60" r="22" />
      <circle cx="60" cy="60" r="8" />
    </svg>
  )
}

export function PistonArt({ className = '' }) {
  return (
    <svg
      viewBox="0 0 120 200"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="30" y="14" width="60" height="52" rx="8" />
      <path d="M30 32h60M30 46h60" opacity="0.6" />
      <circle cx="60" cy="80" r="10" />
      <path d="M60 90v28c0 10 8 14 8 26v34" />
      <circle cx="68" cy="184" r="10" />
    </svg>
  )
}

export function SparkPlugArt({ className = '' }) {
  return (
    <svg
      viewBox="0 0 120 200"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M46 18h28v18H46zM42 36h36v16H42z" />
      <path d="M52 52h16v52H52z" />
      <path d="M44 104h32l-6 18H50z" />
      <path d="M56 122v34" />
      <path d="M48 156c0 10 24 10 24 0" opacity="0.8" />
      <path d="M60 172v14" strokeDasharray="4 5" />
    </svg>
  )
}