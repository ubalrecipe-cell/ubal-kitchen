import React, { useState } from 'react';
import { Clock, Users, Heart, Utensils, CheckCircle2, AlertCircle, ChefHat, ShoppingBag, Check } from 'lucide-react';
import { Recipe, IngredientMatchResult, IngredientItem } from '../types/recipe';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface RecipeCardProps {
  recipe: Recipe;
  matchResult?: IngredientMatchResult;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  language: Language;
  onAddMissingToShoppingList?: (items: IngredientItem[], recipe: Recipe, e: React.MouseEvent) => void;
  areMissingAdded?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  matchResult,
  isFavorite,
  onToggleFavorite,
  onSelectRecipe,
  language,
  onAddMissingToShoppingList,
  areMissingAdded = false,
}) => {
  const t = TRANSLATIONS[language];
  const [imgError, setImgError] = React.useState(false);
  const [addedJustNow, setAddedJustNow] = useState(false);

  // Difficulty translation
  const diffLabel = 
    recipe.difficulty === 'Easy' ? t.easy :
    recipe.difficulty === 'Medium' ? t.medium : t.hard;

  // Dietary translation
  const dietLabel =
    recipe.dietary === 'Veg' ? (language === 'hi' ? 'शाकाहारी' : 'Veg') :
    recipe.dietary === 'Non-Veg' ? (language === 'hi' ? 'मांसाहारी' : 'Non-Veg') :
    recipe.dietary === 'Egg' ? (language === 'hi' ? 'अंडा' : 'Egg') :
    (language === 'hi' ? 'वीगन' : 'Vegan');

  return (
    <article
      onClick={() => onSelectRecipe(recipe)}
      className="group bg-white rounded-2xl border border-[#E8E1D5] hover:border-[#1B4332]/40 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer flex flex-col h-full"
    >
      {/* Image Container with Scrim & Badges */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {!imgError ? (
          <img
            src={recipe.image}
            alt={recipe.nameEn}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FAF7F2] to-[#EAE4D8] p-4 text-center">
            <ChefHat className="w-10 h-10 text-[#1B4332]/40 mb-2" />
            <span className="font-bold text-stone-700 text-sm">{recipe.nameEn}</span>
            <span className="text-xs text-stone-500 font-medium">{recipe.nameHi}</span>
          </div>
        )}

        {/* Top Floating Match Badge (If Match Engine is Active) */}
        {matchResult && (
          <div className="absolute top-2.5 left-2.5">
            {matchResult.isFullyCookable ? (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1B4332] text-white text-xs font-bold shadow-sm backdrop-blur-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>{matchResult.matchPercentage}% {language === 'hi' ? 'तैयार' : 'Ready'}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-900/90 text-amber-100 text-xs font-bold shadow-sm backdrop-blur-xs">
                <Utensils className="w-3.5 h-3.5 text-amber-300" />
                <span>{matchResult.matchPercentage}% {language === 'hi' ? 'मैच' : 'Match'}</span>
              </div>
            )}
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => onToggleFavorite(recipe.id, e)}
          className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-red-600 flex items-center justify-center shadow-sm backdrop-blur-xs transition-transform active:scale-90"
          aria-label="Save to favorites"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-[#E76F51] text-[#E76F51]' : 'text-stone-600'
            }`}
          />
        </button>

        {/* Bottom image gradient scrim */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        
        {/* Cuisine & Diet on Scrim */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-white/90 font-medium">
          <span>{recipe.cuisine}</span>
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${
              recipe.dietary === 'Veg' || recipe.dietary === 'Vegan' ? 'bg-emerald-400' :
              recipe.dietary === 'Egg' ? 'bg-amber-400' : 'bg-red-400'
            }`} />
            {dietLabel}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Dual Language Names */}
          <h3 className="font-bold text-lg text-stone-900 leading-snug group-hover:text-[#1B4332] transition-colors">
            {language === 'hi' ? recipe.nameHi : recipe.nameEn}
          </h3>
          <p className="text-xs font-medium text-stone-500 mb-2">
            {language === 'hi' ? recipe.nameEn : recipe.nameHi}
          </p>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {language === 'hi' ? recipe.taglineHi : recipe.taglineEn}
          </p>
        </div>

        {/* Missing ingredients snippet if in match mode */}
        {matchResult && !matchResult.isFullyCookable && matchResult.missingRequiredIngredients.length > 0 && (
          <div className="bg-amber-50 rounded-xl p-2.5 text-xs border border-amber-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 font-bold text-amber-950">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {language === 'hi' ? 'सामान बाकी:' : 'Missing items:'}{' '}
                  <span className="font-extrabold text-amber-800">
                    ({matchResult.missingRequiredIngredients.length})
                  </span>
                </span>
              </div>

              {onAddMissingToShoppingList && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddMissingToShoppingList(matchResult.missingRequiredIngredients, recipe, e);
                    setAddedJustNow(true);
                    setTimeout(() => setAddedJustNow(false), 2000);
                  }}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs active:scale-95 ${
                    addedJustNow || areMissingAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#1B4332] text-white hover:bg-[#235842]'
                  }`}
                  title={language === 'hi' ? 'शॉपिंग लिस्ट में जोड़ें' : 'Add to Shopping List'}
                >
                  {addedJustNow || areMissingAdded ? (
                    <>
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>{language === 'hi' ? 'लिस्ट में है' : 'In List'}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3 h-3" />
                      <span>{language === 'hi' ? '+ लिस्ट में जोड़ें' : '+ Add to List'}</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1">
              {matchResult.missingRequiredIngredients.map(item => (
                <span
                  key={item.id}
                  className="inline-block px-1.5 py-0.5 rounded bg-white/80 border border-amber-200 text-amber-900 text-[10px] font-semibold"
                >
                  {language === 'hi' ? item.nameHi : item.nameEn}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Clean Unboxed Metadata with Typographic Separator (Anti-slop discipline) */}
        <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between text-xs text-stone-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span className="tabular-nums">{recipe.totalTime} {language === 'hi' ? 'मिनट' : 'mins'}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{diffLabel}</span>
          </div>

          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-stone-400" />
            <span className="tabular-nums">{recipe.defaultServings} {language === 'hi' ? 'लोग' : 'pax'}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
