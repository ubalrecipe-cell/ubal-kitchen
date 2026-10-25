import React from 'react';
import { Home, Utensils, BookOpen, Heart, ShoppingBag } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface BottomNavProps {
  currentTab: 'home' | 'pantry' | 'recipes' | 'shopping' | 'favorites' | 'settings';
  setCurrentTab: (tab: 'home' | 'pantry' | 'recipes' | 'shopping' | 'favorites' | 'settings') => void;
  language: Language;
  favoritesCount: number;
  shoppingCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  setCurrentTab,
  language,
  favoritesCount,
  shoppingCount = 0,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E8E1D5] px-2 py-1 shadow-lg pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-5 items-center justify-around">
        {/* Home */}
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center justify-center py-1.5 transition-colors cursor-pointer ${
            currentTab === 'home' ? 'text-[#1B4332]' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Home className={`w-5 h-5 ${currentTab === 'home' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className={`text-[10px] mt-0.5 tracking-tight font-medium ${currentTab === 'home' ? 'font-bold' : ''}`}>
            {language === 'hi' ? 'होम' : 'Home'}
          </span>
        </button>

        {/* Pantry Finder */}
        <button
          onClick={() => setCurrentTab('pantry')}
          className={`flex flex-col items-center justify-center py-1.5 transition-colors cursor-pointer relative ${
            currentTab === 'pantry' ? 'text-[#E76F51]' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Utensils className={`w-5 h-5 ${currentTab === 'pantry' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className={`text-[10px] mt-0.5 tracking-tight font-medium ${currentTab === 'pantry' ? 'font-bold' : ''}`}>
            {language === 'hi' ? 'सामग्री' : 'Matcher'}
          </span>
        </button>

        {/* Shopping List */}
        <button
          onClick={() => setCurrentTab('shopping')}
          className={`flex flex-col items-center justify-center py-1.5 transition-colors cursor-pointer relative ${
            currentTab === 'shopping' ? 'text-[#1B4332]' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className="relative">
            <ShoppingBag className={`w-5 h-5 ${currentTab === 'shopping' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            {shoppingCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#1B4332] text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {shoppingCount}
              </span>
            )}
          </div>
          <span className={`text-[10px] mt-0.5 tracking-tight font-medium ${currentTab === 'shopping' ? 'font-bold' : ''}`}>
            {language === 'hi' ? 'लिस्ट' : 'List'}
          </span>
        </button>

        {/* All Recipes */}
        <button
          onClick={() => setCurrentTab('recipes')}
          className={`flex flex-col items-center justify-center py-1.5 transition-colors cursor-pointer ${
            currentTab === 'recipes' ? 'text-[#1B4332]' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <BookOpen className={`w-5 h-5 ${currentTab === 'recipes' ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className={`text-[10px] mt-0.5 tracking-tight font-medium ${currentTab === 'recipes' ? 'font-bold' : ''}`}>
            {language === 'hi' ? 'रेसिपी' : 'Recipes'}
          </span>
        </button>

        {/* Favorites */}
        <button
          onClick={() => setCurrentTab('favorites')}
          className={`flex flex-col items-center justify-center py-1.5 transition-colors cursor-pointer relative ${
            currentTab === 'favorites' ? 'text-[#1B4332]' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${currentTab === 'favorites' ? 'fill-[#E76F51] text-[#E76F51]' : 'stroke-2'}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#E76F51] text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className={`text-[10px] mt-0.5 tracking-tight font-medium ${currentTab === 'favorites' ? 'font-bold' : ''}`}>
            {language === 'hi' ? 'पसंदीदा' : 'Saved'}
          </span>
        </button>
      </div>
    </nav>
  );
};
