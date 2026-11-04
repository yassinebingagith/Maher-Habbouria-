import React from 'react';

interface ChampionTrophiesArtworkProps {
  /**
   * 0 = clustered at the anatomical nodes of the Stage 03 Superbike (wheels, crank, cockpit, frame)
   * 1 = fully formed Championship Podium display of 3 Gold Cups + 10 Gold Medals cascading toward Maher's section
   */
  morphProgress: number;
  label10Medals: string;
  label3Cups: string;
}

interface MedalSpec {
  id: number;
  year: string;
  style: 'cog' | 'laurel' | 'octagon' | 'star';
  /** Starting position (on the bike silhouette, in % offset from center) */
  startX: number;
  startY: number;
  /** Target position (in the 10-medal championship arc, in px offset from center) */
  endX: number;
  endY: number;
  rotateDeg: number;
}

interface CupSpec {
  id: number;
  title: string;
  variant: 'winged' | 'chalice' | 'imperial';
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  scale: number;
}

const THREE_CUPS: CupSpec[] = [
  {
    id: 1,
    title: 'ARAB CHAMP I',
    variant: 'winged',
    startX: -95,
    startY: 28,
    endX: -125,
    endY: -42,
    scale: 0.92,
  },
  {
    id: 2,
    title: '3× ARAB CHAMPION',
    variant: 'imperial',
    startX: 0,
    startY: -22,
    endX: 0,
    endY: -66,
    scale: 1.12,
  },
  {
    id: 3,
    title: 'ARAB CHAMP III',
    variant: 'chalice',
    startX: 95,
    startY: 28,
    endX: 125,
    endY: -42,
    scale: 0.92,
  },
];

const TEN_MEDALS: MedalSpec[] = [
  // Top inner row of 5 Gold Medals
  {
    id: 1,
    year: 'I',
    style: 'laurel',
    startX: -130,
    startY: 45,
    endX: -180,
    endY: 48,
    rotateDeg: -12,
  },
  {
    id: 2,
    year: 'II',
    style: 'cog',
    startX: -85,
    startY: 15,
    endX: -90,
    endY: 58,
    rotateDeg: -6,
  },
  {
    id: 3,
    year: 'III',
    style: 'star',
    startX: -20,
    startY: 50,
    endX: 0,
    endY: 64,
    rotateDeg: 0,
  },
  {
    id: 4,
    year: 'IV',
    style: 'octagon',
    startX: 55,
    startY: -25,
    endX: 90,
    endY: 58,
    rotateDeg: 6,
  },
  {
    id: 5,
    year: 'V',
    style: 'laurel',
    startX: 130,
    startY: 45,
    endX: 180,
    endY: 48,
    rotateDeg: 12,
  },
  // Bottom cascading row of 5 Gold Medals leading directly into Maher's Champion section
  {
    id: 6,
    year: 'VI',
    style: 'octagon',
    startX: -115,
    startY: 60,
    endX: -155,
    endY: 132,
    rotateDeg: -9,
  },
  {
    id: 7,
    year: 'VII',
    style: 'star',
    startX: -45,
    startY: -35,
    endX: -78,
    endY: 142,
    rotateDeg: -4,
  },
  {
    id: 8,
    year: '10×',
    style: 'cog',
    startX: 0,
    startY: 55,
    endX: 0,
    endY: 148,
    rotateDeg: 0,
  },
  {
    id: 9,
    year: 'IX',
    style: 'laurel',
    startX: 65,
    startY: 20,
    endX: 78,
    endY: 142,
    rotateDeg: 4,
  },
  {
    id: 10,
    year: 'X',
    style: 'star',
    startX: 115,
    startY: 60,
    endX: 155,
    endY: 132,
    rotateDeg: 9,
  },
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export const ChampionTrophiesArtwork: React.FC<ChampionTrophiesArtworkProps> = ({
  morphProgress,
  label10Medals,
  label3Cups,
}) => {
  const t = Math.max(0, Math.min(1, morphProgress));

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none select-none">
      {/* Golden Championship Aura behind the Cups & Medals */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[440px] sm:h-[440px] rounded-full blur-3xl"
        style={{
          opacity: t * 0.85,
          background:
            'radial-gradient(circle, rgba(245,158,11,0.34) 0%, rgba(0,168,232,0.16) 48%, rgba(10,17,32,0) 72%)',
        }}
      />

      {/* Top Championship Badge Pill: 3 GOLDEN CUPS */}
      <div
        className="relative z-30 mb-2 px-3 py-1 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/50 text-[#FDE68A] font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-lg"
        style={{
          opacity: Math.max(0, (t - 0.25) / 0.75),
          transform: `translate3d(0, ${Math.round((1 - t) * 24)}px, 0)`,
        }}
      >
        🏆 {label3Cups}
      </div>

      {/* Main SVG Stage containing the 3 Gold Cups + 10 Gold Medals */}
      <div className="relative w-[330px] h-[250px] sm:w-[480px] sm:h-[340px] flex items-center justify-center">
        <svg
          viewBox="-240 -150 480 350"
          className="w-full h-full overflow-visible drop-shadow-[0_14px_28px_rgba(245,158,11,0.28)]"
          role="img"
          aria-label="3 Coupes d'Or Champion Arabe et 10 Médailles d'Or Champion de Tunisie"
        >
          <defs>
            {/* Rich 24K Gold Metallic Linear Gradients */}
            <linearGradient id="gold-cup-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="28%" stopColor="#F59E0B" />
              <stop offset="55%" stopColor="#FDE047" />
              <stop offset="82%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <linearGradient id="gold-rim-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="45%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>

            <linearGradient id="ribbon-park-blue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00A8E8" />
              <stop offset="100%" stopColor="#00559E" />
            </linearGradient>

            <radialGradient id="medal-face-grad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FEF9C3" />
              <stop offset="40%" stopColor="#FBBF24" />
              <stop offset="85%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </radialGradient>
          </defs>

          {/* Subtle Golden Energy Lines connecting Bike Nodes -> Cups & Medals */}
          {TEN_MEDALS.map((m) => {
            const x = lerp(m.startX, m.endX, t);
            const y = lerp(m.startY, m.endY, t);
            return (
              <line
                key={`ray-${m.id}`}
                x1={0}
                y1={-20}
                x2={x}
                y2={y}
                stroke="#FBBF24"
                strokeWidth="1"
                strokeDasharray="3 4"
                opacity={t * 0.28}
              />
            );
          })}

          {/* ===============================================================
              3 GOLD CHAMPIONSHIP CUPS (3× ARAB CHAMPION)
              Each with a distinct trophy architecture (Winged, Imperial, Chalice)
             =============================================================== */}
          {THREE_CUPS.map((cup) => {
            const cx = lerp(cup.startX, cup.endX, t);
            const cy = lerp(cup.startY, cup.endY, t);
            const s = lerp(0.32, cup.scale, t);

            return (
              <g
                key={`cup-${cup.id}`}
                transform={`translate(${cx.toFixed(1)}, ${cy.toFixed(1)}) scale(${s.toFixed(3)})`}
              >
                {/* Trophy Pedestal Base */}
                <path
                  d="M-26,48 L26,48 L32,60 L-32,60 Z"
                  fill="#1E293B"
                  stroke="url(#gold-rim-grad)"
                  strokeWidth="2"
                />
                <rect
                  x="-18"
                  y="51"
                  width="36"
                  height="6"
                  rx="2"
                  fill="url(#gold-cup-grad)"
                />
                {/* Stem */}
                <path
                  d="M-7,18 L7,18 L14,48 L-14,48 Z"
                  fill="url(#gold-cup-grad)"
                />
                <ellipse
                  cx="0"
                  cy="30"
                  rx="11"
                  ry="4.5"
                  fill="url(#gold-rim-grad)"
                />

                {/* Distinct Handles per Cup Style */}
                {cup.variant === 'winged' && (
                  <>
                    <path
                      d="M-28,-30 C-52,-36 -50,2 -20,12"
                      fill="none"
                      stroke="url(#gold-rim-grad)"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M28,-30 C52,-36 50,2 20,12"
                      fill="none"
                      stroke="url(#gold-rim-grad)"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </>
                )}

                {cup.variant === 'imperial' && (
                  <>
                    <path
                      d="M-32,-36 C-58,-44 -56,8 -22,14"
                      fill="none"
                      stroke="url(#gold-rim-grad)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M32,-36 C58,-44 56,8 22,14"
                      fill="none"
                      stroke="url(#gold-rim-grad)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    {/* Crowned Lid on Center Cup */}
                    <path
                      d="M-28,-42 L0,-62 L28,-42 Z"
                      fill="url(#gold-cup-grad)"
                      stroke="#FEF08A"
                      strokeWidth="1.5"
                    />
                    <circle cx="0" cy="-65" r="5" fill="#FEF08A" />
                  </>
                )}

                {cup.variant === 'chalice' && (
                  <>
                    <path
                      d="M-26,-24 C-44,-18 -44,8 -18,12"
                      fill="none"
                      stroke="url(#gold-rim-grad)"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M26,-24 C44,-18 44,8 18,12"
                      fill="none"
                      stroke="url(#gold-rim-grad)"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                    />
                  </>
                )}

                {/* Cup Bowl */}
                <path
                  d={
                    cup.variant === 'imperial'
                      ? 'M-34,-42 L34,-42 C32,-2 22,18 0,20 C-22,18 -32,-2 -34,-42 Z'
                      : 'M-29,-36 L29,-36 C27,-2 18,16 0,18 C-18,16 -27,-2 -29,-36 Z'
                  }
                  fill="url(#gold-cup-grad)"
                  stroke="#FEF08A"
                  strokeWidth="1.5"
                />

                {/* Specular Shine Highlight */}
                <path
                  d="M-18,-32 L-10,-32 C-9,-6 -6,8 -2,12 C-10,10 -16,-4 -18,-32 Z"
                  fill="#FFFBEB"
                  opacity="0.55"
                />

                {/* Center Emblem Star */}
                <polygon
                  points="0,-24 3.5,-16 12,-16 5,-10 7.5,-2 0,-7 -7.5,-2 -5,-10 -12,-16 -3.5,-16"
                  fill="#FFFBEB"
                />
              </g>
            );
          })}

          {/* ===============================================================
              10 GOLD NATIONAL CHAMPIONSHIP MEDALS (10× TUNISIAN CHAMPION)
              4 Distinct Gold Styles (Laurel, Cycling Cog, Octagon, Starburst)
             =============================================================== */}
          {TEN_MEDALS.map((medal) => {
            const mx = lerp(medal.startX, medal.endX, t);
            const my = lerp(medal.startY, medal.endY, t);
            const rot = lerp((medal.id - 5) * 35, medal.rotateDeg, t);
            const scale = lerp(0.4, medal.id === 8 ? 1.12 : 0.96, t);

            return (
              <g
                key={`medal-${medal.id}`}
                transform={`translate(${mx.toFixed(1)}, ${my.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${scale.toFixed(3)})`}
              >
                {/* V-Shaped Championship Neck Ribbon */}
                <path
                  d="M-12,-34 L-4,-34 L0,-16 L-7,-16 Z"
                  fill="url(#ribbon-park-blue)"
                />
                <path
                  d="M12,-34 L4,-34 L0,-16 L7,-16 Z"
                  fill="#0073CF"
                />
                {/* Gold Ribbon Clasp */}
                <rect
                  x="-7"
                  y="-20"
                  width="14"
                  height="4"
                  rx="1.5"
                  fill="url(#gold-rim-grad)"
                />

                {/* Distinct Outer Gold Rim by Style */}
                {medal.style === 'octagon' ? (
                  <polygon
                    points="-10,-22 10,-22 22,-10 22,10 10,22 -10,22 -22,10 -22,-10"
                    fill="url(#medal-face-grad)"
                    stroke="#FEF08A"
                    strokeWidth="2"
                  />
                ) : medal.style === 'cog' ? (
                  <>
                    <circle
                      cx="0"
                      cy="0"
                      r="23"
                      fill="none"
                      stroke="url(#gold-rim-grad)"
                      strokeWidth="3.5"
                      strokeDasharray="5 3"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="20.5"
                      fill="url(#medal-face-grad)"
                      stroke="#FEF9C3"
                      strokeWidth="1.5"
                    />
                  </>
                ) : (
                  <circle
                    cx="0"
                    cy="0"
                    r="21.5"
                    fill="url(#medal-face-grad)"
                    stroke="#FEF08A"
                    strokeWidth="2"
                  />
                )}

                {/* Inner Engraved Ring */}
                <circle
                  cx="0"
                  cy="0"
                  r="15.5"
                  fill="none"
                  stroke="#92400E"
                  strokeWidth="1"
                  strokeDasharray={medal.style === 'laurel' ? '3 2' : undefined}
                />

                {/* Specular Diagonal Sheen */}
                <path
                  d="M-12,-14 L-4,-14 L12,14 L4,14 Z"
                  fill="#FFFBEB"
                  opacity="0.38"
                />

                {/* Medal Numeral / 10× Engraving */}
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill="#451A03"
                  fontSize={medal.id === 8 ? '10.5' : '9.5'}
                  fontWeight="900"
                  fontFamily="monospace"
                >
                  {medal.year}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Championship Badge Pill: 10 GOLD MEDALS */}
      <div
        className="relative z-30 mt-1 px-3.5 py-1 rounded-full bg-[#0A1120]/90 border border-[#F59E0B]/50 text-white font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-xl flex items-center gap-2"
        style={{
          opacity: Math.max(0, (t - 0.3) / 0.7),
          transform: `translate3d(0, ${Math.round((1 - t) * -18)}px, 0)`,
        }}
      >
        <span className="text-[#FBBF24]">🥇 {label10Medals}</span>
        <span className="text-[#00A8E8]">↓</span>
      </div>
    </div>
  );
};
