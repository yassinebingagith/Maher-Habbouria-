import React, { useId, useState } from 'react';
import {
  Award,
  CheckCircle2,
  ExternalLink,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import {
  BikeCategory,
  DIRECT_WHATSAPP_URL,
  Language,
  UI_COPY,
  WORKSHOP_REELS,
  WorkshopReelItem,
} from '../utils/i18n';

interface ClippedSheetImageProps {
  src: string;
  crop: string;
  alt: string;
  className?: string;
}

/**
 * Renders an exact sub-rectangle `crop="x y w h"` from a 1920x1080 sheet
 * with a hard SVG <clipPath> so neighboring grid rows can never bleed in,
 * and `preserveAspectRatio="xMidYMid meet"` so 100% of the picture is in frame.
 */
const ClippedSheetImage: React.FC<ClippedSheetImageProps> = ({
  src,
  crop,
  alt,
  className = 'w-full h-full block',
}) => {
  const rawId = useId();
  const clipId = `sheet-clip-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [cx, cy, cw, ch] = crop.split(' ').map(Number);

  return (
    <svg
      viewBox={crop}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      role="img"
      aria-label={alt}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={cx} y={cy} width={cw} height={ch} />
        </clipPath>
      </defs>
      <image
        href={src}
        width="1920"
        height="1080"
        clipPath={`url(#${clipId})`}
      />
    </svg>
  );
};

interface ChampionAtelierSectionProps {
  lang: Language;
}

export const ChampionAtelierSection: React.FC<ChampionAtelierSectionProps> = ({
  lang,
}) => {
  const copy = UI_COPY[lang];
  const [activeFilter, setActiveFilter] = useState<'all' | BikeCategory>('all');
  const [inspectedReel, setInspectedReel] = useState<WorkshopReelItem>(
    WORKSHOP_REELS[0]
  );

  const filteredReels =
    activeFilter === 'all'
      ? WORKSHOP_REELS
      : WORKSHOP_REELS.filter((r) => r.category === activeFilter);

  return (
    <div
      dir={lang === 'tn' ? 'rtl' : 'ltr'}
      className="w-full bg-[#0A1120] text-white"
    >
      {/* Seamless Golden Vertical Bridge connecting the 10 Gold Medals & 3 Gold Cups into Maher Habouria's Champion Section */}
      <div
        aria-hidden="true"
        className="w-full flex flex-col items-center justify-center pt-2 pb-1 overflow-hidden pointer-events-none"
      >
        <div className="w-0.5 h-12 bg-gradient-to-b from-[#F59E0B] via-[#00A8E8] to-transparent rounded-full opacity-80" />
      </div>

      {/* =====================================================================
          MAHER HABOURIA — CHAMPION PEDIGREE & PARK TOOL ATELIER BENTO
         ===================================================================== */}
      <section
        id="champion"
        aria-label={copy.nav.champion}
        className="max-w-[1280px] mx-auto px-4 sm:px-8 pt-6 pb-16 lg:pt-10 lg:pb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left 7 Columns: Editorial Biography & Quantified Championship Proof */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00A8E8] uppercase tracking-wider">
                <span>{copy.champion.kicker}</span>
              </div>

              <h2 className="font-display font-extrabold text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.06] tracking-tight text-white uppercase">
                {copy.champion.headline}
              </h2>

              <p className="text-slate-300 text-base leading-relaxed max-w-[64ch]">
                {copy.champion.bio}
              </p>
            </div>

            {/* 4-Column Quantitative Proof Strip (Tabular Numerals, Unboxed Clean Dividers) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/12">
              <div className="space-y-1">
                <div
                  dir="ltr"
                  className="font-display font-extrabold text-4xl text-[#F59E0B] tabular-nums inline-block"
                >
                  {copy.champion.stat1Value}
                </div>
                <div className="text-xs text-slate-300 leading-snug">
                  {copy.champion.stat1Label}
                </div>
              </div>

              <div className="space-y-1">
                <div
                  dir="ltr"
                  className="font-display font-extrabold text-4xl text-[#00A8E8] tabular-nums inline-block"
                >
                  {copy.champion.stat2Value}
                </div>
                <div className="text-xs text-slate-300 leading-snug">
                  {copy.champion.stat2Label}
                </div>
              </div>

              <div className="space-y-1">
                <div
                  dir="ltr"
                  className="font-display font-extrabold text-4xl text-white tabular-nums inline-block"
                >
                  {copy.champion.stat3Value}
                </div>
                <div className="text-xs text-slate-300 leading-snug">
                  {copy.champion.stat3Label}
                </div>
              </div>

              <div className="space-y-1">
                <div
                  dir="ltr"
                  className="font-display font-extrabold text-4xl text-[#0073CF] tabular-nums inline-block"
                >
                  {copy.champion.stat4Value}
                </div>
                <div className="text-xs text-slate-300 leading-snug">
                  {copy.champion.stat4Label}
                </div>
              </div>
            </div>

            {/* Regional & Workshop Location Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
              <span className="inline-flex items-center gap-1.5 text-white font-medium">
                <MapPin className="w-4 h-4 text-[#00A8E8]" aria-hidden="true" />
                {copy.champion.locationLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#F59E0B]" aria-hidden="true" />
                XCO Olympic & Elite Road
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck
                  className="w-4 h-4 text-[#0073CF]"
                  aria-hidden="true"
                />
                Park Tool Master Wall
              </span>
            </div>
          </div>

          {/* Right 5 Columns: Real Workshop & Champion Photography Card (100% Uncropped Full Frame) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#131F38] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
            {/* Full 1246x415 Cover Photo Container — 100% in frame with hard clipPath */}
            <div className="relative w-full aspect-[1246/415] overflow-hidden bg-[#0A1120]">
              <ClippedSheetImage
                src="/assets/aistudio/image_2822265f.png"
                crop="330 143 1246 415"
                alt="Maher Habouria devant son mur d'outils Park Tool chez Velo Reglo Nabeul"
              />
            </div>

            {/* Founder Caption Bar Below Uncropped Cover Photo */}
            <div className="px-5 py-3.5 bg-[#0E172A] border-t border-white/10 flex items-center justify-between gap-4">
              <div>
                <div className="font-mono text-[11px] text-[#00A8E8] uppercase">
                  {copy.champion.founderRole}
                </div>
                <div className="font-display font-bold text-xl sm:text-2xl text-white tracking-wide uppercase">
                  MAHER HABOURIA
                </div>
              </div>
              <div className="font-mono text-xs text-[#F59E0B] tabular-nums shrink-0">
                {copy.champion.sinceLabel}
              </div>
            </div>

            {/* Athlete Profile & Quote Strip */}
            <div className="p-5 flex items-center gap-4 border-t border-white/10 bg-[#131F38]">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/15 bg-[#0A1120]">
                <ClippedSheetImage
                  src="/assets/aistudio/image_cb91b2cb.png"
                  crop="374 270 112 112"
                  alt="Profil athlète Maher Habouria 10x Champion"
                />
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-white leading-relaxed">
                  {copy.champion.quote}
                </div>
                <div className="text-slate-400 font-mono text-[11px]">
                  {copy.champion.quoteSub}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          WORKSHOP REELS & REAL BUILDS SHOWCASE (#VELO_REGLO_BIEN_REGLO)
          100% Uncropped Vertical Reels (Exact 154x246 Native Aspect Ratio + Hard SVG Clip)
         ===================================================================== */}
      <section
        id="reels"
        aria-label={copy.nav.reels}
        className="bg-[#F4F6F9] text-[#0A1120] py-16 lg:py-20 border-t border-[#0A1120]/10"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-10">
          {/* Header & Interactive Filter Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="text-xs font-mono font-semibold text-[#0073CF] uppercase tracking-wider">
                {copy.reels.kicker}
              </div>
              <h2 className="font-display font-extrabold text-[clamp(2rem,3.5vw,3.25rem)] leading-tight tracking-tight text-[#0A1120] uppercase">
                {copy.reels.headline}
              </h2>
            </div>

            {/* Interactive Single-Row Segmented Filter Bar */}
            <div
              role="group"
              aria-label="Filtrer les réalisations de l'atelier"
              className="inline-flex items-center gap-1 p-1 bg-[#0A1120]/8 rounded-xl overflow-x-auto max-w-full"
            >
              {(
                [
                  { id: 'all', label: copy.reels.filterAll },
                  { id: 'road', label: copy.reels.filterRoad },
                  { id: 'mtb', label: copy.reels.filterMtb },
                  { id: 'ebike', label: copy.reels.filterEbike },
                  { id: 'gravel', label: copy.reels.filterGravel },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-[#0A1120] text-white shadow-2xs'
                      : 'text-[#475569] hover:text-[#0A1120]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Asymmetric Bento Grid: Left Uncropped Reel Cards + Right Live Inspection Sheet */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredReels.map((reel) => {
                const isSelected = inspectedReel.id === reel.id;
                const handleSelectReel = () => {
                  setInspectedReel(reel);
                  if (window.innerWidth < 1024) {
                    const panel = document.getElementById(
                      'reel-inspection-panel'
                    );
                    if (panel) {
                      panel.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                      });
                    }
                  }
                };
                return (
                  <article
                    key={reel.id}
                    onClick={handleSelectReel}
                    className={`group rounded-2xl border overflow-hidden transition-all cursor-pointer p-3.5 flex flex-row gap-4 items-center ${
                      isSelected
                        ? 'bg-white border-[#0073CF] shadow-md ring-2 ring-[#0073CF]/20'
                        : 'bg-white border-[#0A1120]/10 hover:border-[#0A1120]/30'
                    }`}
                  >
                    {/* Exact 154:246 Uncropped Vertical Reel Frame — Self-centered so aspect ratio is never stretched! */}
                    <div className="relative w-[124px] sm:w-[136px] aspect-[154/246] shrink-0 self-center rounded-xl overflow-hidden bg-[#0A1120] border border-[#0A1120]/10 shadow-xs">
                      <ClippedSheetImage
                        src={reel.imageSrc}
                        crop={reel.imageCropPosition}
                        alt={reel.title[lang]}
                        className="w-full h-full block group-hover:scale-[1.03] transition-transform duration-300"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-11 bg-gradient-to-t from-[#0A1120]/90 via-[#0A1120]/35 to-transparent pointer-events-none" />
                      <div
                        dir="ltr"
                        className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-white"
                      >
                        <span className="font-bold truncate">{reel.brand}</span>
                        <span className="tabular-nums text-[#00A8E8] shrink-0">
                          {reel.views}
                        </span>
                      </div>
                    </div>

                    <div className="py-1 flex-1 min-w-0 flex flex-col justify-between self-stretch">
                      <div className="space-y-1.5">
                        <div
                          dir="ltr"
                          className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-[#475569]"
                        >
                          <span className="truncate">{reel.drivetrain}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums text-[#0073CF] font-semibold">
                            {reel.torque}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-lg sm:text-xl leading-tight text-[#0A1120] uppercase tracking-wide">
                          {reel.title[lang]}
                        </h3>
                        <p className="text-xs text-[#475569] leading-relaxed">
                          {reel.summary[lang]}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectReel();
                        }}
                        className="pt-2 text-xs font-semibold text-[#0073CF] group-hover:text-[#0A1120] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Wrench className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{copy.reels.inspectBtn}</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Right 5 Columns: Active Build Telemetry & Direct WhatsApp Booking */}
            <div
              id="reel-inspection-panel"
              className="lg:col-span-5 bg-[#0A1120] text-white rounded-2xl p-6 sm:p-7 border border-[#0A1120] space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 gap-3">
                <div>
                  <div className="font-mono text-xs text-[#00A8E8] uppercase">
                    {copy.reels.reportTitle}
                  </div>
                  <h3 className="font-display font-bold text-2xl uppercase tracking-wide mt-0.5">
                    {inspectedReel.brand} — {inspectedReel.model}
                  </h3>
                </div>
                <span
                  dir="ltr"
                  className="font-mono text-xs text-[#F59E0B] tabular-nums shrink-0"
                >
                  {inspectedReel.torque}
                </span>
              </div>

              {/* Side-by-Side Uncropped Full-Frame Reel + Operations Sheet */}
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <div className="relative w-[154px] sm:w-[162px] aspect-[154/246] shrink-0 self-center rounded-xl overflow-hidden border border-white/15 bg-[#131F38] shadow-lg">
                  <ClippedSheetImage
                    src={inspectedReel.imageSrc}
                    crop={inspectedReel.imageCropPosition}
                    alt={`Inspection détaillée ${inspectedReel.brand}`}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0A1120]/90 to-transparent pointer-events-none" />
                  <div
                    dir="ltr"
                    className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-slate-200"
                  >
                    <span>{inspectedReel.brand}</span>
                    <span className="text-[#00A8E8]">
                      {inspectedReel.views} {copy.reels.viewsUnit}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between space-y-4 w-full">
                  <div className="space-y-2.5">
                    <div className="text-xs font-mono text-[#00A8E8] uppercase">
                      {copy.reels.operationsHeading}
                    </div>
                    <ul className="space-y-2.5">
                      {inspectedReel.operations[lang].map((op, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-snug"
                        >
                          <CheckCircle2
                            className="w-4 h-4 text-[#00A8E8] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{op}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-slate-400">
                    {copy.reels.archiveLabel}
                  </div>
                </div>
              </div>

              <a
                href={DIRECT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-mechanical w-full py-3.5 px-4 rounded-xl bg-[#25D366] text-[#0A1120] hover:text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0 shadow-md"
              >
                <MessageCircle
                  className="w-4 h-4 relative z-10"
                  aria-hidden="true"
                />
                <span className="relative z-10">
                  {copy.reels.whatsappDirectBtn}
                </span>
                <ExternalLink
                  className="w-3.5 h-3.5 relative z-10 opacity-75"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          DIRECT WHATSAPP BOOKING FINALE (NO PRE-EDIT / NO DIAGNOSIS FORM)
         ===================================================================== */}
      <section
        id="booking"
        aria-label={copy.directBooking.whatsappBtn}
        className="bg-[#0A1120] text-white py-16 lg:py-20 border-t border-white/10"
      >
        <div className="max-w-[1080px] mx-auto px-4 sm:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#131F38] via-[#0F1B33] to-[#0A1120] border border-[#00A8E8]/25 p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-[60ch]">
              <div className="text-xs font-mono font-semibold text-[#00A8E8] uppercase tracking-wider">
                {copy.directBooking.kicker}
              </div>
              <h2 className="font-display font-extrabold text-[clamp(1.85rem,3.4vw,3rem)] leading-tight uppercase text-white">
                {copy.directBooking.headline}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {copy.directBooking.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-slate-300">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/8 border border-white/10">
                  <MapPin
                    className="w-3.5 h-3.5 text-[#00A8E8]"
                    aria-hidden="true"
                  />
                  {copy.directBooking.locationBadge}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/8 border border-white/10">
                  <ShieldCheck
                    className="w-3.5 h-3.5 text-[#25D366]"
                    aria-hidden="true"
                  />
                  {copy.directBooking.hoursBadge}
                </span>
              </div>
            </div>

            <div className="w-full lg:w-auto shrink-0">
              <a
                href={DIRECT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-mechanical w-full lg:w-auto px-7 py-4 rounded-2xl bg-[#25D366] text-[#0A1120] hover:text-white font-bold text-sm sm:text-base inline-flex items-center justify-center gap-3 shadow-xl cursor-pointer whitespace-nowrap"
              >
                <MessageCircle
                  className="w-5 h-5 relative z-10"
                  aria-hidden="true"
                />
                <span className="relative z-10">
                  {copy.directBooking.whatsappBtn}
                </span>
                <ExternalLink
                  className="w-4 h-4 relative z-10 opacity-80"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
