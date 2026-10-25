import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Download, 
  Copy, 
  Check, 
  Key, 
  Terminal, 
  AlertCircle, 
  FileCode, 
  Globe, 
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { GITHUB_KEYSTORE_SOLUTION, PLAY_STORE_METADATA } from '../utils/androidReleaseData';
import { generateAndroidStudioProjectZip } from '../utils/androidProjectZip';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface ReleaseCenterProps {
  language: Language;
}

export const ReleaseCenter: React.FC<ReleaseCenterProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleCopy = async (text: string, index: number) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleDownloadProjectZip = async () => {
    try {
      setIsDownloading(true);
      const blob = await generateAndroidStudioProjectZip();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'UbalKitchen-AndroidStudio-Project.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to generate zip:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Top Banner with Direct Reassurance */}
      <div className="bg-gradient-to-r from-[#1B4332] via-[#235842] to-[#163829] rounded-3xl p-6 sm:p-9 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 text-xs font-bold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>{language === 'hi' ? 'गिटहब रिलीज़ और की-प्रोटेक्शन' : 'Play Store & GitHub Keystore Master'}</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {language === 'hi' 
              ? 'GitHub से बार-बार बिल्ड करने पर Key कभी नहीं बदलेगी!' 
              : 'Permanent GitHub Actions Keystore & Release Suite'}
          </h1>
          
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            {language === 'hi'
              ? 'आपकी चिंता बिल्कुल सही थी: GitHub Actions हर बिल्ड पर नया कंप्यूटर इस्तेमाल करता है। इसलिए अगर Keystore को Secrets में बेस64 बनाकर न डाला जाए, तो हर बार की बदल जाती है और Play Store अपडेट रिजेक्ट कर देता है। नीचे इसका 100% पक्का समाधान दिया गया है।'
              : 'Your concern is 100% valid: GitHub runners are ephemeral. If your Keystore is not decoded from encrypted GitHub Secrets on every run, Gradle uses a different key, causing Play Store to reject updates with "Signed with wrong key". Follow this solution so your key remains permanent forever.'}
          </p>

          {/* Download Full Android Studio Project Action */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadProjectZip}
              disabled={isDownloading}
              className="px-6 py-3 rounded-2xl bg-[#E76F51] hover:bg-[#D65F42] text-white font-bold text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>
                {isDownloading
                  ? (language === 'hi' ? 'ज़िप फ़ाइल बन रही है...' : 'Generating Project...')
                  : (language === 'hi' ? 'Android Studio प्रोजेक्ट डाउनलोड करें (.ZIP)' : 'Download Android Studio Project (.ZIP)')}
              </span>
            </button>

            {downloadSuccess && (
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{language === 'hi' ? 'डाउनलोड शुरू हो गया!' : 'Download started!'}</span>
              </span>
            )}
          </div>
        </div>

        {/* Decorative corner icon */}
        <ShieldCheck className="w-72 h-72 text-white/5 absolute -bottom-16 -right-12 pointer-events-none" />
      </div>

      {/* 6 Step Interactive Solution Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#1B4332]" />
            <span>{language === 'hi' ? 'स्टेप-बाय-स्टेप समाधान' : 'Step-by-Step Signing Guide'}</span>
          </h2>
          <span className="text-xs text-stone-500 font-medium">
            {language === 'hi' ? 'केवल 1 बार सेटअप करें' : 'One-time setup'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {GITHUB_KEYSTORE_SOLUTION.map((sec, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] shadow-xs space-y-3 relative group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-extrabold text-base sm:text-lg text-[#1B4332]">
                    {language === 'hi' ? sec.titleHi : sec.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {language === 'hi' ? sec.descriptionHi : sec.descriptionEn}
                  </p>
                </div>
              </div>

              {sec.codeSnippet && (
                <div className="mt-3 relative rounded-2xl bg-stone-900 text-stone-100 p-4 font-mono text-xs overflow-x-auto shadow-inner">
                  <button
                    onClick={() => handleCopy(sec.codeSnippet!, idx)}
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 text-[11px] font-sans font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <pre className="pr-16 leading-relaxed whitespace-pre font-mono">
                    {sec.codeSnippet}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Play Store Listing Copy Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <Globe className="w-3.5 h-3.5 text-amber-800" />
            <span>{language === 'hi' ? 'प्ले स्टोर लिस्टिंग विवरण' : 'Google Play Store Listing Details'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            {language === 'hi' ? 'प्ले स्टोर पर अपलोड करने के लिए टेक्स्ट' : 'Ready-to-Paste Store Listing Content'}
          </h2>
          <p className="text-xs text-stone-500">
            {language === 'hi' ? 'इसे सीधे Google Play Console में कॉपी करें' : 'Copy and paste directly into Google Play Console'}
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          {/* App Title */}
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E1D5] flex items-center justify-between gap-3">
            <div>
              <span className="text-stone-400 font-semibold uppercase text-[10px] block">App Title (50 chars)</span>
              <span className="font-bold text-stone-800 text-base">{PLAY_STORE_METADATA.appTitle}</span>
            </div>
            <button
              onClick={() => handleCopy(PLAY_STORE_METADATA.appTitle, 99)}
              className="px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold text-xs flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>

          {/* Short Description */}
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E1D5] flex items-start justify-between gap-3">
            <div className="space-y-1 flex-1">
              <span className="text-stone-400 font-semibold uppercase text-[10px] block">Short Description (80 chars)</span>
              <p className="font-semibold text-stone-800">
                {language === 'hi' ? PLAY_STORE_METADATA.shortDescriptionHi : PLAY_STORE_METADATA.shortDescriptionEn}
              </p>
            </div>
            <button
              onClick={() => handleCopy(language === 'hi' ? PLAY_STORE_METADATA.shortDescriptionHi : PLAY_STORE_METADATA.shortDescriptionEn, 100)}
              className="px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold text-xs flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>

          {/* Full Description */}
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8E1D5] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-stone-400 font-semibold uppercase text-[10px]">Full Description</span>
              <button
                onClick={() => handleCopy(language === 'hi' ? PLAY_STORE_METADATA.fullDescriptionHi : PLAY_STORE_METADATA.fullDescriptionEn, 101)}
                className="px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold text-xs flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Full Text</span>
              </button>
            </div>
            <div className="p-3 bg-white rounded-xl border border-stone-200 text-stone-700 font-mono text-xs whitespace-pre-wrap max-h-48 overflow-y-auto">
              {language === 'hi' ? PLAY_STORE_METADATA.fullDescriptionHi : PLAY_STORE_METADATA.fullDescriptionEn}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
