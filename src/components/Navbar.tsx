import React from 'react';
import { ChefHat, Smartphone, Globe, Utensils, Heart, BookOpen, Settings, ShoppingBag } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface NavbarProps {
  currentTab: 'home' | 'pantry' | 'recipes' | 'shopping' | 'favorites' | 'settings';
  setCurrentTab: (tab: 'home' | 'pantry' | 'recipes' | 'shopping' | 'favorites' | 'settings') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  favoritesCount: number;
  shoppingCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  isMobileFrame,
  setIsMobileFrame,
  favoritesCount,
  shoppingCount = 0,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E1D5] px-4 sm:px-6 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Brand wordmark with pot/steam flame logo */}
        <button
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-2.5 text-left text-inherit cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-[#F3E9D2] flex items-center justify-center shadow-xs group-hover:bg-[#235842] transition-colors">
            <ChefHat className="w-5 h-5 text-[#E76F51]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#1B4332]">
                {language === 'hi' ? 'उबाल किचन' : 'Ubal Kitchen'}
              </span>
            </div>
            <p className="text-[11px] font-medium text-stone-500 hidden sm:block truncate max-w-[220px]">
              {t.tagline}
            </p>
          </div>
        </button>

        {/* Zone 2: Clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'home'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            {language === 'hi' ? 'होम' : 'Home'}
          </button>

          <button
            onClick={() => setCurrentTab('pantry')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'pantry'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            <Utensils className="w-4 h-4 text-[#E76F51]" />
            <span>{t.pantryFinder}</span>
          </button>

          <button
            onClick={() => setCurrentTab('recipes')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'recipes'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-stone-500" />
            <span>{t.allRecipes}</span>
          </button>

          <button
            onClick={() => setCurrentTab('shopping')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'shopping'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
            <span>{t.shoppingList}</span>
            {shoppingCount > 0 && (
              <span className="text-xs px-1.5 py-0.2 bg-[#1B4332] text-white rounded-full font-bold">
                {shoppingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('favorites')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'favorites'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'text-[#E76F51] fill-[#E76F51]' : 'text-stone-500'}`} />
            <span>{t.favorites}</span>
            {favoritesCount > 0 && (
              <span className="text-xs px-1.5 py-0.2 bg-[#E76F51] text-white rounded-full font-bold">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('settings')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentTab === 'settings'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            <Settings className="w-4 h-4 text-stone-500" />
            <span>{t.settings}</span>
          </button>
        </nav>

        {/* Zone 3: Language toggle & Mobile Frame Simulator switch */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-[#D5C9B8] bg-white text-stone-800 hover:bg-stone-50 transition-all cursor-pointer shadow-2xs whitespace-nowrap"
            title="Toggle Hindi / English"
          >
            <Globe className="w-3.5 h-3.5 text-[#1B4332]" />
            <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
          </button>

          {/* Find Recipes Direct CTA */}
          <button
            onClick={() => setCurrentTab('pantry')}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#E76F51] hover:bg-[#D65F42] text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 active:scale-98"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'सामग्री से खोजें' : 'Find Recipes'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
