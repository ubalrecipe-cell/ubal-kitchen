import React, { useState, useEffect, useMemo } from 'react';
import { ChefHat, Smartphone, Globe, Heart, BookOpen } from 'lucide-react';
import { ALL_RECIPES } from './data/allRecipes';
import { Recipe, IngredientMatchResult, ShoppingListItem, IngredientItem } from './types/recipe';
import { Language, TRANSLATIONS } from './utils/i18n';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { PantryMatcher } from './components/PantryMatcher';
import { AllRecipesScreen } from './components/AllRecipesScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { ShoppingListScreen } from './components/ShoppingListScreen';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { CookingMode } from './components/CookingMode';
import { CreatorStudioModal } from './components/CreatorStudioModal';

export default function App() {
  // Navigation tab state: purely professional consumer screens
  const [currentTab, setCurrentTab] = useState<'home' | 'pantry' | 'recipes' | 'shopping' | 'favorites' | 'settings'>('home');

  // Filter params passed from Home to AllRecipes
  const [recipesFilter, setRecipesFilter] = useState<{ category?: string; dietary?: string; quick?: boolean }>({});

  // Language state: defaults to Hindi for Indian home cooks, easily switchable to English
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('ubal_kitchen_lang');
    return saved === 'en' || saved === 'hi' ? saved : 'hi';
  });

  // Shopping list state persisted in localStorage
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>(() => {
    try {
      const saved = localStorage.getItem('ubal_kitchen_shopping_list');
      return saved ? JSON.parse(saved) : [
        {
          id: 'sample_paneer',
          nameEn: 'Fresh Paneer',
          nameHi: 'ताज़ा पनीर',
          amount: 200,
          unit: 'g',
          isChecked: false,
          recipeSourceNameEn: 'Kadai Paneer',
          recipeSourceNameHi: 'कड़ाही पनीर',
          recipeSourceId: 'kadai_paneer',
          addedAt: Date.now() - 3600000,
        },
        {
          id: 'sample_capsicum',
          nameEn: 'Capsicum / Shimla Mirch',
          nameHi: 'शिमला मिर्च',
          amount: 100,
          unit: 'g',
          isChecked: false,
          recipeSourceNameEn: 'Kadai Paneer',
          recipeSourceNameHi: 'कड़ाही पनीर',
          recipeSourceId: 'kadai_paneer',
          addedAt: Date.now() - 3600000,
        }
      ];
    } catch {
      return [];
    }
  });

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('ubal_kitchen_favs');
      return saved ? new Set(JSON.parse(saved)) : new Set(['aloo_paratha', 'paneer_butter_masala', 'kanda_poha']);
    } catch {
      return new Set(['aloo_paratha']);
    }
  });

  // Recently viewed recipes state
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ubal_kitchen_recents');
      return saved ? JSON.parse(saved) : ['aloo_paratha', 'kanda_poha'];
    } catch {
      return [];
    }
  });

  // Custom creator recipes persisted in localStorage
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>(() => {
    try {
      const saved = localStorage.getItem('ubal_kitchen_creator_recipes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active modals
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedMatchResult, setSelectedMatchResult] = useState<IngredientMatchResult | undefined>(undefined);
  const [cookingRecipe, setCookingRecipe] = useState<Recipe | null>(null);
  const [isCreatorStudioOpen, setIsCreatorStudioOpen] = useState(false);

  // Android Phone Simulation Frame Toggle
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  // Merged recipes: custom user recipes + standard 52 recipes
  const allDishes = useMemo(() => {
    return [...customRecipes, ...ALL_RECIPES];
  }, [customRecipes]);

  // Sync custom recipes to localStorage
  useEffect(() => {
    localStorage.setItem('ubal_kitchen_creator_recipes', JSON.stringify(customRecipes));
  }, [customRecipes]);

  // Sync language to localStorage
  useEffect(() => {
    localStorage.setItem('ubal_kitchen_lang', language);
  }, [language]);

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem('ubal_kitchen_favs', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  // Sync recents to localStorage
  useEffect(() => {
    localStorage.setItem('ubal_kitchen_recents', JSON.stringify(recentlyViewedIds));
  }, [recentlyViewedIds]);

  // Sync shopping list to localStorage
  useEffect(() => {
    localStorage.setItem('ubal_kitchen_shopping_list', JSON.stringify(shoppingList));
  }, [shoppingList]);

  // Shopping List Handlers
  const handleAddMissingToShoppingList = (
    items: IngredientItem[],
    recipe: Recipe,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();
    setShoppingList(prev => {
      const newItems: ShoppingListItem[] = [];
      items.forEach(item => {
        const alreadyExists = prev.some(
          existing =>
            existing.nameEn.toLowerCase() === item.nameEn.toLowerCase() ||
            existing.nameHi === item.nameHi ||
            (existing.ingredientId && existing.ingredientId === item.id)
        );
        if (!alreadyExists) {
          newItems.push({
            id: `shop_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            ingredientId: item.id,
            nameEn: item.nameEn,
            nameHi: item.nameHi,
            amount: item.amount,
            unit: item.unit,
            isChecked: false,
            recipeSourceId: recipe.id,
            recipeSourceNameEn: recipe.nameEn,
            recipeSourceNameHi: recipe.nameHi,
            addedAt: Date.now(),
          });
        }
      });
      return [...newItems, ...prev];
    });
  };

  const handleAddSingleToShoppingList = (item: IngredientItem, recipe: Recipe) => {
    setShoppingList(prev => {
      const alreadyExists = prev.some(
        existing =>
          existing.nameEn.toLowerCase() === item.nameEn.toLowerCase() ||
          existing.nameHi === item.nameHi ||
          (existing.ingredientId && existing.ingredientId === item.id)
      );
      if (alreadyExists) return prev;
      return [
        {
          id: `shop_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          ingredientId: item.id,
          nameEn: item.nameEn,
          nameHi: item.nameHi,
          amount: item.amount,
          unit: item.unit,
          isChecked: false,
          recipeSourceId: recipe.id,
          recipeSourceNameEn: recipe.nameEn,
          recipeSourceNameHi: recipe.nameHi,
          addedAt: Date.now(),
        },
        ...prev,
      ];
    });
  };

  const handleAddCustomShoppingItem = (
    nameEn: string,
    nameHi: string,
    amount: number,
    unit: string
  ) => {
    setShoppingList(prev => [
      {
        id: `shop_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        nameEn,
        nameHi,
        amount,
        unit,
        isChecked: false,
        addedAt: Date.now(),
      },
      ...prev,
    ]);
  };

  const handleToggleShoppingItem = (id: string) => {
    setShoppingList(prev =>
      prev.map(item => (item.id === id ? { ...item, isChecked: !item.isChecked } : item))
    );
  };

  const handleRemoveShoppingItem = (id: string) => {
    setShoppingList(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCompletedShopping = () => {
    setShoppingList(prev => prev.filter(item => !item.isChecked));
  };

  const handleClearAllShopping = () => {
    setShoppingList([]);
  };

  const isIngredientInShoppingList = (nameEn: string, nameHi: string) => {
    return shoppingList.some(
      item => item.nameEn.toLowerCase() === nameEn.toLowerCase() || item.nameHi === nameHi
    );
  };

  const pendingShoppingCount = shoppingList.filter(i => !i.isChecked).length;

  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectRecipe = (recipe: Recipe, matchResult?: IngredientMatchResult) => {
    setSelectedRecipe(recipe);
    setSelectedMatchResult(matchResult);

    // Track recently viewed
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(id => id !== recipe.id);
      return [recipe.id, ...filtered].slice(0, 8);
    });
  };

  const handleStartCooking = (recipe: Recipe) => {
    setSelectedRecipe(null);
    setCookingRecipe(recipe);
  };

  const handleSaveCustomRecipe = (recipe: Recipe) => {
    setCustomRecipes(prev => [recipe, ...prev]);
  };

  const handleDeleteCustomRecipe = (recipeId: string) => {
    setCustomRecipes(prev => prev.filter(r => r.id !== recipeId));
  };

  const handleGoToRecipes = (filter?: { category?: string; dietary?: string; quick?: boolean }) => {
    if (filter) setRecipesFilter(filter);
    else setRecipesFilter({});
    setCurrentTab('recipes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const recentlyViewedRecipes = recentlyViewedIds
    .map(id => allDishes.find(r => r.id === id))
    .filter((r): r is Recipe => r !== undefined);

  const t = TRANSLATIONS[language];

  const appContent = (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900 selection:bg-[#E76F51]/20 selection:text-[#1B4332]">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        setLanguage={setLanguage}
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
        favoritesCount={favorites.size}
        shoppingCount={pendingShoppingCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-20">
        {currentTab === 'home' && (
          <HomeScreen
            recipes={allDishes}
            onSelectRecipe={handleSelectRecipe}
            onGoToPantry={() => {
              setCurrentTab('pantry');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToRecipes={handleGoToRecipes}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            recentlyViewed={recentlyViewedRecipes}
            language={language}
          />
        )}

        {currentTab === 'pantry' && (
          <PantryMatcher
            allRecipes={allDishes}
            onSelectRecipe={handleSelectRecipe}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            language={language}
            onAddMissingToShoppingList={handleAddMissingToShoppingList}
            shoppingListItems={shoppingList}
            onGoToShoppingList={() => {
              setCurrentTab('shopping');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'shopping' && (
          <ShoppingListScreen
            items={shoppingList}
            onToggleItem={handleToggleShoppingItem}
            onRemoveItem={handleRemoveShoppingItem}
            onClearCompleted={handleClearCompletedShopping}
            onClearAll={handleClearAllShopping}
            onAddCustomItem={handleAddCustomShoppingItem}
            onGoToPantry={() => {
              setCurrentTab('pantry');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectRecipeById={(recipeId) => {
              const found = allDishes.find(r => r.id === recipeId);
              if (found) handleSelectRecipe(found);
            }}
            allRecipes={allDishes}
            language={language}
          />
        )}

        {currentTab === 'recipes' && (
          <AllRecipesScreen
            recipes={allDishes}
            onSelectRecipe={handleSelectRecipe}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            language={language}
            initialCategory={recipesFilter.category}
            initialDietary={recipesFilter.dietary}
            initialQuick={recipesFilter.quick}
          />
        )}

        {currentTab === 'favorites' && (
          <FavoritesScreen
            favorites={favorites}
            recipes={allDishes}
            onToggleFavorite={handleToggleFavorite}
            onSelectRecipe={handleSelectRecipe}
            onExploreRecipes={() => setCurrentTab('recipes')}
            language={language}
          />
        )}

        {currentTab === 'settings' && (
          <SettingsScreen
            language={language}
            setLanguage={setLanguage}
            favoritesCount={favorites.size}
            onGoToFavorites={() => setCurrentTab('favorites')}
            onOpenCreatorStudio={() => setIsCreatorStudioOpen(true)}
          />
        )}
      </main>

      {/* Clean Consumer Footer */}
      <footer className="border-t border-[#E8E1D5] bg-[#F5EFE6] py-8 px-4 text-center text-xs text-stone-500 mb-14 md:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#1B4332] text-[#E76F51] flex items-center justify-center">
              <ChefHat className="w-3.5 h-3.5" />
            </div>
            <span className="font-extrabold text-[#1B4332] text-sm">Ubal Kitchen</span>
            <span>— {t.tagline}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => setCurrentTab('settings')}
              className="text-[#1B4332] hover:underline font-semibold cursor-pointer"
            >
              {t.settings}
            </button>
            <span aria-hidden="true">·</span>
            <span>Version 1.0.0</span>
          </div>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        favoritesCount={favorites.size}
        shoppingCount={pendingShoppingCount}
      />

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        matchResult={selectedMatchResult}
        isFavorite={selectedRecipe ? favorites.has(selectedRecipe.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onClose={() => {
          setSelectedRecipe(null);
          setSelectedMatchResult(undefined);
        }}
        onStartCooking={handleStartCooking}
        language={language}
        onAddMissingToShoppingList={handleAddMissingToShoppingList}
        onAddSingleToShoppingList={handleAddSingleToShoppingList}
        isIngredientInShoppingList={isIngredientInShoppingList}
      />

      {/* Fullscreen Interactive Step-by-Step Cooking Mode */}
      {cookingRecipe && (
        <CookingMode
          recipe={cookingRecipe}
          onClose={() => setCookingRecipe(null)}
          language={language}
        />
      )}

      {/* Personal Recipe Creator Panel (Password Protected Studio) */}
      <CreatorStudioModal
        isOpen={isCreatorStudioOpen}
        onClose={() => setIsCreatorStudioOpen(false)}
        customRecipes={customRecipes}
        onSaveRecipe={handleSaveCustomRecipe}
        onDeleteRecipe={handleDeleteCustomRecipe}
        language={language}
      />
    </div>
  );

  // If Android Simulator Frame is enabled, render phone skin
  if (isMobileFrame) {
    return (
      <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-2 sm:p-6">
        <div className="w-full max-w-[420px] bg-black rounded-[48px] p-3 shadow-2xl border-4 border-stone-700 relative">
          {/* Phone Speaker & Camera Notch */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-stone-800" />
          </div>

          {/* Android Screen Viewport */}
          <div className="w-full h-[840px] rounded-[38px] overflow-hidden overflow-y-auto bg-[#FAF7F2] relative">
            {appContent}
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsMobileFrame(false)}
            className="px-4 py-2 bg-stone-800 text-stone-200 text-xs font-semibold rounded-xl hover:bg-stone-700 transition-colors cursor-pointer"
          >
            ← Switch to Desktop View
          </button>
        </div>
      </div>
    );
  }

  return appContent;
}
