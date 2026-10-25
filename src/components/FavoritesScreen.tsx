import React from 'react';
import { Heart, BookOpen, ChefHat, Sparkles } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { RecipeCard } from './RecipeCard';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface FavoritesScreenProps {
  favorites: Set<string>;
  recipes: Recipe[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onExploreRecipes: () => void;
  language: Language;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  favorites,
  recipes,
  onToggleFavorite,
  onSelectRecipe,
  onExploreRecipes,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const favoriteRecipes = recipes.filter(r => favorites.has(r.id));

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] tracking-tight flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#E76F51] fill-[#E76F51]" />
            <span>{t.favorites}</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            {language === 'hi' 
              ? `${favoriteRecipes.length} पसंदीदा व्यंजन सहेजे गए हैं (ऑफलाइन उपलब्ध)` 
              : `${favoriteRecipes.length} recipes saved for quick offline access`}
          </p>
        </div>
      </div>

      {favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onSelectRecipe={onSelectRecipe}
              language={language}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#E8E1D5] max-w-lg mx-auto space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-red-50 text-[#E76F51] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="font-bold text-lg text-stone-800">{t.emptyFavorites}</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            {t.emptyFavoritesDesc}
          </p>
          <button
            onClick={onExploreRecipes}
            className="px-5 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#235842] text-white text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.exploreRecipes}</span>
          </button>
        </div>
      )}
    </div>
  );
};
