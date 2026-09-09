/**
 * Realistic certificate document rendered as inline SVG — used in the awards
 * gallery so each award looks like a scanned certificate image, not a UI card.
 * All text is passed as props so translations work for both languages.
 * `index` keeps SVG defs ids unique per instance.
 */
export function CertificateArt({
  title,
  issuer,
  year,
  serial,
  brand,
  tagline,
  index = 0,
}) {
  const titleSize = title.length > 26 ? 15 : title.length > 18 ? 17 : 20

  return (
    <svg viewBox="0 0 400 300" className="h-auto w-full" role="img" aria-label={title}>
      <defs>
        <linearGradient id={`cert-paper-${index}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffef8" />
          <stop offset="1" stopColor="#f6f0df" />
        </linearGradient>
        <filter id={`cert-shadow-${index}`} x="-12%" y="-12%" width="124%" height="134%">
          <feDropShadow dx="0" dy="7" stdDeviation="9" floodColor="#0f172a" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* paper sheet */}
      <rect
        x="8"
        y="8"
        width="384"
        height="284"
        rx="6"
        fill={`url(#cert-paper-${index})`}
        stroke="#e2d9c2"
        filter={`url(#cert-shadow-${index})`}
      />

      {/* ornate double border */}
      <rect x="20" y="20" width="360" height="260" fill="none" stroke="#e11d2a" strokeWidth="2.5" rx="3" />
      <rect x="27" y="27" width="346" height="246" fill="none" stroke="#c9b78a" strokeWidth="1" rx="2" />
      {[
        [27, 27],
        [373, 27],
        [27, 273],
        [373, 273],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" fill="#e11d2a" opacity="0.55" />
      ))}

      {/* brand header */}
      <text
        x="200"
        y="58"
        textAnchor="middle"
        fontSize="11"
        letterSpacing="3"
        fill="#8a8371"
        fontFamily="'Inter','Cairo',sans-serif"
      >
        {brand}
      </text>
      <line x1="150" y1="68" x2="250" y2="68" stroke="#e11d2a" strokeWidth="1.5" />
      <text
        x="200"
        y="86"
        textAnchor="middle"
        fontSize="9"
        fill="#a49b84"
        fontFamily="'Inter','Cairo',sans-serif"
      >
        {tagline}
      </text>

      {/* award title */}
      <text
        x="200"
        y="128"
        textAnchor="middle"
        fontSize={titleSize}
        fontWeight="700"
        fill="#1c1c1c"
        fontFamily="'Cairo','Inter',sans-serif"
      >
        {title}
      </text>

      {/* issuer */}
      <text
        x="200"
        y="156"
        textAnchor="middle"
        fontSize="11"
        fill="#6b6455"
        fontFamily="'Inter','Cairo',sans-serif"
      >
        {issuer}
      </text>

      {/* year chip */}
      <rect x="172" y="172" width="56" height="22" rx="11" fill="#e11d2a" />
      <text
        x="200"
        y="187"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="#ffffff"
        fontFamily="'Inter',sans-serif"
      >
        {year}
      </text>

      {/* divider */}
      <path d="M120 208h60m40 0h60" stroke="#c9b78a" strokeWidth="1" />
      <circle cx="200" cy="208" r="3" fill="#e11d2a" />

      {/* signature + serial */}
      <path
        d="M60 236c10-10 18 6 28-4s14 8 24-2"
        fill="none"
        stroke="#3b3a36"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <line x1="55" y1="244" x2="120" y2="244" stroke="#b8ad8f" strokeWidth="1" />
      <text
        x="87"
        y="258"
        textAnchor="middle"
        fontSize="8"
        fill="#8a8371"
        fontFamily="'Inter','Cairo',sans-serif"
      >
        {serial}
      </text>

      {/* wax seal with ribbon */}
      <g transform="translate(320 232) rotate(8)">
        <path d="M-8 14 L-15 36 L-5 29 L0 40 L5 29 L15 36 L8 14 Z" fill="#b91c2e" />
        <circle r="20" fill="#e11d2a" />
        <circle r="15" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="3 2.4" />
        <path
          d="M0 -8l2.4 4.9 5.4.8-3.9 3.8.9 5.4L0 4.3l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z"
          fill="#ffffff"
        />
      </g>
    </svg>
  )
}