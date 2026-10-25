import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, Clock, Utensils, ChefHat } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { RecipeCard } from './RecipeCard';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface AllRecipesScreenProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  language: Language;
  initialCategory?: string;
  initialDietary?: string;
  initialQuick?: boolean;
}

export const AllRecipesScreen: React.FC<AllRecipesScreenProps> = ({
  recipes,
  onSelectRecipe,
  favorites,
  onToggleFavorite,
  language,
  initialCategory,
  initialDietary,
  initialQuick,
}) => {
  const t = TRANSLATIONS[language];
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedDiet, setSelectedDiet] = useState<string>(initialDietary || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [maxTime, setMaxTime] = useState<number>(initialQuick ? 15 : 0);

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Dessert', 'Beverages'];
  const diets = ['All', 'Veg', 'Non-Veg', 'Egg', 'Vegan'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredRecipes = useMemo(() => {
    return recipes.filter(r => {
      // Search query
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matches = 
          r.nameEn.toLowerCase().includes(q) ||
          r.nameHi.includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.ingredients.some(i => i.nameEn.toLowerCase().includes(q) || i.nameHi.includes(q));
        if (!matches) return false;
      }

      // Meal category
      if (selectedCategory !== 'All' && r.mealCategory !== selectedCategory) {
        return false;
      }

      // Dietary
      if (selectedDiet !== 'All' && r.dietary !== selectedDiet) {
        return false;
      }

      // Difficulty
      if (selectedDifficulty !== 'All' && r.difficulty !== selectedDifficulty) {
        return false;
      }

      // Max time
      if (maxTime > 0 && r.totalTime > maxTime) {
        return false;
      }

      return true;
    });
  }, [recipes, search, selectedCategory, selectedDiet, selectedDifficulty, maxTime]);

  const resetAll = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedDiet('All');
    setSelectedDifficulty('All');
    setMaxTime(0);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Title & Search Bar */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] tracking-tight">
            {t.allRecipes}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            {language === 'hi'
              ? `कुल ${recipes.length} प्रामाणिक भारतीय रेसिपी उपलब्ध हैं`
              : `Browse all ${recipes.length} authentic Indian recipes`}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#E8E1D5] rounded-2xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#1B4332]"
          />
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E8E1D5] space-y-4 shadow-2xs">
        {/* Category Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat === 'All' ? t.all : 
                cat === 'Breakfast' ? t.breakfast :
                cat === 'Lunch' ? t.lunch :
                cat === 'Dinner' ? t.dinner :
                cat === 'Snacks' ? t.snacks :
                cat === 'Beverages' ? t.beverages : t.dessert}
            </button>
          ))}
        </div>

        {/* Secondary Dropdown Selectors */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F0EBE1] text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Diet Dropdown */}
            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="px-3 py-1.5 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-stone-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="All">{language === 'hi' ? 'सभी खान-पान' : 'All Diets'}</option>
              <option value="Veg">{t.veg}</option>
              <option value="Non-Veg">{t.nonVeg}</option>
              <option value="Egg">{t.egg}</option>
              <option value="Vegan">{t.vegan}</option>
            </select>

            {/* Difficulty Dropdown */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-1.5 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-stone-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="All">{language === 'hi' ? 'सभी कठिनाई' : 'All Difficulty'}</option>
              <option value="Easy">{t.easy}</option>
              <option value="Medium">{t.medium}</option>
              <option value="Hard">{t.hard}</option>
            </select>

            {/* Time Filter */}
            <select
              value={maxTime}
              onChange={(e) => setMaxTime(Number(e.target.value))}
              className="px-3 py-1.5 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-stone-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value={0}>{language === 'hi' ? 'कोई भी समय' : 'Any Time'}</option>
              <option value={15}>≤ 15 mins</option>
              <option value={25}>≤ 25 mins</option>
              <option value={35}>≤ 35 mins</option>
            </select>
          </div>

          <button
            onClick={resetAll}
            className="flex items-center gap-1 text-stone-500 hover:text-stone-800 font-semibold cursor-pointer ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetFilters}</span>
          </button>
        </div>
      </div>

      {/* Grid of Recipes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-stone-600">
            {filteredRecipes.length} {language === 'hi' ? 'रेसिपी मिलीं' : 'recipes found'}
          </span>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map(recipe => (
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
          <div className="p-12 text-center bg-white rounded-3xl border border-[#E8E1D5] space-y-3">
            <ChefHat className="w-12 h-12 text-stone-400 mx-auto" />
            <h3 className="font-bold text-lg text-stone-800">{t.noRecipesFound}</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              {t.tryAdjustingFilters}
            </p>
            <button
              onClick={resetAll}
              className="px-4 py-2 bg-[#1B4332] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#235842] transition-colors"
            >
              {t.resetFilters}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
