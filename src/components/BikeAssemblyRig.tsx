import React from 'react';
import { AssemblyStageIndex } from '../utils/i18n';
import { ChampionTrophiesArtwork } from './ChampionTrophiesArtwork';

interface BikeAssemblyRigProps {
  /** Normalized overall scroll progress [0..1] */
  progress: number;
  /** Current active assembly step (1..6) */
  activeStage: AssemblyStageIndex;
  /** Localized labels for the trophy step */
  medalsLabel: string;
  cupsLabel: string;
  /** Localized short labels for live callout badges */
  lang: 'fr' | 'tn' | 'en';
}

function clamp01(val: number): number {
  return Math.max(0, Math.min(1, val));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Unified Progressive Mechanical Assembly Rig (`1448 × 1086` coordinate space, 4:3 aspect ratio).
 *
 * Guarantees 100% visual consistency across all 6 scroll stages:
 * - Step 01: Bare "Velo Reglo" Carbon Frame mounted on the Blue Park Tool Repair Stand + Laser DAG-3 Reticles
 * - Step 02: Fox 34 Kashima Fork, Fox Float Kashima Shock, Kashima Dropper Seatpost & Carbon Cockpit fly in & lock onto the frame
 * - Step 03: SRAM XX Carbon Crankset, 24K Gold 12s Cassette & Blue Ceramic Derailleur + Park Tool Hex Wrench lock onto the frame
 * - Step 04: 24K Gold 12s Chain (Ultrasonic Degreased & Ceramic Lubed) & 180mm/160mm Disc Brake Rotors lock onto the drivetrain
 * - Step 05: Zipp Carbon / Maxxis Tan-Wall Tubeless Wheels roll in & lock onto the axles as the stand releases into the complete Race-Ready Velo Reglo Superbike
 * - Step 06: The Velo Reglo Superbike gleams 24K gold and transforms into 10 Gold Medals & 3 Gold Cups introducing Champion Maher Habouria
 */
export const BikeAssemblyRig: React.FC<BikeAssemblyRigProps> = ({
  progress: p,
  activeStage,
  medalsLabel,
  cupsLabel,
  lang,
}) => {
  // Progressive installation weights [0..1] — once a part locks (t = 1), it STAYS on the bike!
  const tStep2 = smoothstep(0.12, 0.25, p); // Suspension & Cockpit lock in
  const tStep3 = smoothstep(0.28, 0.41, p); // Crankset, Gold Cassette & Blue Derailleur lock in
  const tStep4 = smoothstep(0.44, 0.57, p); // 24K Gold Chain & Disc Brake Rotors lock in
  const tStep5 = smoothstep(0.58, 0.69, p); // Zipp Carbon / Maxxis Tubeless Wheels roll in & lock

  // Smooth cross-lock into the ultra-sharp complete Velo Reglo bike photo once all wheels & parts are locked
  const fullBikeLock = smoothstep(0.65, 0.72, p);

  // Step 06: Morph from the complete Velo Reglo bike into 10 Gold Medals & 3 Gold Cups
  const wTrophies = smoothstep(0.82, 0.94, p);

  // Visibility of the progressive component layers before/during fullBikeLock
  const partsLayerOpacity = 1 - fullBikeLock;

  // Blue Park Tool Repair Stand stays clamped during Steps 01..04, then smoothly lowers away as the wheels lock in Step 05
  const standRetract = smoothstep(0.60, 0.70, p);
  const standOpacity = (1 - standRetract) * (1 - wTrophies);

  // Active step highlight pulses for technical callout badges
  const step1CalloutOpacity =
    (1 - smoothstep(0.13, 0.18, p)) * (1 - wTrophies);
  const step2CalloutOpacity =
    smoothstep(0.13, 0.18, p) * (1 - smoothstep(0.28, 0.33, p));
  const step3CalloutOpacity =
    smoothstep(0.29, 0.34, p) * (1 - smoothstep(0.44, 0.49, p));
  const step4CalloutOpacity =
    smoothstep(0.45, 0.50, p) * (1 - smoothstep(0.61, 0.66, p));
  const step5CalloutOpacity =
    smoothstep(0.62, 0.67, p) * (1 - smoothstep(0.81, 0.85, p));

  return (
    <div
      data-testid="bike-assembly-rig"
      data-active-stage={activeStage}
      className="relative w-full max-w-[640px] aspect-[4/3] mx-auto flex items-center justify-center select-none"
    >
      {/* =====================================================================
          STAGE STUDIO FLOOR SHADOW
         ===================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[3%] left-1/2 -translate-x-1/2 w-[78%] h-7 rounded-full blur-xl transition-all duration-300"
        style={{
          background:
            wTrophies > 0.4
              ? 'radial-gradient(ellipse, rgba(245,158,11,0.38) 0%, rgba(10,17,32,0) 75%)'
              : 'radial-gradient(ellipse, rgba(10,17,32,0.22) 0%, rgba(10,17,32,0) 75%)',
          transform: `translate3d(-50%, 0, 0) scaleX(${lerp(0.65, 1.04, tStep5)})`,
        }}
      />

      {/* =====================================================================
          LAYER 0: BLUE PARK TOOL REPAIR STAND (Clamped to the Velo Reglo Frame)
          Holds the bike from Step 01 through Step 04, then releases in Step 05
         ===================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 will-change-transform"
        style={{
          opacity: standOpacity,
          transform: `translate3d(0, ${Math.round(standRetract * 75)}px, 0) scale(${lerp(1, 0.94, standRetract)})`,
        }}
      >
        <img
          src="/assets/aistudio/props/prop-park-stand-only.png"
          alt=""
          width={1122}
          height={1402}
          decoding="async"
          draggable={false}
          style={{
            position: 'absolute',
            left: '11.5%',
            top: '17.5%',
            width: '52%',
            height: 'auto',
          }}
          className="drop-shadow-lg"
        />
      </div>

      {/* =====================================================================
          PROGRESSIVE ASSEMBLY CANVAS (Steps 01 -> 05)
          All parts assemble onto the exact same Velo Reglo Carbon Frame
         ===================================================================== */}
      {partsLayerOpacity > 0.01 && (
        <div
          aria-hidden={fullBikeLock > 0.8}
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={{
            opacity: partsLayerOpacity,
          }}
        >
          {/* -----------------------------------------------------------------
              STEP 05 PROPS (Behind Frame/Fork Dropouts):
              Zipp 303S Carbon Wheels with Maxxis Tan-Wall Tubeless Tires
             ----------------------------------------------------------------- */}
          {p > 0.55 && (
            <>
              {/* Rear Wheel (Zipp Carbon + Maxxis Tubeless + Gold Cassette) */}
              <img
                src="/assets/aistudio/props/prop-wheel-rear.png"
                alt=""
                width={348}
                height={344}
                decoding="async"
                draggable={false}
                style={{
                  position: 'absolute',
                  left: '0.8%',
                  top: '29.2%',
                  width: '33.6%',
                  height: 'auto',
                  opacity: smoothstep(0.55, 0.62, p),
                  transform: `translate3d(${Math.round(lerp(-145, 0, tStep5))}px, ${Math.round(lerp(18, 0, tStep5))}px, 0) rotate(${Math.round(lerp(-140, 0, tStep5))}deg) scale(${lerp(0.88, 1, tStep5)})`,
                }}
                className="drop-shadow-xl will-change-transform"
              />

              {/* Front Wheel (Zipp Carbon + Maxxis Tubeless) */}
              <img
                src="/assets/aistudio/props/prop-wheel-front.png"
                alt=""
                width={348}
                height={344}
                decoding="async"
                draggable={false}
                style={{
                  position: 'absolute',
                  left: '58.0%',
                  top: '31.5%',
                  width: '39.5%',
                  height: 'auto',
                  opacity: smoothstep(0.55, 0.62, p),
                  transform: `translate3d(${Math.round(lerp(155, 0, tStep5))}px, ${Math.round(lerp(18, 0, tStep5))}px, 0) rotate(${Math.round(lerp(140, 0, tStep5))}deg) scale(${lerp(0.88, 1, tStep5)})`,
                }}
                className="drop-shadow-xl will-change-transform"
              />
            </>
          )}

          {/* -----------------------------------------------------------------
              STEP 04 PROPS (Behind Cassette/Fork):
              180mm Front & 160mm Rear Stainless Disc Brake Rotors
             ----------------------------------------------------------------- */}
          {p > 0.41 && (
            <>
              {/* Rear 160mm Disc Brake Rotor */}
              <img
                src="/assets/aistudio/props/prop-rotor-rear.png"
                alt=""
                width={144}
                height={144}
                decoding="async"
                draggable={false}
                style={{
                  position: 'absolute',
                  left: '12.2%',
                  top: '50.8%',
                  width: '10.4%',
                  height: 'auto',
                  opacity: smoothstep(0.41, 0.48, p),
                  transform: `translate3d(${Math.round(lerp(-95, 0, tStep4))}px, ${Math.round(lerp(55, 0, tStep4))}px, 0) rotate(${Math.round(lerp(-180, 0, tStep4))}deg) scale(${lerp(0.82, 1, tStep4)})`,
                }}
                className="drop-shadow-md will-change-transform"
              />

              {/* Front 180mm Disc Brake Rotor */}
              <img
                src="/assets/aistudio/props/prop-rotor-front.png"
                alt=""
                width={152}
                height={152}
                decoding="async"
                draggable={false}
                style={{
                  position: 'absolute',
                  left: '68.8%',
                  top: '52.2%',
                  width: '11.6%',
                  height: 'auto',
                  opacity: smoothstep(0.41, 0.48, p),
                  transform: `translate3d(${Math.round(lerp(105, 0, tStep4))}px, ${Math.round(lerp(45, 0, tStep4))}px, 0) rotate(${Math.round(lerp(180, 0, tStep4))}deg) scale(${lerp(0.82, 1, tStep4)})`,
                }}
                className="drop-shadow-md will-change-transform"
              />
            </>
          )}

          {/* -----------------------------------------------------------------
              STEP 03 PROP (Behind Rear Triangle Dropout):
              24K Gold 12-Speed 10-52T Cassette
             ----------------------------------------------------------------- */}
          {p > 0.25 && (
            <img
              src="/assets/aistudio/props/prop-cassette.png"
              alt=""
              width={164}
              height={164}
              decoding="async"
              draggable={false}
              style={{
                position: 'absolute',
                left: '10.6%',
                top: '49.2%',
                width: '13.2%',
                height: 'auto',
                opacity: smoothstep(0.25, 0.32, p),
                transform: `translate3d(${Math.round(lerp(-115, 0, tStep3))}px, ${Math.round(lerp(-40, 0, tStep3))}px, 0) rotate(${Math.round(lerp(-220, 0, tStep3))}deg) scale(${lerp(0.85, 1, tStep3)})`,
              }}
              className="drop-shadow-lg will-change-transform"
            />
          )}

          {/* -----------------------------------------------------------------
              STEP 02 PROPS (Mounted Inside Frame Tubes):
              1. Kashima Gold Dropper Seatpost & Saddle
              2. Fox Float Factory Kashima Rear Shock
              3. Fox 34 Factory Kashima Front Suspension Fork (rotated -107deg so steerer slides up into headtube!)
             ----------------------------------------------------------------- */}
          {p > 0.09 && (
            <>
              {/* Kashima Gold Dropper Seatpost & Cyan Racing Saddle */}
              <img
                src="/assets/aistudio/props/prop-seatpost.png"
                alt=""
                width={164}
                height={284}
                decoding="async"
                draggable={false}
                style={{
                  position: 'absolute',
                  left: '19.8%',
                  top: '5.5%',
                  width: '14.2%',
                  height: 'auto',
                  opacity: smoothstep(0.09, 0.16, p),
                  transform: `translate3d(${Math.round(lerp(-38, 0, tStep2))}px, ${Math.round(lerp(-105, 0, tStep2))}px, 0) rotate(${lerp(-6, -17, tStep2).toFixed(1)}deg) scale(${lerp(0.9, 1, tStep2)})`,
                }}
                className="drop-shadow-lg will-change-transform"
              />

              {/* Fox Float Factory Kashima Rear Shock */}
              <img
                src="/assets/aistudio/props/prop-shock.png"
                alt=""
                width={84}
                height={216}
                decoding="async"
                draggable={false}
                style={{
                  position: 'absolute',
                  left: '37.8%',
                  top: '26.2%',
                  width: '6.4%',
                  height: 'auto',
                  opacity: smoothstep(0.10, 0.17, p),
                  transform: `translate3d(${Math.round(lerp(20, 0, tStep2))}px, ${Math.round(lerp(-95, 0, tStep2))}px, 0) rotate(${lerp(15, 52, tStep2).toFixed(1)}deg) scale(${lerp(0.9, 1, tStep2)})`,
                }}
                className="drop-shadow-md will-change-transform"
              />

              {/* Fox 34 Factory Kashima Front Suspension Fork (steerer slides up into headtube at -107deg) */}
              <img
                src="/assets/aistudio/props/prop-fork.png"
                alt=""
                width={444}
                height={144}
                decoding="async"
                draggable={false}
                style={{
                  position: 'absolute',
                  left: '48.8%',
                  top: '28.2%',
                  width: '41.5%',
                  height: 'auto',
                  opacity: smoothstep(0.10, 0.17, p),
                  transform: `translate3d(${Math.round(lerp(115, 0, tStep2))}px, ${Math.round(lerp(65, 0, tStep2))}px, 0) rotate(${lerp(-65, -107, tStep2).toFixed(1)}deg) scale(${lerp(0.88, 1, tStep2)})`,
                }}
                className="drop-shadow-xl will-change-transform"
              />
            </>
          )}

          {/* -----------------------------------------------------------------
              STEP 01 MASTER CHASSIS (Always Present from p = 0):
              Bare "Velo Reglo" Midnight-Navy & Cyan Carbon Frame
             ----------------------------------------------------------------- */}
          <img
            src="/assets/aistudio/props/prop-frame.png"
            alt="Cadre Carbone Velo Reglo"
            width={420}
            height={266}
            fetchPriority="high"
            decoding="async"
            draggable={false}
            style={{
              position: 'absolute',
              left: '14.0%',
              top: '11.2%',
              width: '55.7%',
              height: 'auto',
            }}
            className="drop-shadow-2xl will-change-transform"
          />

          {/* -----------------------------------------------------------------
              STEP 02 PROP (In Front of Headtube):
              Carbon Riser Handlebar, Cyan Anodized Stem & Hydraulic Levers
             ----------------------------------------------------------------- */}
          {p > 0.10 && (
            <img
              src="/assets/aistudio/props/prop-cockpit.png"
              alt=""
              width={432}
              height={80}
              decoding="async"
              draggable={false}
              style={{
                position: 'absolute',
                left: '51.5%',
                top: '7.2%',
                width: '31.5%',
                height: 'auto',
                opacity: smoothstep(0.11, 0.18, p),
                transform: `translate3d(${Math.round(lerp(45, 0, tStep2))}px, ${Math.round(lerp(-85, 0, tStep2))}px, 0) rotate(${lerp(-8, 4, tStep2).toFixed(1)}deg) scale(${lerp(0.9, 1, tStep2)})`,
              }}
              className="drop-shadow-lg will-change-transform"
            />
          )}

          {/* -----------------------------------------------------------------
              STEP 04 PROP (Connecting Cassette to Crankset):
              24K Gold 12-Speed Chain (Ultrasonically Degreased & Lubed)
             ----------------------------------------------------------------- */}
          {p > 0.42 && (
            <img
              src="/assets/aistudio/props/prop-chain.png"
              alt=""
              width={68}
              height={344}
              decoding="async"
              draggable={false}
              style={{
                position: 'absolute',
                left: '24.6%',
                top: '43.5%',
                width: '5.5%',
                height: 'auto',
                opacity: smoothstep(0.43, 0.51, p),
                transform: `translate3d(${Math.round(lerp(-65, 0, tStep4))}px, ${Math.round(lerp(-95, 0, tStep4))}px, 0) rotate(${lerp(-35, -83, tStep4).toFixed(1)}deg) scale(${lerp(0.88, 1, tStep4)})`,
              }}
              className="drop-shadow-md will-change-transform"
            />
          )}

          {/* -----------------------------------------------------------------
              STEP 03 PROPS (In Front of Frame Bottom Bracket & Dropout):
              1. SRAM XX Carbon Crankset & Chainring
              2. Blue Anodized Ceramic-Bearing Rear Derailleur
              3. Blue Park Tool 3-Way Hex Wrench (Active Calibration Tool)
             ----------------------------------------------------------------- */}
          {p > 0.25 && (
            <>
              {/* SRAM XX Carbon Crankset */}
              <img
                src="/assets/aistudio/props/prop-crankset.png"
                alt=""
                width={216}
                height={136}
                decoding="async"
                draggable={false}
                style={{
                  position: 'absolute',
                  left: '32.8%',
                  top: '53.2%',
                  width: '17.2%',
                  height: 'auto',
                  opacity: smoothstep(0.25, 0.33, p),
                  transform: `translate3d(${Math.round(lerp(75, 0, tStep3))}px, ${Math.round(lerp(85, 0, tStep3))}px, 0) rotate(${lerp(-40, 8, tStep3).toFixed(1)}deg) scale(${lerp(0.86, 1, tStep3)})`,
                }}
                className="drop-shadow-xl will-change-transform"
              />

              {/* Blue Anodized Ceramic-Bearing Rear Derailleur */}
              <img
                src="/assets/aistudio/props/prop-derailleur.png"
                alt=""
                width={144}
                height={188}
                decoding="async"
                draggable={false}
                style={{
                  position: 'absolute',
                  left: '9.8%',
                  top: '55.8%',
                  width: '10.2%',
                  height: 'auto',
                  opacity: smoothstep(0.26, 0.34, p),
                  transform: `translate3d(${Math.round(lerp(-85, 0, tStep3))}px, ${Math.round(lerp(75, 0, tStep3))}px, 0) rotate(${lerp(32, 0, tStep3).toFixed(1)}deg) scale(${lerp(0.86, 1, tStep3)})`,
                }}
                className="drop-shadow-xl will-change-transform"
              />

              {/* Active Park Tool 3-Way Hex Wrench during Step 03 Calibration */}
              <img
                src="/assets/aistudio/props/prop-park-hex.png"
                alt=""
                width={735}
                height={765}
                decoding="async"
                draggable={false}
                style={{
                  position: 'absolute',
                  left: '4.5%',
                  top: '22.0%',
                  width: '15.0%',
                  height: 'auto',
                  opacity: step3CalloutOpacity,
                  transform: `translate3d(0, ${Math.round((1 - step3CalloutOpacity) * -24)}px, 0) rotate(${Math.round(p * 140 - 30)}deg)`,
                }}
                className="drop-shadow-lg will-change-transform"
              />
            </>
          )}
        </div>
      )}

      {/* =====================================================================
          COMPLETE RACE-READY "VELO REGLO" SUPERBIKE LAYER (Step 05 Lock -> Step 06 Morph)
          Matches the exact frame & wheel geometry of the assembled props!
         ===================================================================== */}
      {fullBikeLock > 0.01 && (
        <div
          aria-hidden={wTrophies > 0.85}
          className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
          style={{
            opacity: fullBikeLock * (1 - smoothstep(0.84, 0.96, p)),
            transform: `translate3d(0, ${Math.round(wTrophies * -24)}px, 0) scale(${1 - wTrophies * 0.14})`,
            filter:
              wTrophies > 0.04
                ? `drop-shadow(0 0 ${Math.round(wTrophies * 32)}px rgba(245,158,11,0.8)) brightness(${1 + wTrophies * 0.35})`
                : undefined,
          }}
        >
          <img
            src="/assets/aistudio/props/prop-complete-bike.png"
            alt="Vélo de course VTT Carbone Velo Reglo assemblé et prêt pour la course"
            width={1448}
            height={1086}
            decoding="async"
            draggable={false}
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      )}

      {/* =====================================================================
          LIVE MECHANIC TELEMETRY CALLOUT PINS ON THE RIG (Steps 01 -> 05)
         ===================================================================== */}
      {wTrophies < 0.25 && (
        <div
          aria-hidden="true"
          dir="ltr"
          className="pointer-events-none absolute inset-0 z-20"
        >
          {/* Step 01 Callouts: Laser Hanger Alignment & PressFit Bottom Bracket */}
          {step1CalloutOpacity > 0.05 && (
            <div style={{ opacity: step1CalloutOpacity }}>
              <div className="absolute left-[6%] top-[49%] flex items-center gap-1.5 bg-[#0A1120]/90 text-white px-2.5 py-1 rounded-full border border-[#00A8E8]/50 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#00A8E8] animate-ping" />
                <span className="font-mono text-[10px] font-bold text-[#00A8E8]">
                  DAG-3 LASER ±0.05mm
                </span>
              </div>
              <div className="absolute left-[36%] top-[64%] flex items-center gap-1.5 bg-white/95 text-[#0A1120] px-2.5 py-1 rounded-full border border-[#0073CF]/40 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#0073CF]" />
                <span className="font-mono text-[10px] font-bold">
                  BOÎTIER PRESSFIT BB92
                </span>
              </div>
            </div>
          )}

          {/* Step 02 Callouts: Fox 34 Kashima Fork & Rear Shock SAG / Cockpit Torque */}
          {step2CalloutOpacity > 0.05 && (
            <div style={{ opacity: step2CalloutOpacity }}>
              <div className="absolute right-[6%] top-[24%] flex items-center gap-1.5 bg-[#0A1120]/90 text-white px-2.5 py-1 rounded-full border border-[#F59E0B]/60 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span className="font-mono text-[10px] font-bold text-[#FBBF24]">
                  FOX 34 KASHIMA · 20WT GOLD
                </span>
              </div>
              <div className="absolute left-[44%] top-[3%] flex items-center gap-1.5 bg-white/95 text-[#0A1120] px-2.5 py-1 rounded-full border border-[#00A8E8]/50 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#0073CF]" />
                <span className="font-mono text-[10px] font-bold">
                  COCKPIT CARBONE · 5.2 Nm
                </span>
              </div>
            </div>
          )}

          {/* Step 03 Callouts: Gold 12s Cassette 40 Nm & Ceramic Derailleur */}
          {step3CalloutOpacity > 0.05 && (
            <div style={{ opacity: step3CalloutOpacity }}>
              <div className="absolute left-[2%] top-[43%] flex items-center gap-1.5 bg-[#0A1120]/95 text-white px-2.5 py-1 rounded-full border border-[#F59E0B]/60 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span className="font-mono text-[10px] font-bold text-[#FBBF24]">
                  CASSETTE 12V OR · 40.0 Nm
                </span>
              </div>
              <div className="absolute left-[31%] top-[71%] flex items-center gap-1.5 bg-[#0A1120]/95 text-white px-2.5 py-1 rounded-full border border-[#00A8E8]/60 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#00A8E8]" />
                <span className="font-mono text-[10px] font-bold text-[#00A8E8]">
                  SRAM XX · 54.0 Nm
                </span>
              </div>
            </div>
          )}

          {/* Step 04 Callouts: Ultrasonic Chain Degrease + Lube & Hydraulic Disc Bleed */}
          {step4CalloutOpacity > 0.05 && (
            <div style={{ opacity: step4CalloutOpacity }}>
              <div className="absolute left-[18%] top-[38%] flex items-center gap-1.5 bg-[#0A1120]/95 text-white px-2.5 py-1 rounded-full border border-[#F59E0B]/60 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                <span className="font-mono text-[10px] font-bold text-[#FBBF24]">
                  {lang === 'en'
                    ? 'ULTRASONIC DEGREASE + CERAMIC WAX'
                    : 'DÉGRAISSAGE ULTRASON + CIRE OR'}
                </span>
              </div>
              <div className="absolute right-[4%] top-[48%] flex items-center gap-1.5 bg-white/95 text-[#0A1120] px-2.5 py-1 rounded-full border border-[#0073CF]/50 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#0073CF]" />
                <span className="font-mono text-[10px] font-bold">
                  PURGE HYDRAULIQUE · 180/160mm
                </span>
              </div>
            </div>
          )}

          {/* Step 05 Callouts: Zipp Carbon Wheels + Maxxis Tubeless Sealant */}
          {step5CalloutOpacity > 0.05 && (
            <div style={{ opacity: step5CalloutOpacity }}>
              <div className="absolute left-[2%] bottom-[8%] flex items-center gap-1.5 bg-[#0A1120]/90 text-white px-2.5 py-1 rounded-full border border-[#F59E0B]/50 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span className="font-mono text-[10px] font-bold text-[#FBBF24]">
                  ZIPP 303S · 60ml PRÉVENTIF TUBELESS
                </span>
              </div>
              <div className="absolute right-[2%] bottom-[8%] flex items-center gap-1.5 bg-[#0A1120]/90 text-white px-2.5 py-1 rounded-full border border-[#00A8E8]/50 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#00A8E8]" />
                <span className="font-mono text-[10px] font-bold text-[#00A8E8]">
                  MAXXIS SKINWALL · 1.4 / 1.6 BAR
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          LAYER 6 (STEP 06): THE SUPERBIKE BECOMES 10 GOLD MEDALS & 3 GOLD CUPS
          Seamless Handoff Introducing Champion Maher Habouria!
         ===================================================================== */}
      {p > 0.78 && (
        <div
          className="absolute inset-0 flex items-center justify-center z-30 will-change-transform"
          style={{
            opacity: smoothstep(0.80, 0.88, p),
            transform: `translate3d(0, ${Math.round((1 - wTrophies) * 32)}px, 0) scale(${0.86 + wTrophies * 0.14})`,
            pointerEvents: wTrophies > 0.4 ? 'auto' : 'none',
          }}
        >
          <ChampionTrophiesArtwork
            morphProgress={wTrophies}
            label10Medals={medalsLabel}
            label3Cups={cupsLabel}
          />
        </div>
      )}
    </div>
  );
};
