import React, { useState } from 'react';
import {
  Check,
  Copy,
  Film,
  Image as ImageIcon,
  RotateCcw,
  Upload,
  X,
} from 'lucide-react';
import { CUSTOM_ASSET_PROMPTS, Language } from '../utils/i18n';
import { CustomAssetOverrides } from './ScrollytellingStage';

interface AssetStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  assetOverrides: CustomAssetOverrides;
  onUpdateAssetOverride: (
    key: keyof CustomAssetOverrides,
    url: string | undefined
  ) => void;
}

export const AssetStudioModal: React.FC<AssetStudioModalProps> = ({
  isOpen,
  onClose,
  lang,
  assetOverrides,
  onUpdateAssetOverride,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyPrompt = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      setCopiedId(id);
    }
  };

  const handleFileChange = (
    key: keyof CustomAssetOverrides,
    file: File | undefined
  ) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    onUpdateAssetOverride(key, objectUrl);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="asset-studio-modal-title"
      dir={lang === 'tn' ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A1120]/80 backdrop-blur-sm overflow-y-auto"
    >
      <div className="bg-white text-[#0A1120] w-full max-w-5xl rounded-2xl border border-[#0A1120]/15 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0A1120] text-white flex items-center justify-between gap-4 shrink-0">
          <div>
            <div className="font-mono text-xs text-[#00A8E8] uppercase">
              DOSSIER DE PRODUCTION ASSETS · VELO REGLO STUDIO
            </div>
            <h2
              id="asset-studio-modal-title"
              className="font-display font-bold text-2xl uppercase tracking-wide"
            >
              {lang === 'tn'
                ? 'ستوديو الصور والفيديوهات بالذكاء الاصطناعي'
                : lang === 'en'
                  ? 'AI Asset Prompts (Transparent PNGs & Scroll Videos)'
                  : 'Prompts IA (PNG Découpés & Vidéos Scroll) + Testeur Live'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le Studio Assets"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-8">
          {/* Reference Video Frame-by-Frame Deconstruction Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#F4F6F9] p-5 rounded-2xl border border-[#0A1120]/10 items-center">
            <div className="lg:col-span-4">
              <video
                src="/assets/aistudio/refernce_516525cc.mp4"
                controls
                muted
                loop
                playsInline
                className="w-full h-48 object-cover rounded-xl bg-[#0A1120]"
              />
            </div>
            <div className="lg:col-span-8 space-y-2.5">
              <div className="text-xs font-mono font-bold text-[#0073CF] uppercase">
                {lang === 'tn'
                  ? 'تحليل الفيديو المرجعي مرحلة بمرحلة'
                  : 'ANALYSE IMAGE PAR IMAGE DE VOTRE VIDÉO DE RÉFÉRENCE'}
              </div>
              <p className="text-xs sm:text-sm text-[#0A1120] leading-relaxed">
                {lang === 'tn' ? (
                  <>
                    نفس الانسيابية متاع فيديو القهوة: <strong>01. الكادر</strong>{' '}
                    على السيبور الأزرق، <strong>02. الميكانيك</strong> مع السبتة
                    المذهّبة والموتور، و<strong>03. الپوديوم</strong> للبشكلة
                    الكاملة.
                  </>
                ) : (
                  <>
                    Nous avons reproduit la structure exacte de la vidéo :{' '}
                    <strong>01. CADRE</strong> (équivalent à <em>GRIND</em> avec
                    la chaîne dorée qui descend du boîtier),{' '}
                    <strong>02. MÉCANIQUE</strong> (équivalent à <em>POUR</em>{' '}
                    avec le fond bicolore Bleu Nuit / Studio Clair et la
                    cassette + moteur E-Bike), et <strong>03. PODIUM</strong>{' '}
                    (équivalent à <em>SIP</em> avec les 3 cartes inclinées
                    autour du vélo complet).
                  </>
                )}
              </p>
            </div>
          </div>

          {/* 6 Asset Prompt & Live Hot-Swap Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CUSTOM_ASSET_PROMPTS.map((item) => {
              const overrideKey = item.slotKey;
              const currentOverride = assetOverrides[overrideKey];
              const isCopied = copiedId === item.id;
              const isVideo = item.format.includes('Video');

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white border border-[#0A1120]/12 flex flex-col justify-between gap-4 shadow-2xs"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono gap-2">
                      <span className="text-[#0073CF] font-semibold inline-flex items-center gap-1.5">
                        {isVideo ? (
                          <Film className="w-3.5 h-3.5" aria-hidden="true" />
                        ) : (
                          <ImageIcon
                            className="w-3.5 h-3.5"
                            aria-hidden="true"
                          />
                        )}
                        {item.stageLabel[lang]}
                      </span>
                      <span dir="ltr" className="text-[#475569] shrink-0">
                        Ratio {item.aspectRatio}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-[#0A1120] uppercase">
                      {item.title[lang]}
                    </h3>

                    <div
                      dir="ltr"
                      className="p-3 rounded-xl bg-[#0A1120] text-slate-200 font-mono text-[11px] leading-relaxed select-all"
                    >
                      {item.prompt}
                    </div>
                  </div>

                  {/* Actions: Copy Prompt + Live Upload Override */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#0A1120]/10">
                    <button
                      type="button"
                      onClick={() => handleCopyPrompt(item.id, item.prompt)}
                      className="px-3.5 py-2 rounded-lg bg-[#0A1120] hover:bg-[#0073CF] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {isCopied ? (
                        <>
                          <Check
                            className="w-3.5 h-3.5 text-[#00A8E8]"
                            aria-hidden="true"
                          />
                          <span>Copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copier le Prompt</span>
                        </>
                      )}
                    </button>

                    <label className="px-3.5 py-2 rounded-lg bg-[#F4F6F9] hover:bg-[#0073CF]/10 border border-[#0A1120]/15 text-[#0A1120] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0">
                      <Upload
                        className="w-3.5 h-3.5 text-[#0073CF]"
                        aria-hidden="true"
                      />
                      <span>
                        {isVideo ? 'Tester une vidéo MP4' : 'Tester un PNG'}
                      </span>
                      <input
                        type="file"
                        accept={isVideo ? 'video/*' : 'image/*'}
                        onChange={(e) =>
                          handleFileChange(overrideKey, e.target.files?.[0])
                        }
                        className="hidden"
                      />
                    </label>

                    {currentOverride && (
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateAssetOverride(overrideKey, undefined)
                        }
                        className="px-2.5 py-2 rounded-lg bg-rose-50 text-rose-700 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Réinitialiser</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
