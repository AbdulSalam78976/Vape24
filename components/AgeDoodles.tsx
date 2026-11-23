const ICONS = ["/icons8-hookah-64.png", "/icons8-smoke-pipe-60.png", "/icons8-vape-60.png"];

// Seeded PRNG: looks random, but server and client render the same layout (no hydration mismatch).
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COLS = 6;
const ROWS = 7;
const rand = mulberry32(24);
// One doodle per grid cell, jittered inside its cell, so they scatter evenly without clumping.
const DOODLES = Array.from({ length: COLS * ROWS }, (_, n) => ({
  icon: ICONS[Math.floor(rand() * ICONS.length)],
  left: ((n % COLS) + 0.15 + rand() * 0.7) * (100 / COLS),
  top: (Math.floor(n / COLS) + 0.15 + rand() * 0.7) * (100 / ROWS),
  size: 22 + Math.round(rand() * 18),
  rotate: Math.round(rand() * 70 - 35),
  delay: (rand() * 4).toFixed(2),
}));

/** Doodle background of the hookah / pipe / vape icons in /public, drawn black via CSS mask. */
export function AgeDoodles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {DOODLES.map((d, i) => (
        <span
          key={i}
          className="doodle absolute bg-ink opacity-30"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            rotate: `${d.rotate}deg`,
            animationDelay: `${d.delay}s`,
            mask: `url(${d.icon}) center / contain no-repeat`,
            WebkitMask: `url(${d.icon}) center / contain no-repeat`,
          }}
        />
      ))}
      {/* fade doodles out behind the text so it stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(255_255_255/0.85)_18%,rgb(255_255_255/0.35)_45%,transparent_70%)]" />
    </div>
  );
}
