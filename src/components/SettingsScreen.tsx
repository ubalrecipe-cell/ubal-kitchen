import React, { useState } from 'react';
import { 
  Globe, 
  Utensils, 
  Users, 
  ShieldCheck, 
  Heart, 
  Info, 
  Mail, 
  ChefHat, 
  Download, 
  Check, 
  ChevronRight, 
  Code2, 
  ExternalLink,
  Lock,
  Unlock
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/i18n';
import { generateAndroidStudioProjectZip } from '../utils/androidProjectZip';
import { GITHUB_KEYSTORE_SOLUTION } from '../utils/androidReleaseData';

interface SettingsScreenProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  favoritesCount: number;
  onGoToFavorites: () => void;
  onOpenCreatorStudio: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  language,
  setLanguage,
  favoritesCount,
  onGoToFavorites,
  onOpenCreatorStudio,
}) => {
  const t = TRANSLATIONS[language];
  const [defaultDiet, setDefaultDiet] = useState<string>(() => {
    return localStorage.getItem('ubal_kitchen_diet') || 'All';
  });
  const [defaultServings, setDefaultServings] = useState<number>(() => {
    return Number(localStorage.getItem('ubal_kitchen_default_servings')) || 2;
  });
  const [devTapCount, setDevTapCount] = useState(0);
  const [developerModeUnlocked, setDeveloperModeUnlocked] = useState(false);
  const [showDeveloperPack, setShowDeveloperPack] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDietChange = (diet: string) => {
    setDefaultDiet(diet);
    localStorage.setItem('ubal_kitchen_diet', diet);
  };

  const handleServingsChange = (servings: number) => {
    setDefaultServings(servings);
    localStorage.setItem('ubal_kitchen_default_servings', String(servings));
  };

  const handleDownloadZip = async () => {
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
    } catch (e) {
      console.error(e);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleVersionClick = () => {
    const next = devTapCount + 1;
    setDevTapCount(next);
    if (next >= 3) {
      setDeveloperModeUnlocked(true);
      setShowDeveloperPack(true);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-16">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] tracking-tight">
          {t.settings}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-medium">
          {language === 'hi' ? 'अपनी भाषा और कुकिंग प्राथमिकताएं चुनें' : 'Manage your language and cooking preferences'}
        </p>
      </div>

      {/* Language Section */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E1D5] shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] text-[#1B4332] flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#E76F51]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-stone-900">{t.language}</h2>
            <p className="text-xs text-stone-500">{language === 'hi' ? 'ऐप की मुख्य भाषा चुनें' : 'Select app interface language'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => setLanguage('hi')}
            className={`p-3.5 rounded-2xl border text-left font-bold text-sm flex items-center justify-between cursor-pointer transition-all ${
              language === 'hi'
                ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                : 'bg-[#FAF7F2] text-stone-700 border-[#E8E1D5] hover:bg-white'
            }`}
          >
            <div>
              <span className="block font-bold">हिंदी</span>
              <span className="text-[11px] font-normal opacity-80">Hindi</span>
            </div>
            {language === 'hi' && <Check className="w-4 h-4 stroke-[3]" />}
          </button>

          <button
            onClick={() => setLanguage('en')}
            className={`p-3.5 rounded-2xl border text-left font-bold text-sm flex items-center justify-between cursor-pointer transition-all ${
              language === 'en'
                ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                : 'bg-[#FAF7F2] text-stone-700 border-[#E8E1D5] hover:bg-white'
            }`}
          >
            <div>
              <span className="block font-bold">English</span>
              <span className="text-[11px] font-normal opacity-80">अंग्रेज़ी</span>
            </div>
            {language === 'en' && <Check className="w-4 h-4 stroke-[3]" />}
          </button>
        </div>
      </div>

      {/* Dietary Preference & Default Servings */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E1D5] shadow-xs space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] text-[#1B4332] flex items-center justify-center">
            <Utensils className="w-5 h-5 text-[#1B4332]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-stone-900">{language === 'hi' ? 'आहार प्राथमिकता' : 'Dietary Preference'}</h2>
            <p className="text-xs text-stone-500">{language === 'hi' ? 'डिफ़ॉल्ट रेसिपी फ़िल्टर' : 'Filter dishes by dietary choice'}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {['All', 'Veg', 'Non-Veg', 'Egg', 'Vegan'].map((diet) => (
            <button
              key={diet}
              onClick={() => handleDietChange(diet)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                defaultDiet === diet
                  ? 'bg-[#1B4332] text-white'
                  : 'bg-[#FAF7F2] text-stone-700 hover:bg-stone-200/60 border border-[#E8E1D5]'
              }`}
            >
              {diet === 'All' ? t.all : 
               diet === 'Veg' ? t.veg : 
               diet === 'Non-Veg' ? t.nonVeg : 
               diet === 'Egg' ? t.egg : t.vegan}
            </button>
          ))}
        </div>

        <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-stone-500" />
            <span className="text-xs sm:text-sm font-semibold text-stone-800">
              {language === 'hi' ? 'डिफ़ॉल्ट सर्विंग्स (कितने लोगों के लिए)' : 'Default Servings'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 4, 6].map((num) => (
              <button
                key={num}
                onClick={() => handleServingsChange(num)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  defaultServings === num
                    ? 'bg-[#1B4332] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-stone-700 border border-[#E8E1D5] hover:bg-stone-100'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* About Ubal Kitchen & Privacy */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E1D5] shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] text-[#1B4332] flex items-center justify-center">
            <ChefHat className="w-5 h-5 text-[#E76F51]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-stone-900">{t.aboutUbalKitchen}</h2>
            <button 
              onClick={handleVersionClick}
              className="text-xs text-stone-500 hover:text-stone-800 transition-colors text-left cursor-pointer"
              title="Version Info"
            >
              {t.appVersion} {developerModeUnlocked && <span className="text-emerald-600 font-bold ml-1">(Dev Mode Active)</span>}
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          {t.aboutText}
        </p>

        <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/60 text-xs text-emerald-900 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-emerald-950 font-bold mb-0.5">{t.privacyPolicy}</strong>
            <p className="text-emerald-800 leading-relaxed">{t.privacyText}</p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
          <span>Feedback: ubalrecipe@gmail.com</span>
          <span className="font-semibold text-stone-700">Made with ❤️ for Indian Kitchens</span>
        </div>
      </div>

      {/* Secret Personal Recipe Creator Portal (Discreet Chef Login) */}
      <div className="pt-2 flex flex-col items-center justify-center gap-3">
        <button
          onClick={onOpenCreatorStudio}
          className="text-xs text-stone-500 hover:text-[#1B4332] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer py-1 px-3 rounded-lg hover:bg-stone-200/50"
        >
          <Lock className="w-3.5 h-3.5 text-stone-400" />
          <span>{language === 'hi' ? 'शेफ और एडमिन स्टूडियो (पासकोड रिक्वायर्ड)' : 'Chef & Admin Studio Login'}</span>
        </button>
      </div>

      {/* Developer Android Studio Pack (Only shown when Developer Mode is Unlocked or showDeveloperPack is true) */}
      {developerModeUnlocked && (
        <div className="bg-white rounded-3xl border border-[#E8E1D5] shadow-xs overflow-hidden transition-all">
          <button
            onClick={() => setShowDeveloperPack(!showDeveloperPack)}
            className="w-full p-5 flex items-center justify-between text-left hover:bg-stone-50/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-[#1B4332]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-800">
                  {language === 'hi' ? 'डेवलपर टूल्स और गिटहब रिलीज़ सेटिंग्स' : 'Developer & GitHub Build Setup'}
                </h3>
                <p className="text-[11px] text-stone-400">
                  {language === 'hi' ? 'Android Studio प्रोजेक्ट डाउनलोड और CI/CD की-गाइड' : 'Keystore secrets & Android project download'}
                </p>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 text-stone-400 transition-transform ${showDeveloperPack ? 'rotate-90' : ''}`} />
          </button>

          {showDeveloperPack && (
            <div className="p-5 pt-0 border-t border-stone-100 space-y-4 bg-stone-50/40">
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'hi' 
                  ? 'यहाँ से आप पूरा Android Studio प्रोजेक्ट (.zip) डाउनलोड कर सकते हैं और GitHub Secrets सेटअप देख सकते हैं।'
                  : 'Download the complete Android Studio native project files or view the signing key workflow.'}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleDownloadZip}
                  disabled={isDownloading}
                  className="px-4 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#235842] text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{isDownloading ? 'Generating ZIP...' : 'Download Android Studio Project (.ZIP)'}</span>
                </button>

                {downloadSuccess && (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Downloaded!</span>
                  </span>
                )}
              </div>

              <div className="p-3 bg-stone-900 text-stone-200 rounded-xl font-mono text-[11px] space-y-1">
                <span className="text-stone-400 block font-sans font-semibold">GitHub Secrets to add in your repo:</span>
                <div>1. RELEASE_KEYSTORE_BASE64</div>
                <div>2. KEYSTORE_PASSWORD</div>
                <div>3. KEY_ALIAS (ubalkitchen)</div>
                <div>4. KEY_PASSWORD</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
