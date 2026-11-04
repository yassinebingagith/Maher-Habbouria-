import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Sliders,
  Trophy,
  Wrench,
} from 'lucide-react';
import {
  AssemblyStageIndex,
  DIRECT_WHATSAPP_URL,
  Language,
  STAGE_3_CARDS,
  UI_COPY,
  computeScrollyMetrics,
} from '../utils/i18n';
import { BikeAssemblyRig } from './BikeAssemblyRig';

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
  assetOverrides?: CustomAssetOverrides;
}

function clamp01(val: number): number {
  return Math.max(0, Math.min(1, val));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

const STAGE_TARGET_PROGRESS: Record<AssemblyStageIndex, number> = {
  1: 0.05,
  2: 0.25,
  3: 0.42,
  4: 0.59,
  5: 0.76,
  6: 0.94,
};

export const ScrollytellingStage: React.FC<ScrollytellingStageProps> = ({
  lang,
  onChangeLang,
}) => {
  const copy = UI_COPY[lang];
  const isRtl = lang === 'tn';
  const runwayRef = useRef<HTMLElement | null>(null);

  // Target progress from scroll or manual control, plus smooth 60fps interpolated progress
  const targetProgressRef = useRef<number>(0.05);
  const [smoothProgress, setSmoothProgress] = useState<number>(0.05);
  const [activeCardId, setActiveCardId] = useState<string>(STAGE_3_CARDS[0].id);

  // Smooth 60fps spring-lerp animation loop so scroll transitions feel liquid-smooth
  useEffect(() => {
    let rafId: number;
    let current = targetProgressRef.current;

    const tick = () => {
      const target = targetProgressRef.current;
      const diff = target - current;
      if (Math.abs(diff) > 0.0004) {
        current += diff * 0.24;
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

  // Measure scroll position inside the 480vh sticky scrollytelling runway
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
  const p = metrics.clampedProgress;

  // Stage 06 dark championship backdrop weight (0..1)
  const wTrophies = smoothstep(0.82, 0.94, p);
  // Subtle dark workshop accent panel on Stages 03 & 04
  const wDarkWorkshopPanel =
    smoothstep(0.28, 0.35, p) * (1 - smoothstep(0.62, 0.69, p));
  // Stage 05 Podium Spec Cards visibility weight
  const wPodiumCards =
    smoothstep(0.66, 0.73, p) * (1 - smoothstep(0.81, 0.87, p));

  const handleStageSelect = (stage: AssemblyStageIndex) => {
    const targetP = STAGE_TARGET_PROGRESS[stage];
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

  const isTrophyStage = metrics.activeStage === 6;
  const activeStepData =
    metrics.activeStage <= 5
      ? copy.assemblySteps[metrics.activeStage - 1]
      : copy.assemblySteps[4];

  const backdropWord = isTrophyStage
    ? copy.trophyTransition.backdropWord
    : activeStepData.backdropWord;

  const isLeftColumnDark = isTrophyStage || wDarkWorkshopPanel > 0.55;

  const activeMobileSpecCard =
    STAGE_3_CARDS.find((c) => c.id === activeCardId) || STAGE_3_CARDS[0];

  return (
    <section
      ref={runwayRef}
      id="process"
      aria-label={copy.nav.process}
      className="relative w-full min-h-[460vh] lg:min-h-[500vh] bg-[#0A1120]"
    >
      {/* =====================================================================
          UNIFIED STICKY VIEWPORT STAGE
          Consistent Velo Reglo Bike Assembly (Steps 01 -> 05) + Step 06 Trophies
         ===================================================================== */}
      <div className="sticky top-[56px] sm:top-[65px] w-full h-[calc(100dvh-56px)] sm:h-[calc(100dvh-65px)] overflow-hidden flex flex-col justify-between bg-[#F8FAFC] bg-studio-grid select-none">
        {/* 1. SEAMLESS MORPHING STAGE BACKDROP LAYERS */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0"
        >
          {/* Stage 06 Seamless Full-Viewport Dark Championship Navy Backdrop (#0A1120)
              Matches the exact background color of the Maher Habouria #champion section below! */}
          <div
            className="absolute inset-0 bg-[#0A1120] transition-opacity duration-150"
            style={{ opacity: wTrophies }}
          />

          {/* Desktop Deep Navy Asymmetric Workshop Panel during Steps 03 & 04 */}
          <div
            className="hidden lg:block absolute inset-y-0 left-0 w-[36%] bg-[#0A1120] shadow-2xl will-change-transform"
            style={{
              transform: `translate3d(${(wDarkWorkshopPanel - 1) * 102}%, 0, 0)`,
              opacity: wDarkWorkshopPanel > 0.01 ? 1 : 0,
            }}
          />

          {/* Subtle Radial Studio Spotlight behind active centerpiece */}
          <div
            className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[580px] sm:h-[580px] rounded-full blur-3xl transition-colors duration-500"
            style={{
              background: isTrophyStage
                ? 'radial-gradient(circle, rgba(245,158,11,0.28) 0%, rgba(0,168,232,0.12) 48%, rgba(10,17,32,0) 74%)'
                : metrics.activeStage === 3 || metrics.activeStage === 4
                  ? 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(0,115,207,0.09) 45%, rgba(248,250,252,0) 72%)'
                  : 'radial-gradient(circle, rgba(0,115,207,0.14) 0%, rgba(0,168,232,0.06) 50%, rgba(248,250,252,0) 72%)',
            }}
          />

          {/* Giant Architectural Watermark Word */}
          <div className="absolute inset-x-0 top-[13%] sm:top-[15%] flex justify-center items-center overflow-hidden">
            <span
              className={`font-display font-extrabold text-[clamp(4.2rem,15vw,13rem)] leading-none tracking-tighter uppercase whitespace-nowrap will-change-transform transition-colors duration-300 ${
                wTrophies > 0.5
                  ? 'text-[#F59E0B]/[0.07]'
                  : 'text-[#0A1120]/[0.045]'
              }`}
              style={{
                transform: `translate3d(0, ${Math.round((0.5 - p) * 45)}px, 0)`,
              }}
            >
              {backdropWord}
            </span>
          </div>
        </div>

        {/* 2. TOP 6-STEP ASSEMBLY STEPPER & SCRUBBER HUD BAR */}
        <div
          className={`relative z-30 backdrop-blur-md border-b px-2 sm:px-6 py-2 shrink-0 transition-colors duration-300 ${
            wTrophies > 0.55
              ? 'bg-[#0A1120]/95 border-white/10 text-white'
              : 'bg-white/90 border-[#0A1120]/10 text-[#0A1120]'
          }`}
        >
          <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-2">
            {/* Horizontally Scrollable 6-Step Pills (01..05 Bike Assembly + 06 Trophies) */}
            <div
              role="group"
              aria-label="Étapes d'assemblage mécanique Velo Reglo"
              className={`flex items-center gap-1 p-1 rounded-xl overflow-x-auto max-w-full ${
                wTrophies > 0.55 ? 'bg-white/10' : 'bg-[#0A1120]/8'
              }`}
            >
              {([1, 2, 3, 4, 5, 6] as const).map((stageNum) => {
                const label =
                  stageNum <= 5
                    ? copy.assemblySteps[stageNum - 1].pillLabel
                    : copy.trophyTransition.pillLabel;
                const isActive = metrics.activeStage === stageNum;
                const isCompleted = metrics.activeStage > stageNum;

                return (
                  <button
                    key={stageNum}
                    type="button"
                    onClick={() => handleStageSelect(stageNum)}
                    className={`px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? stageNum === 6
                          ? 'bg-[#F59E0B] text-[#0A1120] font-bold shadow-xs'
                          : 'bg-[#0A1120] text-white shadow-xs'
                        : isCompleted
                          ? wTrophies > 0.55
                            ? 'text-white bg-white/10 hover:bg-white/15'
                            : 'text-[#0A1120] bg-[#0073CF]/12 hover:bg-[#0073CF]/20'
                          : wTrophies > 0.55
                            ? 'text-slate-200 hover:text-white'
                            : 'text-[#1E293B] hover:text-[#0A1120]'
                    }`}
                  >
                    <span
                      className={`font-mono mr-1 font-bold ${
                        isActive && stageNum === 6
                          ? 'text-[#0A1120]'
                          : isActive
                            ? 'text-[#38BDF8]'
                            : wTrophies > 0.55
                              ? 'text-[#38BDF8]'
                              : 'text-[#005A9E]'
                      }`}
                    >
                      0{stageNum}.
                    </span>
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Interactive Mechanical Scrubber + Desktop Language Switcher */}
            <div className="hidden md:flex items-center gap-2.5 shrink-0">
              <div
                role="group"
                aria-label="Sélecteur de langue"
                className={`inline-flex items-center gap-1 p-1 rounded-lg ${
                  wTrophies > 0.55 ? 'bg-white/10' : 'bg-[#0A1120]/8'
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
                    className={`px-2.5 py-0.5 text-xs font-mono font-bold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      lang === item.code
                        ? 'bg-[#0073CF] text-white'
                        : wTrophies > 0.55
                          ? 'text-slate-200 hover:text-white'
                          : 'text-[#1E293B] hover:text-[#0A1120]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Scrubber Slider */}
              <div className="flex items-center gap-2 bg-white text-[#0A1120] px-2.5 py-1 rounded-lg border border-[#0A1120]/15">
                <Sliders
                  className="w-3.5 h-3.5 text-[#0073CF]"
                  aria-hidden="true"
                />
                <label
                  htmlFor="mechanical-scrubber"
                  className="text-[11px] font-mono font-bold text-[#0A1120] whitespace-nowrap tabular-nums"
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
            </div>
          </div>

          {/* Continuous Thin Progress Line at Bottom of Scrubber Bar */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#0A1120]/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0073CF] via-[#00A8E8] to-[#F59E0B] transition-all duration-75"
              style={{ width: `${Math.max(4, Math.round(p * 100))}%` }}
            />
          </div>
        </div>

        {/* 3. MAIN CONTINUOUS CHOREOGRAPHED STAGE BODY */}
        <div className="relative z-10 flex-1 min-h-0 max-w-[1280px] w-full mx-auto px-3 sm:px-8 py-1.5 sm:py-3 flex flex-col lg:grid lg:grid-cols-12 lg:items-center gap-1.5 lg:gap-6">
          {/* =================================================================
              DESKTOP LEFT COLUMN: Master Mechanic Narrative (Steps 01..06)
             ================================================================= */}
          <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className="hidden lg:flex lg:col-span-4 flex-col justify-center relative min-h-[340px] pr-3"
          >
            {!isTrophyStage ? (
              <div className="space-y-4 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-9 h-9 rounded-full border flex items-center justify-center font-mono text-xs font-bold tabular-nums shrink-0 ${
                      isLeftColumnDark
                        ? 'border-white/30 bg-white/10 text-[#38BDF8]'
                        : 'border-[#0A1120]/25 bg-white text-[#0A1120]'
                    }`}
                  >
                    {activeStepData.stepNumber}
                  </span>
                  <span
                    className={`font-mono text-xs font-bold tracking-wider ${
                      isLeftColumnDark ? 'text-[#38BDF8]' : 'text-[#005A9E]'
                    }`}
                  >
                    {activeStepData.kicker}
                  </span>
                </div>

                <h1
                  className={`font-display font-extrabold text-[clamp(2.1rem,3.3vw,3.3rem)] leading-[1.03] tracking-tight uppercase ${
                    isLeftColumnDark ? 'text-white' : 'text-[#0A1120]'
                  }`}
                >
                  {activeStepData.title}
                </h1>

                <p
                  className={`text-sm xl:text-[15px] leading-relaxed max-w-[40ch] ${
                    isLeftColumnDark ? 'text-slate-200' : 'text-[#334155]'
                  }`}
                >
                  {activeStepData.description}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleStageSelect(
                        (metrics.activeStage + 1) as AssemblyStageIndex
                      )
                    }
                    className={`btn-mechanical group px-5 py-3 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center gap-3 shadow-sm cursor-pointer whitespace-nowrap shrink-0 ${
                      isLeftColumnDark
                        ? 'bg-white text-[#0A1120] hover:text-white'
                        : 'bg-[#0A1120] text-white'
                    }`}
                  >
                    <span className="relative z-10">{activeStepData.cta}</span>
                    <ArrowRight
                      className={`relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1 ${
                        isLeftColumnDark
                          ? 'text-[#0073CF] group-hover:text-white'
                          : 'text-[#38BDF8] group-hover:text-white'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            ) : (
              /* Step 06 Narrative: Bike Morphing into 10 Gold Medals & 3 Gold Cups */
              <div className="space-y-4 transition-all duration-200">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full border border-[#F59E0B]/50 bg-[#F59E0B]/20 text-[#FBBF24] flex items-center justify-center font-mono text-xs font-bold tabular-nums shrink-0">
                    {copy.trophyTransition.number}
                  </span>
                  <span className="font-mono text-xs font-bold tracking-wider text-[#FBBF24]">
                    {copy.trophyTransition.kicker}
                  </span>
                </div>

                <h2 className="font-display font-extrabold text-[clamp(2.2rem,3.5vw,3.4rem)] leading-[1.04] tracking-tight uppercase text-white">
                  {copy.trophyTransition.title}
                </h2>

                <p className="text-sm xl:text-base leading-relaxed max-w-[38ch] text-slate-200">
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
            )}
          </div>

          {/* =================================================================
              CENTER VISUAL CANVAS (Mobile Full-Width Centerpiece + Desktop Cols 5-9)
              Single Consistent Velo Reglo Bike Assembly Rig (Steps 01..05 -> Step 06 Trophies)
             ================================================================= */}
          <div className="relative flex-1 min-h-[210px] sm:min-h-[290px] lg:h-[420px] lg:col-span-5 flex items-center justify-center">
            <BikeAssemblyRig
              progress={p}
              activeStage={metrics.activeStage}
              medalsLabel={copy.trophyTransition.medalsLabel}
              cupsLabel={copy.trophyTransition.cupsLabel}
              lang={lang}
            />
          </div>

          {/* =================================================================
              DESKTOP RIGHT COLUMN: Master Mechanic Operations & Telemetry
             ================================================================= */}
          <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className="hidden lg:flex lg:col-span-3 flex-col justify-center relative min-h-[340px]"
          >
            {!isTrophyStage ? (
              <div className="space-y-3.5">
                <div className="bg-white/95 backdrop-blur-xs p-5 rounded-2xl border border-[#0A1120]/12 shadow-md space-y-3">
                  <div
                    dir="ltr"
                    className="flex items-center justify-between text-xs font-mono font-bold text-[#005A9E]"
                  >
                    <span>{activeStepData.toolCode}</span>
                    <span className="tabular-nums px-2 py-0.5 rounded bg-[#0A1120] text-[#38BDF8]">
                      {activeStepData.torqueSpec}
                    </span>
                  </div>

                  <h2 className="text-sm font-bold text-[#0A1120] uppercase tracking-wide flex items-center gap-1.5">
                    <Wrench
                      className="w-4 h-4 text-[#0073CF] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{activeStepData.rightCalloutTitle}</span>
                  </h2>

                  <p className="text-xs text-[#334155] leading-relaxed">
                    {activeStepData.rightCalloutBody}
                  </p>

                  {/* 3-Point Expert Mechanic Operations Checklist */}
                  <ul className="pt-2 border-t border-[#0A1120]/10 space-y-2">
                    {activeStepData.expertChecklist.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-[#0A1120] font-medium leading-snug"
                      >
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-[#0073CF] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct WhatsApp Booking Card */}
                <div className="bg-[#0A1120] text-white p-4 rounded-2xl border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#38BDF8]">
                    <span>ATELIER VELO REGLO</span>
                    <span>
                      {lang === 'tn'
                        ? 'الخطوة'
                        : lang === 'en'
                          ? 'STEP'
                          : 'ÉTAPE'}{' '}
                      {activeStepData.stepNumber}/05
                    </span>
                  </div>
                  <a
                    href={DIRECT_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] text-[#0A1120] hover:bg-[#20BD5A] text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <MessageCircle
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                      />
                      <span>{copy.nav.bookCta}</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ) : (
              /* Step 06 Palmarès Summary Card on Right */
              <div className="bg-[#131F38] text-white p-5 rounded-2xl border border-[#F59E0B]/45 shadow-xl space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#FBBF24]">
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
                    <div className="text-[11px] text-slate-200 mt-0.5">
                      {copy.champion.stat1Label}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A1120] border border-[#00A8E8]/30">
                    <div
                      dir="ltr"
                      className="font-display font-extrabold text-3xl text-[#38BDF8] tabular-nums"
                    >
                      3× 🏆
                    </div>
                    <div className="text-[11px] text-slate-200 mt-0.5">
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
            )}
          </div>

          {/* =================================================================
              MOBILE & TABLET BOTTOM HUD CARD (< 1024px)
              Crafted for 99% Smartphone Traffic with Full Master Mechanic Detail
             ================================================================= */}
          <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className="lg:hidden relative z-30 w-full shrink-0 pb-1"
          >
            {!isTrophyStage ? (
              <div className="p-3.5 sm:p-4 rounded-2xl border bg-white/95 backdrop-blur-md text-[#0A1120] border-[#0A1120]/12 shadow-lg space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-[#0A1120] text-[#38BDF8] text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                      {activeStepData.stepNumber}
                    </span>
                    <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#005A9E] truncate">
                      {activeStepData.kicker}
                    </span>
                  </div>

                  <span
                    dir="ltr"
                    className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#0A1120] text-[#FBBF24] tabular-nums shrink-0"
                  >
                    {activeStepData.torqueSpec}
                  </span>
                </div>

                <h2 className="font-display font-extrabold text-lg sm:text-xl leading-tight tracking-tight uppercase text-[#0A1120]">
                  {activeStepData.title}
                </h2>

                <p className="text-xs leading-snug text-[#334155] line-clamp-3">
                  {activeStepData.description}
                </p>

                {/* Compact Mobile Master Mechanic Operations Strip */}
                <div className="p-2 rounded-xl bg-[#F1F5F9] border border-[#0A1120]/8 space-y-1">
                  {activeStepData.expertChecklist
                    .slice(0, 2)
                    .map((bullet, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0A1120] truncate"
                      >
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-[#0073CF] shrink-0"
                          aria-hidden="true"
                        />
                        <span className="truncate">{bullet}</span>
                      </div>
                    ))}
                </div>

                <div className="flex items-center gap-2 pt-0.5 min-w-0">
                  <button
                    type="button"
                    onClick={() =>
                      handleStageSelect(
                        (metrics.activeStage + 1) as AssemblyStageIndex
                      )
                    }
                    className="flex-1 min-w-0 py-2.5 px-3 rounded-xl bg-[#0A1120] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="truncate">{activeStepData.cta}</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 text-[#38BDF8] shrink-0"
                      aria-hidden="true"
                    />
                  </button>

                  <a
                    href={DIRECT_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-2.5 rounded-xl text-xs font-bold bg-[#25D366] text-[#0A1120] inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <MessageCircle
                      className="w-3.5 h-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      {lang === 'tn'
                        ? 'خوذ موعد'
                        : lang === 'en'
                          ? 'Book'
                          : 'Rendez-vous'}
                    </span>
                  </a>
                </div>
              </div>
            ) : (
              /* STEP 06 MOBILE HUD: 10 Gold Medals & 3 Gold Cups Introducing Maher Habouria */
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

                <p className="text-xs text-slate-200 leading-snug line-clamp-2">
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

        {/* 4. DESKTOP STEP 05 FLOATING TILTED SPEC CARDS BAR */}
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className="hidden lg:block relative z-20 max-w-[1200px] w-full mx-auto px-8 pb-3 transition-all duration-300"
          style={{
            opacity: wPodiumCards,
            transform: `translate3d(0, ${Math.round((1 - wPodiumCards) * 45)}px, 0)`,
            pointerEvents: wPodiumCards > 0.45 ? 'auto' : 'none',
          }}
        >
          <div className="grid grid-cols-3 gap-6">
            {STAGE_3_CARDS.map((card, idx) => {
              const isFocusedCard = activeCardId === card.id;

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setActiveCardId(card.id)}
                  style={{
                    transform: `rotate(${card.tiltDeg}deg) translateY(${isFocusedCard ? '-6px' : '0px'})`,
                  }}
                  className={`p-3.5 rounded-2xl border text-start transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isFocusedCard
                      ? 'bg-[#0A1120] text-white border-[#38BDF8] shadow-xl'
                      : 'bg-white/95 text-[#0A1120] border-[#0A1120]/15 hover:border-[#0073CF] shadow-md'
                  }`}
                >
                  <div className="space-y-0.5 w-full">
                    <div
                      dir="ltr"
                      className="flex items-center justify-between text-[11px] font-mono font-bold"
                    >
                      <span
                        className={
                          isFocusedCard ? 'text-[#38BDF8]' : 'text-[#005A9E]'
                        }
                      >
                        {card.badgeCode}
                      </span>
                      <span
                        className={
                          isFocusedCard ? 'text-slate-300' : 'text-[#475569]'
                        }
                      >
                        0{idx + 1}/03
                      </span>
                    </div>

                    <div className="font-display font-bold text-lg tracking-wide uppercase">
                      {card.title[lang]}
                    </div>

                    <p
                      className={`text-xs font-mono ${
                        isFocusedCard ? 'text-amber-300' : 'text-[#334155]'
                      }`}
                    >
                      {card.subtitle[lang]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          <span className="sr-only">
            {activeMobileSpecCard.protocol[lang]}
          </span>
        </div>
      </div>
    </section>
  );
};
