/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { AssetStudioModal } from './components/AssetStudioModal';
import { ChampionAtelierSection } from './components/ChampionAtelierSection';
import {
  CustomAssetOverrides,
  ScrollytellingStage,
} from './components/ScrollytellingStage';
import { VeloRegloEmblem } from './components/VeloRegloLogo';
import { DIRECT_WHATSAPP_URL, Language, UI_COPY } from './utils/i18n';

export const DEFAULT_STUDIO_ASSETS: CustomAssetOverrides = {
  stage1_frame:
    '/assets/aistudio/Carbon_Fiber_Bike_Frame_on_Blue_Repair_Stand_cc783528.png',
  stage1_falling_chain:
    '/assets/aistudio/Blue_Ceramic-Bearing_Derailleur_with_Gold_Chain_092056e2.png',
  stage2_drivetrain:
    '/assets/aistudio/Exploded_Bosch_E-Bike_Drivetrain_Assembly_dce01453.png',
  stage3_superbike:
    '/assets/aistudio/Midnight_Carbon_XC_Bike_with_Cyan_Accents_2e4954e9.png',
  floating_components:
    '/assets/aistudio/Premium_Bicycle_Workshop_Components_004154dc.png',
};

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [isAssetStudioOpen, setIsAssetStudioOpen] = useState<boolean>(false);
  const [assetOverrides, setAssetOverrides] =
    useState<CustomAssetOverrides>(DEFAULT_STUDIO_ASSETS);

  const copy = UI_COPY[lang];

  const handleUpdateAssetOverride = (
    key: keyof CustomAssetOverrides,
    url: string | undefined
  ) => {
    setAssetOverrides((prev) => ({
      ...prev,
      [key]: url ?? DEFAULT_STUDIO_ASSETS[key],
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] text-[#0A1120]">
      {/* Strict 3-Zone Top Bar Contract (56px on Mobile, 65px on Desktop) */}
      <header className="sticky top-0 z-40 h-[56px] sm:h-[65px] bg-[#F4F6F9]/95 backdrop-blur-md border-b border-[#0A1120]/10 px-3 sm:px-8 flex items-center justify-between gap-2 sm:gap-8">
        {/* Zone 1: Single-line Brand Lockup */}
        <a
          href="#process"
          className="inline-flex items-center gap-2 sm:gap-3 font-display font-extrabold text-xl sm:text-2xl tracking-wider text-[#0A1120] uppercase whitespace-nowrap shrink-0"
        >
          <VeloRegloEmblem className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" />
          <span>VELO REGLO</span>
        </a>

        {/* Zone 2: Concise Single-Line Navigation Links */}
        <nav
          dir={lang === 'tn' ? 'rtl' : 'ltr'}
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#475569]"
        >
          <a
            href="#process"
            className="hover:text-[#0A1120] transition-colors whitespace-nowrap shrink-0"
          >
            {copy.nav.process}
          </a>
          <a
            href="#champion"
            className="hover:text-[#0A1120] transition-colors whitespace-nowrap shrink-0"
          >
            {copy.nav.champion}
          </a>
          <a
            href="#reels"
            className="hover:text-[#0A1120] transition-colors whitespace-nowrap shrink-0"
          >
            {copy.nav.reels}
          </a>
        </nav>

        {/* Zone 3: Mobile Language Switcher + Direct WhatsApp Booking Button */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <div
            role="group"
            aria-label="Langue mobile"
            className="md:hidden inline-flex items-center gap-0.5 p-0.5 bg-[#0A1120]/8 rounded-lg"
          >
            {(
              [
                { code: 'fr', label: 'FR' },
                { code: 'tn', label: 'تونسية' },
                { code: 'en', label: 'EN' },
              ] as const
            ).map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLang(item.code)}
                className={`px-2 py-1 text-[10px] font-mono font-bold uppercase rounded-md transition-colors cursor-pointer ${
                  lang === item.code
                    ? 'bg-[#0073CF] text-white'
                    : 'text-[#0A1120]/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <a
            href={DIRECT_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-mechanical px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#0A1120] text-white text-[11px] sm:text-sm font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MessageCircle
              className="w-3.5 h-3.5 text-[#25D366] relative z-10 shrink-0"
              aria-hidden="true"
            />
            <span className="relative z-10 sm:hidden">
              {lang === 'tn' ? 'خوذ موعد' : copy.nav.bookCta}
            </span>
            <span className="relative z-10 hidden sm:inline">
              {copy.nav.bookCta}
            </span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Connected 3-Stage Scrollytelling Engine (01 Cadre -> 02 Mécanique -> 03 Podium) */}
        <ScrollytellingStage
          lang={lang}
          onChangeLang={setLang}
          onOpenAssetStudio={() => setIsAssetStudioOpen(true)}
          assetOverrides={assetOverrides}
        />

        {/* Maher Habouria Champion Pedigree, Uncropped Workshop Reels & Direct WhatsApp Booking */}
        <ChampionAtelierSection lang={lang} />
      </main>

      {/* Quiet Editorial Footer */}
      <footer
        dir={lang === 'tn' ? 'rtl' : 'ltr'}
        className="bg-[#0A1120] text-slate-400 border-t border-white/10 py-10 px-4 sm:px-8"
      >
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-3">
            <VeloRegloEmblem className="w-8 h-8 shrink-0" />
            <span className="font-display font-bold text-lg text-white tracking-wider uppercase">
              VELO REGLO · MAHER HABOURIA
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {lang === 'tn'
                ? 'نابل / دار شعبان الفهري، تونس'
                : 'Nabeul / Dar Chaâbane, Tunisie'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a href="#process" className="hover:text-white transition-colors">
              {copy.nav.process}
            </a>
            <a href="#champion" className="hover:text-white transition-colors">
              {copy.nav.champion}
            </a>
            <a href="#reels" className="hover:text-white transition-colors">
              {copy.nav.reels}
            </a>
            <a
              href={DIRECT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline font-medium"
            >
              {copy.nav.bookCta}
            </a>
            <button
              type="button"
              onClick={() => setIsAssetStudioOpen(true)}
              className="text-[#00A8E8] hover:underline cursor-pointer"
            >
              {copy.nav.assetStudio}
            </button>
          </div>
        </div>
      </footer>

      {/* Custom Asset Studio & Prompt Kit Modal */}
      <AssetStudioModal
        isOpen={isAssetStudioOpen}
        onClose={() => setIsAssetStudioOpen(false)}
        lang={lang}
        assetOverrides={assetOverrides}
        onUpdateAssetOverride={handleUpdateAssetOverride}
      />
    </div>
  );
}
