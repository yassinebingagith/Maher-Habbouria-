import React from 'react';

/**
 * Extracted vector recreation of the Velo Reglo / Maher Habouria emblem from image_2822265f.png:
 * Deep midnight navy circular badge, two interlocking electric-cyan precision gears
 * framed by aerodynamic swooping bicycle arcs.
 */
export const VeloRegloEmblem: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="vrBadgeBg" cx="50%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#13203B" />
        <stop offset="100%" stopColor="#070C17" />
      </radialGradient>
      <linearGradient id="vrCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00D2FF" />
        <stop offset="50%" stopColor="#0088FF" />
        <stop offset="100%" stopColor="#0055B3" />
      </linearGradient>
    </defs>

    {/* Deep Navy Circular Badge */}
    <circle cx="60" cy="60" r="58" fill="url(#vrBadgeBg)" stroke="#0088FF" strokeWidth="2.5" strokeOpacity="0.55" />
    <circle cx="60" cy="60" r="52" stroke="#00D2FF" strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.35" />

    {/* Sweeping Bicycle Frame / Wheel Arcs */}
    <path
      d="M22 66C20 44 37 26 59 24C75 23 90 31 97 45"
      stroke="url(#vrCyanGrad)"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M26 73C35 56 54 48 76 52C86 54 95 60 100 68"
      stroke="url(#vrCyanGrad)"
      strokeWidth="2.8"
      strokeLinecap="round"
    />

    {/* Left Primary Precision Gear */}
    <g transform="translate(47, 46)">
      <circle cx="0" cy="0" r="12" stroke="url(#vrCyanGrad)" strokeWidth="3.2" />
      <circle cx="0" cy="0" r="5" fill="#00D2FF" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <rect
          key={deg}
          x="-2"
          y="-16"
          width="4"
          height="5"
          rx="1"
          fill="#00B4D8"
          transform={`rotate(${deg})`}
        />
      ))}
    </g>

    {/* Right Secondary Interlocking Gear */}
    <g transform="translate(72, 39)">
      <circle cx="0" cy="0" r="8.5" stroke="url(#vrCyanGrad)" strokeWidth="2.6" />
      <circle cx="0" cy="0" r="3.2" fill="#0088FF" />
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
        <rect
          key={deg}
          x="-1.6"
          y="-11.8"
          width="3.2"
          height="4"
          rx="0.8"
          fill="#00D2FF"
          transform={`rotate(${deg})`}
        />
      ))}
    </g>

    {/* Emblem Typography Plate */}
    <text
      x="60"
      y="84"
      textAnchor="middle"
      fill="#FFFFFF"
      fontFamily="Barlow Condensed, sans-serif"
      fontWeight="800"
      fontSize="15.5"
      letterSpacing="1.6"
    >
      VELO REGLO
    </text>
    <rect x="27" y="88.5" width="66" height="9.5" rx="2" fill="#FFFFFF" />
    <text
      x="60"
      y="95.5"
      textAnchor="middle"
      fill="#0A1120"
      fontFamily="JetBrains Mono, monospace"
      fontWeight="700"
      fontSize="6.2"
      letterSpacing="0.9"
    >
      MAHER HABOURIA
    </text>
  </svg>
);

/**
 * STAGE 01 CENTERPIECE: Raw Carbon Frame suspended in a Park Tool blue clamp
 * with laser geometry alignment lines and open bottom bracket shell.
 */
export const Stage1CarbonFrameArtwork: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 560 460"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Cadre carbone brut suspendu sur pied d'atelier Park Tool"
  >
    <defs>
      <linearGradient id="carbonTube" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#263147" />
        <stop offset="40%" stopColor="#0F172A" />
        <stop offset="85%" stopColor="#070B14" />
        <stop offset="100%" stopColor="#1E293B" />
      </linearGradient>
      <linearGradient id="parkBlue" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#005BB5" />
        <stop offset="50%" stopColor="#0073CF" />
        <stop offset="100%" stopColor="#00A8E8" />
      </linearGradient>
      <linearGradient id="cyanHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#0073CF" stopOpacity="0.2" />
      </linearGradient>
      <filter id="studioDropShadow" x="-15%" y="-15%" width="130%" height="140%">
        <feDropShadow dx="0" dy="22" stdDeviation="16" floodColor="#0A1120" floodOpacity="0.22" />
      </filter>
    </defs>

    {/* Subtle Studio Laser Alignment Grid */}
    <g opacity="0.45">
      <line x1="280" y1="15" x2="280" y2="445" stroke="#0073CF" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="90" y1="310" x2="470" y2="310" stroke="#0073CF" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="265" cy="310" r="38" stroke="#00A8E8" strokeWidth="1" strokeDasharray="3 3" />
    </g>

    {/* Top Park Tool PRS-3.3 Mast & Blue Mechanic Clamp */}
    <g>
      <rect x="256" y="0" width="24" height="72" fill="#1E293B" />
      <rect x="262" y="0" width="6" height="72" fill="#475569" opacity="0.5" />
      {/* Park Tool Blue Clamp Jaws */}
      <rect x="236" y="64" width="64" height="24" rx="5" fill="url(#parkBlue)" />
      <rect x="246" y="88" width="44" height="22" rx="4" fill="#0F172A" />
      <circle cx="268" cy="76" r="5" fill="#E2E8F0" />
      <text x="310" y="80" fill="#0073CF" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600">
        PARK TOOL PRS-3.3
      </text>
    </g>

    {/* Suspended Raw Carbon Superbike Frame */}
    <g filter="url(#studioDropShadow)">
      {/* Rear Triangle (Seatstay + Chainstay) */}
      <path
        d="M250 135 L118 295 L265 310 Z"
        stroke="url(#carbonTube)"
        strokeWidth="16"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Main Front Triangle (Top Tube, Down Tube, Seat Tube, Head Tube) */}
      <path
        d="M250 120 L418 112 L434 185 L265 310 Z"
        stroke="url(#carbonTube)"
        strokeWidth="22"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Seatpost Mast clamped in Park Tool */}
      <path d="M242 92 L265 310" stroke="url(#carbonTube)" strokeWidth="20" strokeLinecap="round" />

      {/* Aero Carbon Fork */}
      <path
        d="M422 104 L436 184 L468 328"
        stroke="url(#carbonTube)"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Electric Cyan Frame Team Decal & Internal Cable Ports */}
      <path d="M272 119 L396 113" stroke="url(#cyanHighlight)" strokeWidth="4" strokeLinecap="round" />
      <path d="M285 292 L416 194" stroke="url(#cyanHighlight)" strokeWidth="3.5" strokeLinecap="round" />
      <text
        x="348"
        y="250"
        transform="rotate(-36 348 250)"
        fill="#FFFFFF"
        fontFamily="Barlow Condensed, sans-serif"
        fontWeight="800"
        fontSize="17"
        letterSpacing="3"
        opacity="0.9"
      >
        VELO REGLO
      </text>

      {/* Rear Dropout + Blue Anodized Derailleur Hanger */}
      <circle cx="118" cy="295" r="11" fill="#0A1120" stroke="#00A8E8" strokeWidth="3" />
      <path d="M118 295 L122 322" stroke="#0073CF" strokeWidth="7" strokeLinecap="round" />
      <circle cx="122" cy="322" r="4" fill="#E2E8F0" />

      {/* Front Fork Thru-Axle Port */}
      <circle cx="468" cy="328" r="10" fill="#0A1120" stroke="#00A8E8" strokeWidth="3" />

      {/* Bottom Bracket Shell (PressFit / T47 Ceramic Port — Exit Point for Stage 01->02 Drop) */}
      <circle cx="265" cy="310" r="26" fill="#0A1120" stroke="#0073CF" strokeWidth="4" />
      <circle cx="265" cy="310" r="17" fill="#1E293B" stroke="#D97706" strokeWidth="2.5" strokeDasharray="5 3" />
      <circle cx="265" cy="310" r="8" fill="#F4F6F9" />
    </g>

    {/* Bottom Bracket Exit Nozzle Guide Lines */}
    <path d="M245 346 L245 430" stroke="#D97706" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.65" />
    <path d="M285 346 L285 430" stroke="#0073CF" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.65" />
  </svg>
);

/**
 * VERTICAL HAND-OFF ELEMENT (Stage 01 -> Stage 02):
 * Descending Gold Ti-Nitride XX1 Chain, Ceramic Bottom Bracket Bearing, and CNC Pulley Wheel.
 * Mirrors the coffee grounds falling from the grinder into the V60 cone in the reference video.
 */
export const FallingGoldChainArtwork: React.FC<{ className?: string }> = ({ className = 'w-36 h-48' }) => (
  <svg
    viewBox="0 0 180 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="goldTiNitride" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="45%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
    </defs>

    {/* Vertical Motion Trails */}
    <line x1="90" y1="4" x2="90" y2="230" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 6" opacity="0.5" />
    <line x1="62" y1="20" x2="62" y2="195" stroke="#0073CF" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.45" />
    <line x1="118" y1="28" x2="118" y2="205" stroke="#00A8E8" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.45" />

    {/* Uncoiling Gold XX1 Eagle Chain Links */}
    {[18, 46, 74, 102, 130, 158].map((y, idx) => (
      <g key={y} transform={`translate(${90 + (idx % 2 === 0 ? -4 : 4)}, ${y}) rotate(${idx % 2 === 0 ? -8 : 8})`}>
        <rect x="-13" y="-9" width="26" height="18" rx="8" fill="url(#goldTiNitride)" stroke="#78350F" strokeWidth="1.5" />
        <circle cx="-6" cy="0" r="3.2" fill="#0A1120" />
        <circle cx="6" cy="0" r="3.2" fill="#0A1120" />
      </g>
    ))}

    {/* Descending Ceramic Bearing Ring (Left) */}
    <g transform="translate(46, 118)">
      <circle cx="0" cy="0" r="19" fill="#0A1120" stroke="#00A8E8" strokeWidth="3.5" />
      <circle cx="0" cy="0" r="11" stroke="#E2E8F0" strokeWidth="2" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <circle
          key={deg}
          cx={Math.cos((deg * Math.PI) / 180) * 15}
          cy={Math.sin((deg * Math.PI) / 180) * 15}
          r="2.4"
          fill="#F59E0B"
        />
      ))}
    </g>

    {/* Descending CNC Anodized Pulley Jockey Wheel (Right) */}
    <g transform="translate(132, 146)">
      <circle cx="0" cy="0" r="17" fill="#0073CF" stroke="#0A1120" strokeWidth="2.5" />
      <circle cx="0" cy="0" r="7" fill="#F4F6F9" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <rect
          key={deg}
          x="-2"
          y="-20"
          width="4"
          height="4"
          rx="1"
          fill="#F59E0B"
          transform={`rotate(${deg})`}
        />
      ))}
    </g>
  </svg>
);

/**
 * STAGE 02 CENTERPIECE: 12-Speed Gold XX1 Cassette + Open Bosch/Shimano E-Bike Mid-Drive Motor
 * + Park Tool Blue Dynamic Torque Wrench engaging the lockring.
 */
export const Stage2DrivetrainMotorArtwork: React.FC<{ className?: string; rotationDeg?: number }> = ({
  className = 'w-full h-full',
  rotationDeg = 0,
}) => (
  <svg
    viewBox="0 0 560 460"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Cassette 12 vitesses or et moteur E-Bike en calibration Park Tool"
  >
    <defs>
      <linearGradient id="motorHousing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E293B" />
        <stop offset="60%" stopColor="#0A1120" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <linearGradient id="goldCog" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <linearGradient id="parkHandle" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0055A5" />
        <stop offset="50%" stopColor="#0073CF" />
        <stop offset="100%" stopColor="#00A8E8" />
      </linearGradient>
    </defs>

    {/* E-Bike Mid-Drive Magnesium Motor Housing (Right-Center Coupling) */}
    <g transform="translate(310, 238)">
      <path
        d="M-95 -88 L75 -88 C115 -88 140 -52 140 0 C140 52 115 88 75 88 L-95 88 Z"
        fill="url(#motorHousing)"
        stroke="#00A8E8"
        strokeWidth="2.5"
      />
      {/* Internal Planetary Gears Cutaway Window */}
      <circle cx="48" cy="0" r="56" fill="#070B14" stroke="#334155" strokeWidth="3" />
      <g transform={`translate(48, 0) rotate(${-rotationDeg * 1.4})`}>
        <circle cx="0" cy="0" r="46" stroke="#0073CF" strokeWidth="3" strokeDasharray="6 4" />
        {/* 3 Planetary Nylon/Steel Gears (like image_c486ec23.png bottom-right reel!) */}
        {[0, 120, 240].map((deg) => (
          <g key={deg} transform={`rotate(${deg}) translate(0, -26)`}>
            <circle cx="0" cy="0" r="14" fill="#E2E8F0" stroke="#0073CF" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="5" fill="#0A1120" />
          </g>
        ))}
        <circle cx="0" cy="0" r="12" fill="#F59E0B" />
      </g>
      <text x="-10" y="-64" fill="#00D2FF" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600">
        E-DRIVE PLANETARY LAB
      </text>
      <text x="-10" y="74" fill="#94A3B8" fontFamily="JetBrains Mono, monospace" fontSize="9.5">
        85 Nm TORQUE · BOSCH / SHIMANO
      </text>
    </g>

    {/* 12-Speed Gold XX1 Eagle Cassette (Left-Center Focal Hub) */}
    <g transform={`translate(215, 238) rotate(${rotationDeg})`}>
      {/* Outer 52T Dark Bronze/Gold Eagle Ring */}
      <circle cx="0" cy="0" r="122" fill="#0F172A" stroke="url(#goldCog)" strokeWidth="7" />
      {Array.from({ length: 24 }).map((_, i) => (
        <rect
          key={i}
          x="-3.5"
          y="-130"
          width="7"
          height="10"
          rx="1.5"
          fill="#F59E0B"
          transform={`rotate(${i * 15})`}
        />
      ))}

      {/* Concentric Machined Gold Cogs (42T, 36T, 28T, 21T, 14T, 10T) */}
      <circle cx="0" cy="0" r="98" fill="none" stroke="url(#goldCog)" strokeWidth="8" strokeDasharray="18 6" />
      <circle cx="0" cy="0" r="78" fill="none" stroke="url(#goldCog)" strokeWidth="7" strokeDasharray="14 5" />
      <circle cx="0" cy="0" r="58" fill="none" stroke="url(#goldCog)" strokeWidth="6" strokeDasharray="10 4" />
      <circle cx="0" cy="0" r="40" fill="#0A1120" stroke="#00A8E8" strokeWidth="4" />
      <circle cx="0" cy="0" r="18" fill="#F59E0B" />
      <circle cx="0" cy="0" r="8" fill="#0A1120" />
    </g>

    {/* Golden Chain Wrapping from Top (Stage 01 Hand-off) Around the Cassette & Descending to Stage 03 */}
    <path
      d="M215 10 L215 116 A122 122 0 1 0 215 360 L215 450"
      stroke="url(#goldCog)"
      strokeWidth="10"
      strokeDasharray="14 6"
      strokeLinecap="round"
    />

    {/* Park Tool Blue Dynamic Torque Wrench (TW-6.2) Engaging Lockring from Top-Right */}
    <g transform={`translate(215, 238) rotate(${-22 + Math.sin(rotationDeg * 0.05) * 6})`}>
      <rect x="10" y="-12" width="165" height="24" rx="4" fill="#CBD5E1" stroke="#0F172A" strokeWidth="2" />
      <rect x="140" y="-15" width="115" height="30" rx="8" fill="url(#parkHandle)" stroke="#0A1120" strokeWidth="2" />
      <text x="155" y="4" fill="#FFFFFF" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="10">
        PARK TOOL 40.0 Nm
      </text>
      <circle cx="0" cy="0" r="22" fill="#1E293B" stroke="#00A8E8" strokeWidth="3" />
      <circle cx="0" cy="0" r="9" fill="#F59E0B" />
    </g>
  </svg>
);

/**
 * STAGE 03 CENTERPIECE: Complete Championship Podium Carbon Superbike
 * (Matches the final coffee cup in Stage 03 `SIP` of the reference video, surrounded by floating cards).
 */
export const Stage3PodiumSuperbikeArtwork: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 680 430"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Vélo de compétition carbone Velo Reglo prêt pour le podium"
  >
    <defs>
      <linearGradient id="podiumPlinth" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0A1120" stopOpacity="0.05" />
        <stop offset="50%" stopColor="#0A1120" stopOpacity="0.28" />
        <stop offset="100%" stopColor="#0A1120" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id="superbikeFrame" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E293B" />
        <stop offset="50%" stopColor="#0A1120" />
        <stop offset="100%" stopColor="#070B14" />
      </linearGradient>
      <linearGradient id="goldChainLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>

    {/* Studio Podium Plinth Shadow & Radial Ring */}
    <ellipse cx="340" cy="382" rx="265" ry="22" fill="url(#podiumPlinth)" />
    <ellipse cx="340" cy="382" rx="220" ry="12" stroke="#0073CF" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />

    {/* Rear Deep-Section Carbon Wheel (Left) */}
    <g transform="translate(168, 266)">
      {/* Tan-wall Racing Tire + Deep Carbon Rim */}
      <circle cx="0" cy="0" r="108" stroke="#0F172A" strokeWidth="12" />
      <circle cx="0" cy="0" r="100" stroke="#D97706" strokeWidth="2.5" strokeOpacity="0.75" />
      <circle cx="0" cy="0" r="88" stroke="#1E293B" strokeWidth="18" />
      {/* Aero Spokes */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="0"
          y1="0"
          x2={Math.cos((deg * Math.PI) / 180) * 78}
          y2={Math.sin((deg * Math.PI) / 180) * 78}
          stroke="#64748B"
          strokeWidth="1.2"
          opacity="0.65"
        />
      ))}
      {/* Ice-Tech Disc Rotor & Gold XX1 Cassette */}
      <circle cx="0" cy="0" r="34" fill="#0F172A" stroke="#F59E0B" strokeWidth="5" />
      <circle cx="0" cy="0" r="22" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="6 3" />
      <circle cx="0" cy="0" r="10" fill="#0073CF" />
    </g>

    {/* Front Deep-Section Carbon Wheel (Right) */}
    <g transform="translate(512, 266)">
      <circle cx="0" cy="0" r="108" stroke="#0F172A" strokeWidth="12" />
      <circle cx="0" cy="0" r="100" stroke="#D97706" strokeWidth="2.5" strokeOpacity="0.75" />
      <circle cx="0" cy="0" r="88" stroke="#1E293B" strokeWidth="18" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="0"
          y1="0"
          x2={Math.cos((deg * Math.PI) / 180) * 78}
          y2={Math.sin((deg * Math.PI) / 180) * 78}
          stroke="#64748B"
          strokeWidth="1.2"
          opacity="0.65"
        />
      ))}
      {/* Front Disc Brake Rotor */}
      <circle cx="0" cy="0" r="28" stroke="#CBD5E1" strokeWidth="4" strokeDasharray="8 4" />
      <circle cx="0" cy="0" r="10" fill="#0073CF" />
    </g>

    {/* Assembled Carbon Frame & Integrated Cockpit */}
    <g>
      {/* Rear Triangle */}
      <path
        d="M272 135 L168 266 L305 276 Z"
        stroke="url(#superbikeFrame)"
        strokeWidth="14"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Main Triangle */}
      <path
        d="M268 118 L442 110 L456 172 L305 276 Z"
        stroke="url(#superbikeFrame)"
        strokeWidth="20"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Seatpost & Pro Carbon Saddle */}
      <path d="M250 72 L305 276" stroke="url(#superbikeFrame)" strokeWidth="16" strokeLinecap="round" />
      <path d="M214 68 L278 72 C266 80 245 80 214 68 Z" fill="#0A1120" stroke="#00A8E8" strokeWidth="2.5" />

      {/* Fork & Integrated Aero Carbon Cockpit */}
      <path d="M442 104 L456 172 L512 266" stroke="url(#superbikeFrame)" strokeWidth="16" strokeLinecap="round" />
      <path
        d="M438 102 L482 96 C502 96 512 114 496 130 L478 130"
        stroke="#0A1120"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Electric Cyan Accent Stripes */}
      <path d="M284 117 L424 111" stroke="#00A8E8" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M322 262 L442 180" stroke="#0073CF" strokeWidth="3.5" strokeLinecap="round" />
      <text
        x="384"
        y="224"
        transform="rotate(-34 384 224)"
        fill="#FFFFFF"
        fontFamily="Barlow Condensed, sans-serif"
        fontWeight="800"
        fontSize="15"
        letterSpacing="2.5"
      >
        VELO REGLO
      </text>

      {/* Gold XX1 Chain & Crankset */}
      <path
        d="M168 240 L305 248 L305 302 L168 292 Z"
        stroke="url(#goldChainLine)"
        strokeWidth="4.5"
        strokeDasharray="8 3"
      />
      <circle cx="305" cy="276" r="28" fill="#0A1120" stroke="#F59E0B" strokeWidth="4" />
      <circle cx="305" cy="276" r="12" fill="#0073CF" />
      {/* Crank Arm & Pedal */}
      <path d="M305 276 L342 312" stroke="#0A1120" strokeWidth="10" strokeLinecap="round" />
      <rect x="332" y="308" width="22" height="7" rx="2" fill="#00A8E8" />
    </g>
  </svg>
);
