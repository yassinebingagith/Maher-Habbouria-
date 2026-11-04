/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { ChampionAtelierSection } from './components/ChampionAtelierSection';
import { ScrollytellingStage } from './components/ScrollytellingStage';
import { VeloRegloEmblem } from './components/VeloRegloLogo';
import { DIRECT_WHATSAPP_URL, Language, UI_COPY } from './utils/i18n';

function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const param = new URLSearchParams(window.location.search).get('lang');
    if (param === 'fr' || param === 'tn' || param === 'en') {
      return param;
    }
  }
  return 'fr';
}

export default function App() {
  const [lang, setLang] = useState<Language>(getInitialLanguage);
  const copy = UI_COPY[lang];

  useEffect(() => {
    document.documentElement.lang = lang === 'tn' ? 'ar-TN' : lang;
  }, [lang]);

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
          className="hidden md:flex items-center gap-7 text-sm font-bold text-[#334155]"
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
            className="md:hidden inline-flex items-center gap-0.5 p-0.5 bg-[#0A1120]/10 rounded-lg"
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
                    : 'text-[#0A1120]'
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
        {/* Connected 6-Step Progressive Bike Assembly & Trophy Transformation Engine */}
        <ScrollytellingStage lang={lang} onChangeLang={setLang} />

        {/* Maher Habouria Champion Pedigree, Uncropped Workshop Reels & Direct WhatsApp Booking */}
        <ChampionAtelierSection lang={lang} />
      </main>

      {/* Quiet Editorial Footer */}
      <footer
        dir={lang === 'tn' ? 'rtl' : 'ltr'}
        className="bg-[#0A1120] text-slate-300 border-t border-white/15 py-10 px-4 sm:px-8"
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
              className="text-[#25D366] hover:underline font-bold"
            >
              {copy.nav.bookCta}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
