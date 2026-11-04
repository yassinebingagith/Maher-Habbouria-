import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Sliders,
  Sparkles,
  Trophy,
} from 'lucide-react';
import {
  DIRECT_WHATSAPP_URL,
  Language,
  STAGE_3_CARDS,
  UI_COPY,
  computeScrollyMetrics,
} from '../utils/i18n';
import { ChampionTrophiesArtwork } from './ChampionTrophiesArtwork';
import { CropRegion, StudioCutoutImg } from './StudioCutoutImg';
import {
  FallingGoldChainArtwork,
  Stage1CarbonFrameArtwork,
  Stage2DrivetrainMotorArtwork,
  Stage3PodiumSuperbikeArtwork,
} from './VeloRegloLogo';

export interface CustomAssetOverrides {
  stage1_frame?: string;
  stage1_falling_chain?: string;
  stage2_drivetrain?: string;
  stage3_superbike?: string;
  floating_components?: string;
  video_1_to_2?: string;
  video_2_to_3?: string;
}

interface ScrollytellingStageProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  onOpenAssetStudio: () => void;
  assetOverrides: CustomAssetOverrides;
}

const COMPONENT_CROPS: Record<
  'park_hex' | 'gold_link' | 'carbon_spacer' | 'disc_rotor',
  CropRegion
> = {
  park_hex: {
    x: 10,
    y: 10,
    w: 735,
    h: 765,
    poly: [
      [10, 10],
      [745, 10],
      [745, 360],
      [340, 480],
      [260, 775],
      [10, 775],
    ],
  },
  gold_link: {
    x: 800,
    y: 5,
    w: 485,
    h: 300,
    poly: [
      [800, 5],
      [1285, 5],
      [1285, 225],
      [980, 305],
      [800, 305],
    ],
  },
  carbon_spacer: {
    x: 285,
    y: 625,
    w: 415,
    h: 385,
    poly: [
      [285, 625],
      [700, 625],
      [700, 1010],
      [285, 1010],
    ],
  },
  disc_rotor: {
    x: 720,
    y: 288,
    w: 805,
    h: 730,
    poly: [
      [720, 410],
      [1030, 288],
      [1525, 288],
      [1525, 1018],
      [720, 1018],
    ],
  },
};

function clamp01(val: number): number {
  return Math.max(0, Math.min(1, val));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export const ScrollytellingStage: React.FC<ScrollytellingStageProps> = ({
  lang,
  onChangeLang,
  onOpenAssetStudio,
  assetOverrides,
}) => {
  const copy = UI_COPY[lang];
  const isRtl = lang === 'tn';
  const runwayRef = useRef<HTMLElement | null>(null);

  // Target progress from scroll or manual control, plus smooth 60fps interpolated progress
  const targetProgressRef = useRef<number>(0.06);
  const [smoothProgress, setSmoothProgress] = useState<number>(0.06);
  const [activeCardId, setActiveCardId] = useState<string>(STAGE_3_CARDS[0].id);

  // Smooth 60fps spring-lerp animation loop so scroll transitions feel liquid-smooth
  useEffect(() => {
    let rafId: number;
    let current = targetProgressRef.current;

    const tick = () => {
      const target = targetProgressRef.current;
      const diff = target - current;
      if (Math.abs(diff) > 0.0005) {
        current += diff * 0.14;
        setSmoothProgress(current);
      } else if (current !== target) {
        current = target;
        setSmoothProgress(target);
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Measure scroll position inside the 360vh sticky scrollytelling runway
  useEffect(() => {
    const handleScroll = () => {
      const el = runwayRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollableDistance = Math.max(1, rect.height - viewportH);
      const raw = -rect.top / scrollableDistance;
      if (raw >= -0.05 && raw <= 1.05) {
        targetProgressRef.current = clamp01(raw);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const metrics = computeScrollyMetrics(smoothProgress);

  // Continuous stage weights (0..1) for seamless morphing across Stage 01 -> 02 -> 03 -> 04 (10 Medals & 3 Cups)
  const p = metrics.clampedProgress;
  const w1 = 1 - smoothstep(0.20, 0.32, p);
  const w2 = smoothstep(0.24, 0.35, p) * (1 - smoothstep(0.50, 0.61, p));
  const w3 = smoothstep(0.53, 0.64, p) * (1 - smoothstep(0.76, 0.88, p));
  const w4 = smoothstep(0.74, 0.90, p); // Morphs the Superbike into 10 Gold Medals & 3 Gold Cups!

  // Hand-off 1->2 (Blue Ceramic Derailleur + Gold Chain descending between Stage 01 and Stage 02)
  const handoff12Opacity =
    smoothstep(0.14, 0.22, p) * (1 - smoothstep(0.30, 0.37, p));
  const handoff12Y = -95 + smoothstep(0.14, 0.37, p) * 190;

  // Hand-off 2->3 (Golden-Cyan Torque Stream connecting Drivetrain into Podium Superbike)
  const handoff23Opacity =
    smoothstep(0.46, 0.53, p) * (1 - smoothstep(0.60, 0.67, p));

  const handleStageSelect = (stage: 1 | 2 | 3 | 4) => {
    const targetP =
      stage === 1 ? 0.06 : stage === 2 ? 0.42 : stage === 3 ? 0.68 : 0.95;
    targetProgressRef.current = targetP;

    const el = runwayRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
      window.scrollTo({
        top: absoluteTop + targetP * scrollableDistance,
        behavior: 'smooth',
      });
    }
  };

  const handleJumpToChampion = () => {
    const champEl = document.getElementById('champion');
    if (champEl) {
      champEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrubberChange = (newP: number) => {
    targetProgressRef.current = clamp01(newP);
  };

  const activeStageCopy =
    metrics.activeStage === 1
      ? copy.stage1
      : metrics.activeStage === 2
        ? copy.stage2
        : metrics.activeStage === 3
          ? copy.stage3
          : copy.trophyTransition;

  const activeMobileSpecCard =
    STAGE_3_CARDS.find((c) => c.id === activeCardId) || STAGE_3_CARDS[0];

  return (
    <section
      ref={runwayRef}
      id="process"
      aria-label={copy.nav.process}
      className="relative w-full min-h-[340vh] lg:min-h-[380vh] bg-[#0A1120]"
    >
      {/* =====================================================================
          UNIFIED STICKY VIEWPORT STAGE
          Seamless 01 Cadre -> 02 Mécanique -> 03 Podium Bike -> 04 10 Medals & 3 Cups
         ===================================================================== */}
      <div className="sticky top-[56px] sm:top-[65px] w-full h-[calc(100dvh-56px)] sm:h-[calc(100dvh-65px)] overflow-hidden flex flex-col justify-between bg-[#F8FAFC] bg-studio-grid select-none">
        {/* 1. SEAMLESS MORPHING STAGE BACKDROP LAYERS */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0"
        >
          {/* Stage 04 Seamless Full-Viewport Dark Championship Navy Backdrop (#0A1120)
              Matches the exact background color of the Maher Habouria #champion section below! */}
          <div
            className="absolute inset-0 bg-[#0A1120] transition-opacity duration-150"
            style={{ opacity: w4 }}
          />

          {/* Stage 02 Deep Navy Asymmetric Panel — glides in smoothly from the left on desktop */}
          <div
            className="hidden lg:block absolute inset-y-0 left-0 w-[36%] bg-[#0A1120] shadow-2xl will-change-transform"
            style={{
              transform: `translate3d(${(w2 - 1) * 102}%, 0, 0)`,
              opacity: w2 > 0.01 ? 1 : 0,
            }}
          />
          {/* Mobile Stage 02 Top Accent Glow */}
          <div
            className="lg:hidden absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0A1120]/12 to-transparent pointer-events-none"
            style={{ opacity: w2 }}
          />

          {/* Subtle Radial Studio Spotlight behind active centerpiece */}
          <div
            className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[580px] sm:h-[580px] rounded-full blur-3xl transition-colors duration-500"
            style={{
              background:
                metrics.activeStage === 1
                  ? 'radial-gradient(circle, rgba(0,115,207,0.12) 0%, rgba(248,250,252,0) 70%)'
                  : metrics.activeStage === 2
                    ? 'radial-gradient(circle, rgba(245,158,11,0.14) 0%, rgba(0,115,207,0.08) 45%, rgba(248,250,252,0) 72%)'
                    : metrics.activeStage === 3
                      ? 'radial-gradient(circle, rgba(0,168,232,0.15) 0%, rgba(10,17,32,0.06) 50%, rgba(248,250,252,0) 72%)'
                      : 'radial-gradient(circle, rgba(245,158,11,0.28) 0%, rgba(0,168,232,0.12) 48%, rgba(10,17,32,0) 74%)',
            }}
          />

          {/* Giant Architectural Watermark Word */}
          <div className="absolute inset-x-0 top-[14%] sm:top-[16%] flex justify-center items-center overflow-hidden">
            <span
              className={`font-display font-extrabold text-[clamp(4.5rem,16vw,13.5rem)] leading-none tracking-tighter uppercase whitespace-nowrap will-change-transform transition-colors duration-300 ${
                w4 > 0.5 ? 'text-[#F59E0B]/[0.07]' : 'text-[#0A1120]/[0.045]'
              }`}
              style={{
                transform: `translate3d(0, ${Math.round((0.5 - p) * 50)}px, 0)`,
              }}
            >
              {activeStageCopy.backdropWord}
            </span>
          </div>
        </div>

        {/* 2. TOP STAGE SCRUBBER & STEPPER HUD BAR */}
        <div
          className={`relative z-30 backdrop-blur-md border-b px-2 sm:px-8 py-2 shrink-0 transition-colors duration-300 ${
            w4 > 0.55
              ? 'bg-[#0A1120]/90 border-white/10 text-white'
              : 'bg-white/85 border-[#0A1120]/10 text-[#0A1120]'
          }`}
        >
          <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
            {/* 4-Stage Stepper Pills (01 Cadre, 02 Mécanique, 03 Podium, 04 Trophées) */}
            <div
              role="group"
              aria-label="Sélecteur d'étape mécanique"
              className={`inline-flex items-center gap-0.5 sm:gap-1 p-1 rounded-xl shrink-0 ${
                w4 > 0.55 ? 'bg-white/10' : 'bg-[#0A1120]/8'
              }`}
            >
              {([1, 2, 3, 4] as const).map((stageNum) => {
                const label =
                  stageNum === 1
                    ? copy.stage1.backdropWord
                    : stageNum === 2
                      ? copy.stage2.backdropWord
                      : stageNum === 3
                        ? copy.stage3.backdropWord
                        : copy.trophyTransition.pillLabel;
                const isActive = metrics.activeStage === stageNum;
                return (
                  <button
                    key={stageNum}
                    type="button"
                    onClick={() => handleStageSelect(stageNum)}
                    className={`px-1.5 sm:px-3 py-1 text-[9px] sm:text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? stageNum === 4
                          ? 'bg-[#F59E0B] text-[#0A1120] font-bold shadow-xs'
                          : 'bg-[#0A1120] text-white shadow-xs'
                        : w4 > 0.55
                          ? 'text-white/75 hover:text-white'
                          : 'text-[#0A1120]/70 hover:text-[#0A1120]'
                    }`}
                  >
                    <span
                      className={`font-mono mr-0.5 sm:mr-1 ${
                        isActive && stageNum === 4
                          ? 'text-[#0A1120]'
                          : 'text-[#00A8E8]'
                      }`}
                    >
                      0{stageNum}.
                    </span>
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Interactive Mechanical Scrubber + Language / Asset Studio Controls */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Desktop Trilingual Switcher */}
              <div
                role="group"
                aria-label="Sélecteur de langue"
                className={`hidden md:inline-flex items-center gap-1 p-1 rounded-lg ${
                  w4 > 0.55 ? 'bg-white/10' : 'bg-[#0A1120]/8'
                }`}
              >
                {(
                  [
                    { code: 'fr', label: 'FR' },
                    { code: 'tn', label: 'TN · تونسية' },
                    { code: 'en', label: 'EN' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => onChangeLang(item.code)}
                    className={`px-2.5 py-0.5 text-xs font-mono font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      lang === item.code
                        ? 'bg-[#0073CF] text-white'
                        : w4 > 0.55
                          ? 'text-white/75 hover:text-white'
                          : 'text-[#0A1120]/75 hover:text-[#0A1120]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Scrubber Slider (Tablet/Desktop) */}
              <div className="hidden sm:flex items-center gap-2 bg-white text-[#0A1120] px-2.5 py-1 rounded-lg border border-[#0A1120]/10">
                <Sliders
                  className="w-3.5 h-3.5 text-[#0073CF]"
                  aria-hidden="true"
                />
                <label
                  htmlFor="mechanical-scrubber"
                  className="text-[11px] font-mono font-semibold text-[#0A1120] whitespace-nowrap tabular-nums"
                >
                  {(p * 100).toFixed(0)}%
                </label>
                <input
                  id="mechanical-scrubber"
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(p * 100)}
                  onChange={(e) =>
                    handleScrubberChange(Number(e.target.value) / 100)
                  }
                  className="w-24 accent-[#0073CF] cursor-pointer"
                  aria-label="Curseur d'assemblage mécanique"
                />
              </div>

              <button
                type="button"
                onClick={onOpenAssetStudio}
                className="px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-semibold text-[#0A1120] bg-white hover:bg-[#0073CF]/10 border border-[#0A1120]/15 rounded-lg transition-colors inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Sparkles
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0073CF]"
                  aria-hidden="true"
                />
                <span className="hidden sm:inline">{copy.nav.assetStudio}</span>
                <span className="sm:hidden">IA</span>
              </button>
            </div>
          </div>

          {/* Continuous Thin Progress Line at Bottom of Scrubber Bar */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#0A1120]/8 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0073CF] via-[#00A8E8] to-[#F59E0B] transition-all duration-75"
              style={{ width: `${Math.max(4, Math.round(p * 100))}%` }}
            />
          </div>
        </div>

        {/* 3. MAIN CONTINUOUS CHOREOGRAPHED STAGE BODY */}
        <div className="relative z-10 flex-1 min-h-0 max-w-[1280px] w-full mx-auto px-3 sm:px-8 py-2 sm:py-4 flex flex-col lg:grid lg:grid-cols-12 lg:items-center gap-2 lg:gap-6">
          {/* =================================================================
              DESKTOP LEFT COLUMN: Continuous Morphing Narrative (Stage 01 / 02 / 03 / 04)
             ================================================================= */}
          <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className="hidden lg:flex lg:col-span-4 flex-col justify-center relative min-h-[380px] pr-4"
          >
            {[
              { stage: 1 as const, data: copy.stage1, weight: w1, dark: false },
              { stage: 2 as const, data: copy.stage2, weight: w2, dark: true },
              { stage: 3 as const, data: copy.stage3, weight: w3, dark: false },
            ].map(({ stage, data, weight, dark }) => (
              <div
                key={stage}
                style={{
                  opacity: weight,
                  transform: `translate3d(0, ${Math.round((1 - weight) * (p > (stage - 1) * 0.3 ? -28 : 28))}px, 0)`,
                  pointerEvents: weight > 0.5 ? 'auto' : 'none',
                }}
                className={`left-0 right-4 space-y-4 transition-opacity duration-150 ${
                  weight > 0.5 ? 'relative' : 'absolute'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-9 h-9 rounded-full border flex items-center justify-center font-mono text-xs font-bold tabular-nums shrink-0 ${
                      dark
                        ? 'border-white/25 bg-white/10 text-[#00A8E8]'
                        : 'border-[#0A1120]/20 bg-white text-[#0A1120]'
                    }`}
                  >
                    {data.number}
                  </span>
                  <span
                    className={`font-mono text-xs font-semibold tracking-wider ${
                      dark ? 'text-[#00A8E8]' : 'text-[#0073CF]'
                    }`}
                  >
                    {data.kicker}
                  </span>
                </div>

                <h1
                  className={`font-display font-extrabold text-[clamp(2.3rem,3.8vw,3.7rem)] leading-[1.02] tracking-tight uppercase ${
                    dark ? 'text-white' : 'text-[#0A1120]'
                  }`}
                >
                  {data.title}
                </h1>

                <p
                  className={`text-sm xl:text-base leading-relaxed max-w-[38ch] ${
                    dark ? 'text-slate-300' : 'text-[#475569]'
                  }`}
                >
                  {data.description}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleStageSelect((stage + 1) as 2 | 3 | 4)}
                    className={`btn-mechanical group px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-3 shadow-sm cursor-pointer whitespace-nowrap shrink-0 ${
                      dark
                        ? 'bg-white text-[#0A1120] hover:text-white'
                        : 'bg-[#0A1120] text-white'
                    }`}
                  >
                    <span className="relative z-10">
                      {stage === 3
                        ? copy.trophyTransition.handoffBadge
                        : data.cta}
                    </span>
                    <ArrowRight
                      className={`relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1 ${
                        dark
                          ? 'text-[#0073CF] group-hover:text-white'
                          : 'text-[#00A8E8] group-hover:text-white'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            ))}

            {/* Stage 04 Narrative: Bike Morphing into 10 Gold Medals & 3 Gold Cups */}
            <div
              style={{
                opacity: w4,
                transform: `translate3d(0, ${Math.round((1 - w4) * 28)}px, 0)`,
                pointerEvents: w4 > 0.5 ? 'auto' : 'none',
              }}
              className={`left-0 right-4 space-y-4 transition-opacity duration-150 ${
                w4 > 0.5 ? 'relative' : 'absolute'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full border border-[#F59E0B]/50 bg-[#F59E0B]/20 text-[#FBBF24] flex items-center justify-center font-mono text-xs font-bold tabular-nums shrink-0">
                  {copy.trophyTransition.number}
                </span>
                <span className="font-mono text-xs font-semibold tracking-wider text-[#FBBF24]">
                  {copy.trophyTransition.kicker}
                </span>
              </div>

              <h2 className="font-display font-extrabold text-[clamp(2.2rem,3.6vw,3.5rem)] leading-[1.04] tracking-tight uppercase text-white">
                {copy.trophyTransition.title}
              </h2>

              <p className="text-sm xl:text-base leading-relaxed max-w-[38ch] text-slate-300">
                {copy.trophyTransition.description}
              </p>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleJumpToChampion}
                  className="btn-mechanical group px-5 py-3 rounded-xl bg-[#F59E0B] text-[#0A1120] hover:text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2.5 shadow-lg cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Trophy
                    className="relative z-10 w-4 h-4"
                    aria-hidden="true"
                  />
                  <span className="relative z-10">
                    {copy.trophyTransition.handoffBadge}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* =================================================================
              CENTER VISUAL CANVAS (Mobile Full-Width Centerpiece + Desktop Cols 5-9)
              Stage 01 Frame -> Stage 02 Drivetrain -> Stage 03 Superbike -> Stage 04 10 Medals & 3 Cups!
             ================================================================= */}
          <div className="relative flex-1 min-h-[240px] sm:min-h-[340px] lg:h-[520px] lg:col-span-5 flex items-center justify-center">
            {/* FLOATING PARALLAX WORKSHOP HARDWARE (True Alpha Cutouts) */}
            {assetOverrides.floating_components && (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2 sm:right-4 top-1 sm:top-3 w-16 h-16 sm:w-24 sm:h-24 z-20 will-change-transform"
                  style={{
                    opacity: clamp01(w1 * 1.15),
                    transform: `translate3d(0, ${Math.round(-p * 70)}px, 0) rotate(${Math.round(p * 48 - 10)}deg) scale(${0.85 + w1 * 0.15})`,
                  }}
                >
                  <StudioCutoutImg
                    src={assetOverrides.floating_components}
                    alt=""
                    crop={COMPONENT_CROPS.park_hex}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-2 sm:left-4 top-2 sm:top-6 w-14 h-10 sm:w-20 sm:h-14 z-20 will-change-transform"
                  style={{
                    opacity: clamp01(w1 * 1.15),
                    transform: `translate3d(0, ${Math.round(p * 65)}px, 0) rotate(${Math.round(-14 + p * 35)}deg)`,
                  }}
                >
                  <StudioCutoutImg
                    src={assetOverrides.floating_components}
                    alt=""
                    crop={COMPONENT_CROPS.gold_link}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-1 sm:right-2 top-1 sm:top-4 w-16 h-16 sm:w-24 sm:h-24 z-20 will-change-transform"
                  style={{
                    opacity: clamp01(w2 * 1.2),
                    transform: `translate3d(0, ${Math.round((0.5 - p) * 50)}px, 0) rotate(${Math.round(p * 220)}deg) scale(${0.8 + w2 * 0.2})`,
                  }}
                >
                  <StudioCutoutImg
                    src={assetOverrides.floating_components}
                    alt=""
                    crop={COMPONENT_CROPS.disc_rotor}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-2 sm:left-4 bottom-2 sm:bottom-6 w-12 h-12 sm:w-18 sm:h-18 z-20 will-change-transform"
                  style={{
                    opacity: clamp01(w2 * 1.2),
                    transform: `translate3d(0, ${Math.round((p - 0.5) * -60)}px, 0) rotate(${Math.round(p * -45)}deg)`,
                  }}
                >
                  <StudioCutoutImg
                    src={assetOverrides.floating_components}
                    alt=""
                    crop={COMPONENT_CROPS.carbon_spacer}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>
              </>
            )}

            {/* LAYER A (STAGE 01): Raw Carbon Frame on Blue Park Tool Stand */}
            <div
              className="absolute inset-0 flex items-center justify-center will-change-transform"
              style={{
                opacity: w1,
                transform: `translate3d(0, ${Math.round((1 - w1) * -130)}px, 0) scale(${0.88 + w1 * 0.12})`,
                pointerEvents: w1 > 0.4 ? 'auto' : 'none',
              }}
            >
              {assetOverrides.stage1_frame ? (
                <StudioCutoutImg
                  src={assetOverrides.stage1_frame}
                  alt={copy.stage1.title}
                  className="max-h-[230px] sm:max-h-[340px] lg:max-h-[430px] w-auto object-contain drop-shadow-xl"
                />
              ) : (
                <Stage1CarbonFrameArtwork className="w-full h-full max-h-[380px]" />
              )}
            </div>

            {/* VERTICAL BRIDGE 01 -> 02: Blue Ceramic-Bearing Derailleur & Gold Chain */}
            <div
              aria-hidden={handoff12Opacity < 0.1}
              className="absolute inset-x-0 flex flex-col items-center justify-center z-20 pointer-events-none will-change-transform"
              style={{
                opacity: handoff12Opacity,
                transform: `translate3d(0, ${Math.round(handoff12Y)}px, 0) scale(${0.86 + handoff12Opacity * 0.14})`,
              }}
            >
              {assetOverrides.stage1_falling_chain ? (
                <StudioCutoutImg
                  src={assetOverrides.stage1_falling_chain}
                  alt="Chape dérailleur roulements céramiques bleus et chaîne or XX1"
                  className="h-32 sm:h-44 lg:h-52 w-auto object-contain drop-shadow-xl"
                />
              ) : (
                <FallingGoldChainArtwork className="w-28 h-36 mx-auto" />
              )}
              <span className="mt-1 px-2.5 py-0.5 rounded-md bg-[#0A1120]/90 text-[#00A8E8] font-mono text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase shadow-sm whitespace-nowrap">
                {copy.stage1.handoffLabel}
              </span>
            </div>

            {/* LAYER B (STAGE 02): Exploded 11-50T Gold Cassette, Park Tool Wrench & Bosch Motor */}
            <div
              className="absolute inset-0 flex items-center justify-center will-change-transform"
              style={{
                opacity: w2,
                transform: `translate3d(0, ${Math.round((p < 0.42 ? 1 - w2 : -(1 - w2)) * 120)}px, 0) scale(${0.86 + w2 * 0.14})`,
                pointerEvents: w2 > 0.4 ? 'auto' : 'none',
              }}
            >
              {assetOverrides.video_1_to_2 ? (
                <video
                  src={assetOverrides.video_1_to_2}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="max-h-[230px] sm:max-h-[340px] lg:max-h-[400px] w-auto object-contain rounded-2xl shadow-xl"
                />
              ) : assetOverrides.stage2_drivetrain ? (
                <StudioCutoutImg
                  src={assetOverrides.stage2_drivetrain}
                  alt={copy.stage2.title}
                  className="max-h-[220px] sm:max-h-[330px] lg:max-h-[400px] w-auto object-contain drop-shadow-xl"
                />
              ) : (
                <Stage2DrivetrainMotorArtwork
                  className="w-full h-full max-h-[360px]"
                  rotationDeg={Math.round(p * 360)}
                />
              )}
            </div>

            {/* VERTICAL BRIDGE 02 -> 03: Torque & Gold Chain Impulse locking into Podium Superbike */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 flex flex-col items-center justify-center z-20 pointer-events-none will-change-transform"
              style={{
                opacity: handoff23Opacity,
                transform: `translate3d(0, ${Math.round((p - 0.56) * 180)}px, 0)`,
              }}
            >
              <div className="w-1 h-16 sm:h-24 bg-gradient-to-b from-[#F59E0B] via-[#00A8E8] to-[#0073CF] rounded-full shadow-md" />
              <span className="mt-1 px-2.5 py-0.5 rounded-md bg-[#0A1120]/90 text-white font-mono text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase shadow-sm whitespace-nowrap">
                {copy.stage2.handoffLabel}
              </span>
            </div>

            {/* LAYER C (STAGE 03): Midnight Carbon XC Superbike with Cyan Accents
                As `w4` increases (`p > 0.74`), the bike gleams golden and morphs into the 10 Medals & 3 Cups! */}
            <div
              className="absolute inset-0 flex items-center justify-center will-change-transform"
              style={{
                opacity: w3,
                transform: `translate3d(0, ${Math.round((p < 0.68 ? 1 - w3 : -(1 - w3) * 0.45) * 90)}px, 0) scale(${0.86 + w3 * 0.14 - w4 * 0.18})`,
                filter:
                  w4 > 0.05
                    ? `drop-shadow(0 0 ${Math.round(w4 * 36)}px rgba(245,158,11,0.75)) brightness(${1 + w4 * 0.35})`
                    : undefined,
                pointerEvents: w3 > 0.4 ? 'auto' : 'none',
              }}
            >
              {assetOverrides.video_2_to_3 ? (
                <video
                  src={assetOverrides.video_2_to_3}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="max-h-[220px] sm:max-h-[320px] lg:max-h-[390px] w-auto object-contain rounded-2xl shadow-xl"
                />
              ) : assetOverrides.stage3_superbike ? (
                <StudioCutoutImg
                  src={assetOverrides.stage3_superbike}
                  alt={copy.stage3.title}
                  className="max-h-[210px] sm:max-h-[310px] lg:max-h-[390px] w-auto object-contain drop-shadow-2xl"
                />
              ) : (
                <Stage3PodiumSuperbikeArtwork className="w-full h-full max-h-[360px]" />
              )}
            </div>

            {/* LAYER D (STAGE 04): THE SUPERBIKE BECOMES 10 GOLD MEDALS & 3 GOLD CUPS
                Introducing Champion Maher Habouria! */}
            <div
              className="absolute inset-0 flex items-center justify-center z-20 will-change-transform"
              style={{
                opacity: smoothstep(0.71, 0.82, p),
                transform: `translate3d(0, ${Math.round((1 - w4) * 35)}px, 0) scale(${0.84 + w4 * 0.16})`,
                pointerEvents: w4 > 0.4 ? 'auto' : 'none',
              }}
            >
              <ChampionTrophiesArtwork
                morphProgress={w4}
                label10Medals={copy.trophyTransition.medalsLabel}
                label3Cups={copy.trophyTransition.cupsLabel}
              />
            </div>
          </div>

          {/* =================================================================
              DESKTOP RIGHT COLUMN: Technical Telemetry & Champion Palmarès
             ================================================================= */}
          <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className="hidden lg:flex lg:col-span-3 flex-col justify-center relative min-h-[380px]"
          >
            {/* Stage 01 Telemetry Card */}
            <div
              style={{
                opacity: w1,
                transform: `translate3d(0, ${Math.round((1 - w1) * -24)}px, 0)`,
                pointerEvents: w1 > 0.5 ? 'auto' : 'none',
              }}
              className={`space-y-4 ${w1 > 0.5 ? 'relative' : 'absolute inset-x-0'}`}
            >
              <div className="bg-white/95 backdrop-blur-xs p-5 rounded-2xl border border-[#0A1120]/10 shadow-sm space-y-2.5">
                <div
                  dir="ltr"
                  className="flex items-center justify-between text-xs font-mono text-[#0073CF]"
                >
                  <span>PARK TOOL DAG-3</span>
                  <span className="tabular-nums font-bold">±0.05 mm</span>
                </div>
                <h2 className="text-sm font-bold text-[#0A1120] uppercase tracking-wide">
                  {copy.stage1.rightCalloutTitle}
                </h2>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {copy.stage1.rightCalloutBody}
                </p>
              </div>

              <div className="bg-[#0A1120] text-white p-4 rounded-xl space-y-1">
                <div className="text-[11px] font-mono text-[#00A8E8] uppercase">
                  {lang === 'tn'
                    ? 'LES DISCIPLINES المعتمدين'
                    : lang === 'en'
                      ? 'CERTIFIED DISCIPLINES'
                      : 'DISCIPLINES CERTIFIÉES'}
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  MTB XCO · Route Carbone · Gravel · Vélo Électrique
                </div>
              </div>
            </div>

            {/* Stage 02 Telemetry Card */}
            <div
              style={{
                opacity: w2,
                transform: `translate3d(0, ${Math.round((1 - w2) * 24)}px, 0)`,
                pointerEvents: w2 > 0.5 ? 'auto' : 'none',
              }}
              className={`space-y-4 ${w2 > 0.5 ? 'relative' : 'absolute inset-x-0'}`}
            >
              <div className="bg-white/95 backdrop-blur-xs p-5 rounded-2xl border border-[#0A1120]/10 shadow-sm space-y-3">
                <div
                  dir="ltr"
                  className="flex items-center justify-between text-xs font-mono text-[#D97706]"
                >
                  <span>11-50T 12S · PARK TOOL</span>
                  <span className="tabular-nums font-bold">40.0 Nm</span>
                </div>
                <h2 className="text-sm font-bold text-[#0A1120] uppercase tracking-wide">
                  {copy.stage2.rightCalloutTitle}
                </h2>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {copy.stage2.rightCalloutBody}
                </p>
                <div
                  dir="ltr"
                  className="pt-2 border-t border-[#0A1120]/10 flex items-center justify-between text-xs font-mono text-[#0A1120]"
                >
                  <span>BOSCH PERFORMANCE LINE</span>
                  <span className="text-[#0073CF] font-semibold">
                    100% TESTED
                  </span>
                </div>
              </div>
            </div>

            {/* Stage 03 Active Spec Card Summary on Right */}
            <div
              style={{
                opacity: w3,
                transform: `translate3d(0, ${Math.round((1 - w3) * 24)}px, 0)`,
                pointerEvents: w3 > 0.5 ? 'auto' : 'none',
              }}
              className={`space-y-3 ${w3 > 0.5 ? 'relative' : 'absolute inset-x-0'}`}
            >
              <div className="bg-[#0A1120] text-white p-5 rounded-2xl border border-[#00A8E8]/40 shadow-lg space-y-2.5">
                <div
                  dir="ltr"
                  className="flex items-center justify-between text-[11px] font-mono text-[#00A8E8]"
                >
                  <span>{activeMobileSpecCard.badgeCode}</span>
                  <span>{activeMobileSpecCard.metric}</span>
                </div>
                <h2 className="font-display font-bold text-xl uppercase tracking-wide">
                  {activeMobileSpecCard.title[lang]}
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeMobileSpecCard.protocol[lang]}
                </p>
                <a
                  href={DIRECT_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-lg bg-[#25D366] text-[#0A1120] hover:bg-[#20BD5A] text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{copy.nav.bookCta}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Stage 04 Palmarès Summary Card on Right */}
            <div
              style={{
                opacity: w4,
                transform: `translate3d(0, ${Math.round((1 - w4) * 24)}px, 0)`,
                pointerEvents: w4 > 0.5 ? 'auto' : 'none',
              }}
              className={`space-y-3 ${w4 > 0.5 ? 'relative' : 'absolute inset-x-0'}`}
            >
              <div className="bg-[#131F38] text-white p-5 rounded-2xl border border-[#F59E0B]/45 shadow-xl space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#FBBF24]">
                  <span>MAHER HABOURIA</span>
                  <span>PALMARÈS OR</span>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-[#0A1120] border border-[#F59E0B]/30">
                    <div
                      dir="ltr"
                      className="font-display font-extrabold text-3xl text-[#F59E0B] tabular-nums"
                    >
                      10× 🥇
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      {copy.champion.stat1Label}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A1120] border border-[#00A8E8]/30">
                    <div
                      dir="ltr"
                      className="font-display font-extrabold text-3xl text-[#00A8E8] tabular-nums"
                    >
                      3× 🏆
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      {copy.champion.stat2Label}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleJumpToChampion}
                  className="w-full py-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>{copy.nav.champion}</span>
                  <ArrowDown
                    className="w-3.5 h-3.5 text-[#FBBF24]"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* =================================================================
              MOBILE & TABLET BOTTOM HUD CARD (< 1024px)
              Designed specifically for 99% Smartphone Traffic
             ================================================================= */}
          <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className="lg:hidden relative z-30 w-full shrink-0 pb-1"
          >
            {metrics.activeStage < 3 ? (
              <div
                className={`p-4 rounded-2xl border shadow-lg transition-colors duration-300 ${
                  metrics.activeStage === 2
                    ? 'bg-[#0A1120] text-white border-white/15'
                    : 'bg-white/95 backdrop-blur-md text-[#0A1120] border-[#0A1120]/12'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full text-[11px] font-mono font-bold flex items-center justify-center shrink-0 ${
                        metrics.activeStage === 2
                          ? 'bg-[#00A8E8]/20 text-[#00A8E8]'
                          : 'bg-[#0073CF]/12 text-[#0073CF]'
                      }`}
                    >
                      {activeStageCopy.number}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-semibold tracking-wider uppercase line-clamp-1 ${
                        metrics.activeStage === 2
                          ? 'text-[#00A8E8]'
                          : 'text-[#0073CF]'
                      }`}
                    >
                      {activeStageCopy.kicker}
                    </span>
                  </div>

                  <span
                    dir="ltr"
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-md tabular-nums shrink-0 ${
                      metrics.activeStage === 2
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-[#0A1120]/6 text-[#0A1120]'
                    }`}
                  >
                    {metrics.activeStage === 1
                      ? 'DAG-3 · ±0.05 mm'
                      : '11-50T · 40.0 Nm'}
                  </span>
                </div>

                <h2 className="font-display font-extrabold text-xl sm:text-2xl leading-tight tracking-tight uppercase mb-1.5">
                  {activeStageCopy.title}
                </h2>

                <p
                  className={`text-xs sm:text-sm leading-snug line-clamp-2 mb-3 ${
                    metrics.activeStage === 2
                      ? 'text-slate-300'
                      : 'text-[#475569]'
                  }`}
                >
                  {activeStageCopy.description}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleStageSelect((metrics.activeStage + 1) as 2 | 3)
                    }
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-2 cursor-pointer ${
                      metrics.activeStage === 2
                        ? 'bg-[#0073CF] text-white'
                        : 'bg-[#0A1120] text-white'
                    }`}
                  >
                    <span>
                      {metrics.activeStage === 1
                        ? copy.stage1.cta
                        : copy.stage2.cta}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>

                  <a
                    href={DIRECT_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3.5 rounded-xl text-xs font-bold bg-[#25D366] text-[#0A1120] inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{copy.nav.bookCta}</span>
                  </a>
                </div>
              </div>
            ) : metrics.activeStage === 3 ? (
              /* STAGE 03 MOBILE HUD: Interactive 3-Card Podium Switcher */
              <div className="bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-[#0A1120]/12 shadow-lg space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#0073CF] uppercase block">
                      {copy.stage3.kicker}
                    </span>
                    <h2 className="font-display font-extrabold text-xl sm:text-2xl leading-tight uppercase text-[#0A1120]">
                      {copy.stage3.title}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStageSelect(4)}
                    className="px-3 py-2 rounded-xl bg-[#F59E0B] text-[#0A1120] text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>10× 🥇 + 3× 🏆</span>
                  </button>
                </div>

                {/* 1-Tap Spec Card Tabs for Mobile */}
                <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                  {STAGE_3_CARDS.map((card, idx) => {
                    const isSelectedCard = card.id === activeCardId;
                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => setActiveCardId(card.id)}
                        className={`p-2 rounded-xl border text-start transition-all cursor-pointer ${
                          isSelectedCard
                            ? 'bg-[#0A1120] text-white border-[#00A8E8]'
                            : 'bg-[#F4F6F9] text-[#0A1120] border-[#0A1120]/10'
                        }`}
                      >
                        <div
                          dir="ltr"
                          className="flex items-center justify-between text-[10px] font-mono mb-0.5"
                        >
                          <span
                            className={
                              isSelectedCard
                                ? 'text-[#00A8E8]'
                                : 'text-[#0073CF]'
                            }
                          >
                            0{idx + 1}/03
                          </span>
                        </div>
                        <div className="font-display font-bold text-xs uppercase truncate">
                          {card.title[lang]}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Spec Card Detail Row */}
                <div className="p-2.5 rounded-xl bg-[#F4F6F9] border border-[#0A1120]/8 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-[#0A1120] truncate">
                      {activeMobileSpecCard.subtitle[lang]}
                    </div>
                    <p className="text-[11px] text-[#475569] line-clamp-1">
                      {activeMobileSpecCard.protocol[lang]}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* STAGE 04 MOBILE HUD: 10 Gold Medals & 3 Gold Cups Introducing Maher Habouria */
              <div className="bg-[#131F38]/95 backdrop-blur-md text-white p-4 rounded-2xl border border-[#F59E0B]/40 shadow-xl space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold text-[#FBBF24] uppercase line-clamp-1">
                    {copy.trophyTransition.kicker}
                  </span>
                  <span
                    dir="ltr"
                    className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#F59E0B]/20 text-[#FDE68A] whitespace-nowrap shrink-0"
                  >
                    10× 🥇 · 3× 🏆
                  </span>
                </div>

                <h2 className="font-display font-extrabold text-xl sm:text-2xl leading-tight uppercase text-white">
                  {copy.trophyTransition.title}
                </h2>

                <p className="text-xs text-slate-300 leading-snug line-clamp-2">
                  {copy.trophyTransition.description}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleJumpToChampion}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#F59E0B] text-[#0A1120] text-xs font-bold inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{copy.trophyTransition.handoffBadge}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. DESKTOP STAGE 03 FLOATING TILTED SPEC CARDS BAR */}
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className="hidden lg:block relative z-20 max-w-[1200px] w-full mx-auto px-8 pb-4 transition-all duration-300"
          style={{
            opacity: w3,
            transform: `translate3d(0, ${Math.round((1 - w3) * 60)}px, 0)`,
            pointerEvents: w3 > 0.45 ? 'auto' : 'none',
          }}
        >
          <div className="grid grid-cols-3 gap-6">
            {STAGE_3_CARDS.map((card, idx) => {
              const isFocusedCard = activeCardId === card.id;

              return (
                <div
                  key={card.id}
                  onClick={() => setActiveCardId(card.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveCardId(card.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  style={{
                    transform: `rotate(${card.tiltDeg}deg) translateY(${isFocusedCard ? '-6px' : '0px'})`,
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isFocusedCard
                      ? 'bg-[#0A1120] text-white border-[#00A8E8] shadow-xl'
                      : 'bg-white/95 text-[#0A1120] border-[#0A1120]/15 hover:border-[#0073CF] shadow-md'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div
                      dir="ltr"
                      className="flex items-center justify-between text-[11px] font-mono"
                    >
                      <span
                        className={
                          isFocusedCard ? 'text-[#00A8E8]' : 'text-[#0073CF]'
                        }
                      >
                        {card.badgeCode}
                      </span>
                      <span className="tabular-nums opacity-60">
                        0{idx + 1}/03
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl tracking-wide uppercase">
                      {card.title[lang]}
                    </h3>

                    <p
                      className={`text-xs font-mono ${
                        isFocusedCard ? 'text-amber-300' : 'text-[#475569]'
                      }`}
                    >
                      {card.subtitle[lang]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
