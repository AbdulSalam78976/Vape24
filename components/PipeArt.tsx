/**
 * Smoking pipe drawn as an SVG line, then filled, lit, and smoking.
 * Timeline lives in globals.css (.pipe-*): draw 0–1.6s → fill 1.4s → ember 1.8s → smoke 2s+.
 */
export function PipeArt({ className = "h-48 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 230" className={className} aria-hidden>
      <defs>
        <linearGradient id="pipe-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3a3a" />
          <stop offset="1" stopColor="#0b0b0b" />
        </linearGradient>
        <radialGradient id="pipe-ember">
          <stop offset="0" stopColor="#fff3b0" />
          <stop offset=".45" stopColor="#ff7a00" />
          <stop offset="1" stopColor="#e10600" />
        </radialGradient>
        <filter id="pipe-blur"><feGaussianBlur stdDeviation="5" /></filter>
      </defs>

      {/* smoke: wavy lines that draw upward, plus soft puffs */}
      <g fill="none" stroke="#a1a1aa" strokeWidth="4" strokeLinecap="round">
        <path className="pipe-smoke-line" pathLength={1} d="M232 84 C214 64 250 50 232 30 S226 0 240 -10" />
        <path className="pipe-smoke-line" pathLength={1} d="M252 86 C268 66 236 54 254 34 S262 8 250 -6" style={{ animationDelay: "2.35s" }} />
      </g>
      <g filter="url(#pipe-blur)" fill="#d4d4d8">
        {[0, 1, 2].map((i) => (
          <circle key={i} className="pipe-puff" cx={236 + i * 8} cy="78" r="12" style={{ animationDelay: `${2.1 + i * 0.4}s` }} />
        ))}
      </g>

      {/* pipe outline → fill */}
      <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="4" stroke="#e10600">
        {/* stem */}
        <path className="pipe-draw" pathLength={1} fill="url(#pipe-wood)" d="M200 150 C160 162 118 160 84 150 L34 136 Q22 133 24 145 Q26 154 36 156 L86 170 C124 180 168 182 206 172 Z" />
        {/* bowl */}
        <path className="pipe-draw" pathLength={1} fill="url(#pipe-wood)" d="M194 88 H290 L282 172 Q278 204 242 204 Q206 204 202 172 Z" />
        {/* red band */}
        <path className="pipe-draw" pathLength={1} fill="#e10600" d="M196 112 H288 L286 128 H198 Z" style={{ animationDelay: ".4s" }} />
      </g>

      {/* glowing tobacco */}
      <ellipse className="pipe-ember" cx="242" cy="90" rx="44" ry="8" fill="url(#pipe-ember)" />
    </svg>
  );
}
