/* Soft light-ribbon background: a few wide, heavily blurred curves in the
   logo's cyan -> blue -> violet -> magenta, each with a faint grey shadow
   band and a white highlight so it reads as light passing through glass.
   Pure inline SVG (no image request); a slow drift is CSS-only and switched
   off under prefers-reduced-motion. Decorative, hidden from assistive tech. */

type Ribbon = {
  d: string;
  gradient: string;
  width: number;
  blur: number;
  opacity: number;
  shadowOpacity: number;
};

const ribbons: Ribbon[] = [
  // top-centre sweeping down to the lower left (the main S curve)
  {
    d: "M860 -60 C 780 160, 640 300, 470 430 S 150 700, -80 960",
    gradient: "comet-a",
    width: 90,
    blur: 34,
    opacity: 0.55,
    shadowOpacity: 0.2,
  },
  // long band from the left edge rising across to the upper right
  {
    d: "M-120 560 C 260 470, 560 450, 860 380 S 1300 170, 1560 60",
    gradient: "comet-b",
    width: 80,
    blur: 36,
    opacity: 0.45,
    shadowOpacity: 0.18,
  },
  // lower band from the left to the right, flatter
  {
    d: "M-100 700 C 300 640, 620 600, 900 520 S 1320 420, 1560 400",
    gradient: "comet-c",
    width: 60,
    blur: 30,
    opacity: 0.32,
    shadowOpacity: 0.12,
  },
  // right side sweep from the top edge down towards the bottom centre
  {
    d: "M1520 120 C 1320 260, 1180 420, 1080 600 S 900 880, 820 1000",
    gradient: "comet-d",
    width: 80,
    blur: 40,
    opacity: 0.38,
    shadowOpacity: 0.16,
  },
];

export function HeroWaves() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="hero-waves absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="comet-a" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#e93cf5" />
            <stop offset="0.35" stopColor="#8b3dff" />
            <stop offset="0.65" stopColor="#2f5bff" />
            <stop offset="1" stopColor="#00d5ff" />
          </linearGradient>
          <linearGradient id="comet-b" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#00d5ff" />
            <stop offset="0.4" stopColor="#3aa0ff" />
            <stop offset="0.75" stopColor="#8b3dff" />
            <stop offset="1" stopColor="#e93cf5" />
          </linearGradient>
          <linearGradient id="comet-c" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8b3dff" />
            <stop offset="0.5" stopColor="#2f5bff" />
            <stop offset="1" stopColor="#00d5ff" />
          </linearGradient>
          <linearGradient id="comet-d" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#00d5ff" />
            <stop offset="0.5" stopColor="#8b3dff" />
            <stop offset="1" stopColor="#e93cf5" />
          </linearGradient>
          {ribbons.map((r, i) => (
            <filter key={i} id={`blur-${i}`} filterUnits="userSpaceOnUse" x="-600" y="-600" width="2640" height="2100">
              <feGaussianBlur stdDeviation={r.blur} />
            </filter>
          ))}
          <filter id="blur-shadow" filterUnits="userSpaceOnUse" x="-600" y="-600" width="2640" height="2100">
            <feGaussianBlur stdDeviation="60" />
          </filter>
          <filter id="blur-glint" filterUnits="userSpaceOnUse" x="-600" y="-600" width="2640" height="2100">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          {/* fine film grain, like the reference */}
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>

        {/* grey shadow bands give the ribbons depth on the light page */}
        {ribbons.map((r, i) => (
          <path
            key={`s${i}`}
            d={r.d}
            fill="none"
            stroke="#8a90a8"
            strokeWidth={r.width * 2.6}
            strokeLinecap="round"
            opacity={r.shadowOpacity}
            filter="url(#blur-shadow)"
          />
        ))}
        {/* coloured light */}
        {ribbons.map((r, i) => (
          <path
            key={`c${i}`}
            d={r.d}
            fill="none"
            stroke={`url(#${r.gradient})`}
            strokeWidth={r.width}
            strokeLinecap="round"
            opacity={r.opacity}
            filter={`url(#blur-${i})`}
          />
        ))}
        {/* white glint along each ribbon */}
        {ribbons.map((r, i) => (
          <path
            key={`g${i}`}
            d={r.d}
            fill="none"
            stroke="#ffffff"
            strokeWidth={r.width * 0.16}
            strokeLinecap="round"
            opacity={0.55}
            filter="url(#blur-glint)"
          />
        ))}
        <rect width="1440" height="900" filter="url(#grain)" opacity="0.05" />
      </svg>
      {/* keep the copy area calm so the headline stays crisp */}
      <div className="absolute inset-0 bg-[radial-gradient(46%_40%_at_50%_50%,rgba(246,246,247,0.7),rgba(246,246,247,0)_72%)]" />
    </div>
  );
}
