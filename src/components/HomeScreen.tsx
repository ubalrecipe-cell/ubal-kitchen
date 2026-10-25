import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  Flame, 
  Utensils, 
  Heart, 
  ArrowRight, 
  ChefHat,
  Coffee,
  Sun,
  Moon,
  Cookie,
  Cake,
  Leaf,
  GlassWater
} from 'lucide-react';
import { Recipe } from '../types/recipe';
import { RecipeCard } from './RecipeCard';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface HomeScreenProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onGoToPantry: () => void;
  onGoToRecipes: (filter?: { category?: string; dietary?: string; quick?: boolean }) => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  recentlyViewed: Recipe[];
  language: Language;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  recipes,
  onSelectRecipe,
  onGoToPantry,
  onGoToRecipes,
  favorites,
  onToggleFavorite,
  recentlyViewed,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = useState('');

  // Curated subsets
  const popularRecipes = recipes.filter(r => r.featured || r.id === 'paneer_butter_masala' || r.id === 'kanda_poha' || r.id === 'masala_dosa' || r.id === 'vegetable_pulao' || r.id === 'aloo_paratha');
  const quickRecipes = recipes.filter(r => r.totalTime <= 15).slice(0, 6);
  const dinnerSpecial = recipes.filter(r => r.mealCategory === 'Dinner').slice(0, 6);
  const mocktailSpecial = recipes.filter(r => r.mealCategory === 'Beverages');

  // Search filtered results for quick home search
  const searchedRecipes = searchQuery.trim()
    ? recipes.filter(r => 
        r.nameEn.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        r.nameHi.includes(searchQuery.trim()) ||
        r.cuisine.toLowerCase().includes(searchQuery.toLowerCase().trim())
      ).slice(0, 6)
    : [];

  const mealCategories = [
    { id: 'Breakfast', labelEn: 'Breakfast', labelHi: 'नाश्ता', icon: Coffee },
    { id: 'Lunch', labelEn: 'Lunch', labelHi: 'लंच', icon: Sun },
    { id: 'Dinner', labelEn: 'Dinner', labelHi: 'डिनर', icon: Moon },
    { id: 'Snacks', labelEn: 'Snacks', labelHi: 'स्नैक्स', icon: Cookie },
    { id: 'Dessert', labelEn: 'Desserts', labelHi: 'मीठा', icon: Cake },
    { id: 'Beverages', labelEn: 'Mocktails', labelHi: 'मॉकटेल', icon: GlassWater },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Showcase with Simmering Brass Kadai Photography */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E8E1D5] min-h-[360px] sm:min-h-[420px] flex items-center">
        {/* Real Generated Hero Asset */}
        <img
          src="/src/assets/images/ubal_kitchen_hero_1792785763115.jpg"
          alt="Ubal Kitchen Cooking Kadai"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Measured Scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/75 to-transparent sm:to-black/30" />

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-12 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-amber-200 text-xs font-bold tracking-wide">
            <Flame className="w-4 h-4 text-[#E76F51]" />
            <span>{t.tagline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {language === 'hi' ? 'उबाल किचन' : 'Ubal Kitchen'}
          </h1>

          <p className="text-sm sm:text-base text-stone-200 font-normal leading-relaxed">
            {language === 'hi' 
              ? `बाजार दौड़े बिना, रसोई में पहले से रखे सामान से बनाएं ${recipes.length}+ ज़ायकेदार भारतीय व्यंजन और प्रीमियम मॉकटेल।` 
              : `Discover ${recipes.length}+ authentic Indian recipes & premium lounge mocktails tailored to ingredients at home.`}
          </p>

          {/* Primary Action Button */}
          <div className="pt-3 flex flex-wrap items-center gap-3.5">
            <button
              onClick={onGoToPantry}
              className="px-6 py-4 rounded-2xl bg-[#E76F51] hover:bg-[#D65F42] text-white font-extrabold text-sm sm:text-base flex items-center gap-2.5 shadow-lg shadow-[#E76F51]/30 active:scale-98 transition-all cursor-pointer"
            >
              <Utensils className="w-5 h-5" />
              <span>{t.cookWithMyIngredients}</span>
            </button>

            <button
              onClick={() => onGoToRecipes()}
              className="px-6 py-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm sm:text-base backdrop-blur-md transition-all cursor-pointer flex items-center gap-2 border border-white/20 shadow-sm"
            >
              <span>{t.allRecipes} ({recipes.length}+)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Global Quick Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#E8E1D5] rounded-2xl text-sm sm:text-base text-stone-900 placeholder:text-stone-400 shadow-xs focus:outline-none focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-700"
          >
            Clear
          </button>
        )}
      </div>

      {/* Search results overlay if searching */}
      {searchQuery.trim() && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900">
              {language === 'hi' ? `"${searchQuery}" के परिणाम` : `Search Results for "${searchQuery}"`}
            </h2>
            <span className="text-xs text-stone-500 font-semibold">{searchedRecipes.length} found</span>
          </div>

          {searchedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchedRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isFavorite={favorites.has(recipe.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelectRecipe={onSelectRecipe}
                  language={language}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#E8E1D5] text-stone-500 text-sm">
              {t.noRecipesFound}
            </div>
          )}
        </div>
      )}

      {/* Meal Categories Row */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-stone-900 tracking-tight">
          {language === 'hi' ? 'समय के अनुसार खोजें' : 'Browse by Meal'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {mealCategories.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => onGoToRecipes({ category: cat.id })}
                className="p-4 bg-white rounded-2xl border border-[#E8E1D5] hover:border-[#1B4332]/40 hover:shadow-sm transition-all text-left flex items-center sm:flex-col sm:items-start justify-between gap-3 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#1B4332] group-hover:bg-[#1B4332] group-hover:text-white flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-stone-800">
                    {language === 'hi' ? cat.labelHi : cat.labelEn}
                  </h3>
                  <span className="text-[11px] text-stone-400 font-medium">
                    {recipes.filter(r => r.mealCategory === cat.id).length} dishes
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* What Can I Cook Today? / Popular Classics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1B4332] tracking-tight">
              {t.popularRecipes}
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              {language === 'hi' ? 'घर-घर में सबसे ज्यादा पसंद की जाने वाली रेसिपी' : 'Most loved Indian kitchen staples'}
            </p>
          </div>
          <button
            onClick={() => onGoToRecipes()}
            className="text-xs font-bold text-[#E76F51] hover:text-[#D65F42] flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'hi' ? 'सभी देखें' : 'View all'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favorites.has(recipe.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectRecipe={onSelectRecipe}
              language={language}
            />
          ))}
        </div>
      </div>

      {/* Quick Recipes Under 15 Minutes Strip */}
      <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/70 border border-amber-200/60 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                {t.quickRecipes}
              </h2>
              <p className="text-xs text-stone-600 font-medium">
                {language === 'hi' ? 'जब समय कम हो और भूख तेज!' : 'Fast, hearty meals ready in a flash'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onGoToRecipes({ quick: true })}
            className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'hi' ? 'सारे 15m' : 'View 15m'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {quickRecipes.slice(0, 3).map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favorites.has(recipe.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectRecipe={onSelectRecipe}
              language={language}
            />
          ))}
        </div>
      </div>

      {/* Premium Bar & Lounge Mocktails Row */}
      {mocktailSpecial.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-xs">
                <GlassWater className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1B4332] tracking-tight">
                  {language === 'hi' ? 'प्रीमियम लाउंज मॉकटेल (20 रेसिपी)' : 'Premium Bar & Lounge Mocktails'}
                </h2>
                <p className="text-xs text-stone-500 font-medium">
                  {language === 'hi' ? 'घर पर बनाएं कैफे व लाउंज स्टाइल चिल्ड मॉकटेल और फिज़' : 'Cafe & lounge grade sparkling coolers, botanical fizzes & spritzers'}
                </p>
              </div>
            </div>
            <button
              onClick={() => onGoToRecipes({ category: 'Beverages' })}
              className="text-xs font-bold text-[#E76F51] hover:text-[#D65F42] flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'hi' ? 'सभी 20 मॉकटेल' : 'View all 20'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mocktailSpecial.slice(0, 3).map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favorites.has(recipe.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectRecipe={onSelectRecipe}
                language={language}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed (If Available) */}
      {recentlyViewed.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
            {t.recentlyViewed}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {recentlyViewed.slice(0, 3).map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favorites.has(recipe.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectRecipe={onSelectRecipe}
                language={language}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
