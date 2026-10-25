import React, { useState, useMemo } from 'react';
import { 
  Search, 
  RotateCcw, 
  Check, 
  Plus, 
  CheckCircle2, 
  Filter, 
  Flame, 
  Clock, 
  ShieldCheck,
  ChefHat
} from 'lucide-react';
import { MASTER_INGREDIENTS, PANTRY_STAPLE_IDS } from '../data/ingredients';
import { Recipe, IngredientMatchResult, IngredientItem, ShoppingListItem } from '../types/recipe';
import { findMatchingRecipes } from '../utils/recipeMatcher';
import { RecipeCard } from './RecipeCard';
import { Language, TRANSLATIONS } from '../utils/i18n';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface PantryMatcherProps {
  allRecipes: Recipe[];
  onSelectRecipe: (recipe: Recipe, matchResult?: IngredientMatchResult) => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  language: Language;
  onAddMissingToShoppingList?: (items: IngredientItem[], recipe: Recipe, e: React.MouseEvent) => void;
  shoppingListItems?: ShoppingListItem[];
  onGoToShoppingList?: () => void;
}

export const PantryMatcher: React.FC<PantryMatcherProps> = ({
  allRecipes,
  onSelectRecipe,
  favorites,
  onToggleFavorite,
  language,
  onAddMissingToShoppingList,
  shoppingListItems = [],
  onGoToShoppingList,
}) => {
  const t = TRANSLATIONS[language];

  // Toast feedback state when adding to shopping list
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected pantry item IDs
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(['potato', 'onion', 'tomato', 'green_chilli', 'wheat_flour', 'cooking_oil', 'salt', 'turmeric_powder'])
  );

  // Common pantry staples assumed switch
  const [assumeStaples, setAssumeStaples] = useState(true);

  // Search input for ingredients
  const [ingredientSearch, setIngredientSearch] = useState('');

  // Category filter for ingredients list
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Filter for matching results
  const [onlyFullyCookable, setOnlyFullyCookable] = useState(false);
  const [dietaryFilter, setDietaryFilter] = useState('All');
  const [maxTimeFilter, setMaxTimeFilter] = useState(0);

  // Custom user ingredients added on the fly
  const [customIngredients, setCustomIngredients] = useState<Array<{ id: string; nameEn: string; nameHi: string }>>([]);
  const [customInput, setCustomInput] = useState('');

  // Combined master ingredients
  const allMasterIngredients = useMemo(() => {
    return [
      ...MASTER_INGREDIENTS,
      ...customIngredients.map(c => ({
        id: c.id,
        nameEn: c.nameEn,
        nameHi: c.nameHi,
        category: 'Vegetables' as const,
      })),
    ];
  }, [customIngredients]);

  // Filtered ingredients to display in picker
  const filteredIngredients = useMemo(() => {
    let list = allMasterIngredients;
    if (activeCategory !== 'All') {
      list = list.filter(item => item.category === activeCategory);
    }
    if (ingredientSearch.trim()) {
      const q = ingredientSearch.toLowerCase().trim();
      list = list.filter(
        item => item.nameEn.toLowerCase().includes(q) || item.nameHi.includes(q)
      );
    }
    return list;
  }, [allMasterIngredients, activeCategory, ingredientSearch]);

  // Toggle ingredient selection
  const toggleIngredient = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Select all common pantry staples
  const selectAllStaples = () => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      PANTRY_STAPLE_IDS.forEach(id => next.add(id));
      return next;
    });
  };

  // Clear all selections
  const clearAll = () => {
    setSelectedIds(new Set());
  };

  // Add custom ingredient
  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const name = customInput.trim();
    const id = `custom_${Date.now()}`;
    setCustomIngredients(prev => [...prev, { id, nameEn: name, nameHi: name }]);
    setSelectedIds(prev => new Set(prev).add(id));
    setCustomInput('');
  };

  // Match calculations
  const matchResults = useMemo(() => {
    return findMatchingRecipes(
      allRecipes,
      selectedIds,
      {
        dietary: dietaryFilter,
        maxTime: maxTimeFilter,
        onlyFullyCookable: onlyFullyCookable,
      },
      assumeStaples
    );
  }, [allRecipes, selectedIds, assumeStaples, dietaryFilter, maxTimeFilter, onlyFullyCookable]);

  const fullyCookableCount = matchResults.filter(r => r.isFullyCookable).length;

  const categories = [
    'All',
    'Vegetables',
    'Aromatics & Herbs',
    'Grains & Flours',
    'Dairy & Eggs',
    'Lentils & Pulses',
    'Pantry & Spices',
    'Beverages & Syrups',
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold tracking-wide">
            <ChefHat className="w-3.5 h-3.5 text-[#E76F51]" />
            <span>{language === 'hi' ? 'रसोई का जादू' : 'Smart Kitchen Matcher'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.cookWithMyIngredients}
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 font-normal leading-relaxed">
            {t.cookWithMyIngredientsDesc}
          </p>
        </div>

        {/* Quick Selection Status Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/15 text-xs text-white/90">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm tabular-nums">
              {selectedIds.size} {t.ingredientsSelected}
            </span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="font-semibold text-emerald-300">
              {fullyCookableCount} {language === 'hi' ? 'तुरंत बन सकती हैं' : 'can be cooked right now!'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={selectAllStaples}
              className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white font-medium transition-colors cursor-pointer"
            >
              + {language === 'hi' ? 'मसाले जोड़ें' : 'Add Spices'}
            </button>
            <button
              onClick={clearAll}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.clearAll}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ingredient Selector Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E1D5] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              {language === 'hi' ? 'आपकी रसोई में क्या-क्या है?' : 'What do you have in your kitchen?'}
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              {language === 'hi' ? 'नीचे दी गई सामग्री पर टैप करें' : 'Tap items you have at home'}
            </p>
          </div>

          {/* Search bar inside picker */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={ingredientSearch}
              onChange={(e) => setIngredientSearch(e.target.value)}
              placeholder={language === 'hi' ? 'सामग्री खोजें (उदा. आलू, पनीर)...' : 'Search ingredient...'}
              className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#1B4332]"
            />
          </div>
        </div>

        {/* Category Filter Pills (Functional Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
              }`}
            >
              {cat === 'All' ? t.all : cat}
            </button>
          ))}
        </div>

        {/* Ingredient Chips Grid */}
        <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto pr-1">
          {filteredIngredients.map(item => {
            const isSelected = selectedIds.has(item.id);

            return (
              <button
                key={item.id}
                onClick={() => toggleIngredient(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border transition-all cursor-pointer select-none active:scale-95 ${
                  isSelected
                    ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-xs'
                    : 'bg-[#FAF7F2] text-stone-700 border-[#E8E1D5] hover:border-stone-400 hover:bg-white'
                }`}
              >
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  isSelected ? 'bg-white text-[#1B4332]' : 'border border-stone-300'
                }`}>
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span>{language === 'hi' ? item.nameHi : item.nameEn}</span>
              </button>
            );
          })}
        </div>

        {/* Add Custom Ingredient bar */}
        <form onSubmit={handleAddCustom} className="pt-3 border-t border-[#F0EBE1] flex items-center gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder={language === 'hi' ? 'कोई अन्य सामग्री जोड़ें...' : 'Add a custom ingredient...'}
            className="flex-1 max-w-sm px-3.5 py-1.5 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#1B4332]"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 bg-[#1B4332] hover:bg-[#235842] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'जोड़ें' : 'Add'}</span>
          </button>

          {/* Pantry staples assume toggle */}
          <label className="ml-auto flex items-center gap-2 text-xs text-stone-600 font-medium cursor-pointer select-none hidden md:flex">
            <input
              type="checkbox"
              checked={assumeStaples}
              onChange={(e) => setAssumeStaples(e.target.checked)}
              className="rounded text-[#1B4332] focus:ring-0 cursor-pointer"
            />
            <span>{t.staplesAssumed}</span>
          </label>
        </form>
      </div>

      {/* Results Header & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1B4332] tracking-tight flex items-center gap-2">
              <span>{language === 'hi' ? 'आपके सामान से बनने वाली रेसिपी' : 'Recipes You Can Make'}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1B4332]/10 text-[#1B4332] font-bold">
                {matchResults.length}
              </span>
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              {language === 'hi' ? 'मैच प्रतिशत के अनुसार क्रमबद्ध' : 'Sorted by match percentage (highest first)'}
            </p>
          </div>

          {/* Result Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 100% Cookable toggle button */}
            <button
              onClick={() => setOnlyFullyCookable(!onlyFullyCookable)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                onlyFullyCookable
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white border border-[#E8E1D5] text-stone-700 hover:bg-stone-50'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? '100% तैयार (0 कमी)' : '100% Ready (0 Missing)'}</span>
            </button>

            {/* Dietary select */}
            <select
              value={dietaryFilter}
              onChange={(e) => setDietaryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-[#E8E1D5] text-stone-700 cursor-pointer focus:outline-none"
            >
              <option value="All">{language === 'hi' ? 'सभी प्रकार' : 'All Diets'}</option>
              <option value="Veg">{t.veg}</option>
              <option value="Non-Veg">{t.nonVeg}</option>
              <option value="Egg">{t.egg}</option>
              <option value="Vegan">{t.vegan}</option>
            </select>

            {/* Time filter select */}
            <select
              value={maxTimeFilter}
              onChange={(e) => setMaxTimeFilter(Number(e.target.value))}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-[#E8E1D5] text-stone-700 cursor-pointer focus:outline-none"
            >
              <option value={0}>{language === 'hi' ? 'कोई भी समय' : 'Any Time'}</option>
              <option value={15}>≤ 15 mins</option>
              <option value={25}>≤ 25 mins</option>
              <option value={40}>≤ 40 mins</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {matchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchResults.map(result => {
              const areMissingAdded = 
                result.missingRequiredIngredients.length > 0 &&
                result.missingRequiredIngredients.every(item => 
                  shoppingListItems.some(s => 
                    s.nameEn.toLowerCase() === item.nameEn.toLowerCase() || 
                    s.nameHi === item.nameHi
                  )
                );

              return (
                <RecipeCard
                  key={result.recipe.id}
                  recipe={result.recipe}
                  matchResult={result}
                  isFavorite={favorites.has(result.recipe.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelectRecipe={(r) => onSelectRecipe(r, result)}
                  language={language}
                  onAddMissingToShoppingList={(items, recipe, e) => {
                    if (onAddMissingToShoppingList) {
                      onAddMissingToShoppingList(items, recipe, e);
                      const dishName = language === 'hi' ? recipe.nameHi : recipe.nameEn;
                      setToastMessage(
                        language === 'hi'
                          ? `${dishName} का बाकी सामान खरीदारी सूची में जोड़ दिया गया!`
                          : `Missing items for ${dishName} added to Shopping List!`
                      );
                      setTimeout(() => setToastMessage(null), 3500);
                    }
                  }}
                  areMissingAdded={areMissingAdded}
                />
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#E8E1D5] space-y-3">
            <ChefHat className="w-12 h-12 text-stone-400 mx-auto" />
            <h3 className="font-bold text-lg text-stone-800">{t.noRecipesFound}</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              {t.tryAdjustingFilters}
            </p>
            <button
              onClick={() => {
                setOnlyFullyCookable(false);
                setDietaryFilter('All');
                setMaxTimeFilter(0);
                selectAllStaples();
              }}
              className="px-4 py-2 bg-[#1B4332] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#235842] transition-colors"
            >
              {t.resetFilters}
            </button>
          </div>
        )}
      </div>

      {/* Floating Shopping List Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#1B4332] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-700/50 max-w-md">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4 text-emerald-300" />
            </div>
            <p className="text-xs sm:text-sm font-semibold flex-1 leading-tight">
              {toastMessage}
            </p>
            {onGoToShoppingList && (
              <button
                onClick={onGoToShoppingList}
                className="px-3 py-1.5 bg-[#E76F51] hover:bg-[#D65F42] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-colors shrink-0 shadow-2xs"
              >
                <span>{language === 'hi' ? 'लिस्ट देखें' : 'View List'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
