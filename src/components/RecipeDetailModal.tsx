import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  Users, 
  Minus, 
  Plus, 
  Heart, 
  Share2, 
  Play, 
  Check, 
  Utensils, 
  AlertTriangle, 
  CheckCircle2,
  ChefHat
} from 'lucide-react';
import { Recipe, IngredientMatchResult, IngredientItem } from '../types/recipe';
import { Language, TRANSLATIONS } from '../utils/i18n';
import { ShoppingBag } from 'lucide-react';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  matchResult?: IngredientMatchResult;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
  onStartCooking: (recipe: Recipe) => void;
  language: Language;
  onAddMissingToShoppingList?: (items: IngredientItem[], recipe: Recipe) => void;
  onAddSingleToShoppingList?: (item: IngredientItem, recipe: Recipe) => void;
  isIngredientInShoppingList?: (nameEn: string, nameHi: string) => boolean;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  matchResult,
  isFavorite,
  onToggleFavorite,
  onClose,
  onStartCooking,
  language,
  onAddMissingToShoppingList,
  onAddSingleToShoppingList,
  isIngredientInShoppingList,
}) => {
  if (!recipe) return null;

  const t = TRANSLATIONS[language];
  const [servings, setServings] = useState(recipe.defaultServings);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());
  const [showShareToast, setShowShareToast] = useState(false);
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  // Math scaling factor for servings
  const scale = servings / recipe.defaultServings;

  const toggleCheck = (id: string) => {
    setCheckedIngredients(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleShareToWhatsApp = async () => {
    const formattedIngredients = recipe.ingredients
      .map(i => `• ${((i.amount * scale).toFixed(1)).replace('.0', '')} ${i.unit} ${language === 'hi' ? i.nameHi : i.nameEn}`)
      .join('\n');

    const formattedSteps = recipe.steps
      .slice(0, 4)
      .map(s => `${s.stepNumber}. ${language === 'hi' ? s.instructionHi : s.instructionEn}`)
      .join('\n');

    const whatsappMessage = 
      `🍲 *${recipe.nameEn} (${recipe.nameHi})* — *Ubal Kitchen*\n` +
      `_${language === 'hi' ? recipe.taglineHi : recipe.taglineEn}_\n\n` +
      `⏱️ *कुल समय:* ${recipe.totalTime} mins | 👥 *सर्विंग्स:* ${servings} Pax\n` +
      `🏷️ *प्रकार:* ${recipe.dietary} (${recipe.cuisine})\n\n` +
      `🛒 *ज़रूरी सामग्री (${servings} लोगों के लिए):*\n${formattedIngredients}\n\n` +
      `👨‍🍳 *बनाने की विधि:*\n${formattedSteps}\n` +
      `\n🍳 _Ubal Kitchen — जो घर में है, उसी से कुछ नया!_\n` +
      `📲 घर में रखे सामान से रेसिपी बनाएं: https://ubalkitchen.app`;

    // 1. Copy to clipboard
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(whatsappMessage);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }

    // 2. Open WhatsApp directly
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-[#FAF7F2] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8E1D5] max-h-[92vh] flex flex-col relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Close Button & Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleShareToWhatsApp}
            className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-md backdrop-blur-xs transition-transform active:scale-90 cursor-pointer"
            title={language === 'hi' ? 'व्हाट्सएप पर शेयर करें' : 'Share on WhatsApp'}
          >
            <WhatsAppIcon className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={() => onToggleFavorite(recipe.id)}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-700 flex items-center justify-center shadow-md backdrop-blur-xs transition-transform active:scale-90"
            title={t.favorites}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#E76F51] text-[#E76F51]' : 'text-stone-600'}`} />
          </button>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 flex items-center justify-center shadow-md backdrop-blur-xs transition-transform active:scale-90"
            title={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-stone-200">
            {!imgError ? (
              <img
                src={recipe.image}
                alt={recipe.nameEn}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-[#FAF7F2] to-[#ECE5D8] p-6 text-center">
                <ChefHat className="w-12 h-12 text-[#1B4332]/40 mb-2" />
                <h2 className="text-xl font-bold text-stone-800">{recipe.nameEn}</h2>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-black/20 to-transparent" />
            
            {/* Category badge */}
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#1B4332] text-white text-xs font-bold tracking-wide shadow-sm">
                {recipe.cuisine}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/90 text-stone-800 text-xs font-bold tracking-wide shadow-sm">
                {recipe.mealCategory}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Title & Tagline */}
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] tracking-tight">
                  {language === 'hi' ? recipe.nameHi : recipe.nameEn}
                </h1>
                <span className="text-xl sm:text-2xl font-medium text-stone-500">
                  ({language === 'hi' ? recipe.nameEn : recipe.nameHi})
                </span>
              </div>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {language === 'hi' ? recipe.descriptionHi : recipe.descriptionEn}
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white rounded-2xl border border-[#E8E1D5] text-center shadow-xs">
              <div>
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">{t.prepTime}</span>
                <span className="text-base sm:text-lg font-bold text-stone-800 tabular-nums">{recipe.prepTime} {language === 'hi' ? 'मिनट' : 'mins'}</span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">{t.cookTime}</span>
                <span className="text-base sm:text-lg font-bold text-stone-800 tabular-nums">{recipe.cookTime} {language === 'hi' ? 'मिनट' : 'mins'}</span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">{t.difficulty}</span>
                <span className="text-base sm:text-lg font-bold text-stone-800">
                  {recipe.difficulty === 'Easy' ? t.easy : recipe.difficulty === 'Medium' ? t.medium : t.hard}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">{t.dietary}</span>
                <span className="text-base sm:text-lg font-bold text-stone-800">
                  {recipe.dietary === 'Veg' ? t.veg : recipe.dietary === 'Non-Veg' ? t.nonVeg : recipe.dietary === 'Egg' ? t.egg : t.vegan}
                </span>
              </div>
            </div>

            {/* Match Engine breakdown if available */}
            {matchResult && (
              <div className={`p-4 rounded-2xl border ${matchResult.isFullyCookable ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {matchResult.isFullyCookable ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                    ) : (
                      <Utensils className="w-5 h-5 text-amber-700" />
                    )}
                    <span className="font-bold text-sm text-stone-900">
                      {matchResult.isFullyCookable ? t.fullyCookable : `${matchResult.matchPercentage}% ${t.matchScore}`}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-stone-600">
                    {matchResult.matchedRequiredCount} / {matchResult.totalRequiredCount} {language === 'hi' ? 'सामग्री मौजूद' : 'required in kitchen'}
                  </span>
                </div>

                {!matchResult.isFullyCookable && matchResult.missingRequiredIngredients.length > 0 && (
                  <div className="mt-2.5 pt-2.5 border-t border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900">
                    <div className="flex-1">
                      <span className="font-bold">{t.missingRequired}: </span>
                      <span className="text-amber-800">
                        {matchResult.missingRequiredIngredients
                          .map(i => (language === 'hi' ? i.nameHi : i.nameEn))
                          .join(', ')}
                      </span>
                    </div>

                    {onAddMissingToShoppingList && (
                      <button
                        type="button"
                        onClick={() => {
                          onAddMissingToShoppingList(matchResult.missingRequiredIngredients, recipe);
                          setAddedToast(
                            language === 'hi' 
                              ? 'सामान खरीदारी सूची में जोड़ा गया!' 
                              : 'Added missing items to Shopping List!'
                          );
                          setTimeout(() => setAddedToast(null), 3000);
                        }}
                        className="px-3 py-1.5 bg-[#1B4332] hover:bg-[#235842] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-emerald-300" />
                        <span>{t.addMissingToShoppingList}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Servings Adjuster with Interactive Scaler */}
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#E8E1D5]">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#1B4332]" />
                <div>
                  <h4 className="font-bold text-sm text-stone-900">{t.servings}</h4>
                  <p className="text-xs text-stone-500">{language === 'hi' ? 'सामग्री की मात्रा खुद बदलेगी' : 'Quantities adjust automatically'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  disabled={servings <= 1}
                  className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold disabled:opacity-40 cursor-pointer active:scale-90 transition-transform"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-lg text-stone-900 tabular-nums min-w-[24px] text-center">
                  {servings}
                </span>
                <button
                  onClick={() => setServings(Math.min(12, servings + 1))}
                  disabled={servings >= 12}
                  className="w-8 h-8 rounded-lg bg-[#1B4332] text-white hover:bg-[#235842] flex items-center justify-center font-bold disabled:opacity-40 cursor-pointer active:scale-90 transition-transform"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Ingredients Checklist Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-extrabold text-lg text-stone-900 flex items-center gap-2">
                  <span>{t.ingredients}</span>
                  <span className="text-xs font-medium text-stone-500">
                    ({recipe.ingredients.length} items)
                  </span>
                </h3>
                <span className="text-xs text-stone-500">
                  {checkedIngredients.size}/{recipe.ingredients.length} {language === 'hi' ? 'तैयार' : 'checked'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recipe.ingredients.map(item => {
                  const isChecked = checkedIngredients.has(item.id);
                  const scaledAmount = Number((item.amount * scale).toFixed(2));
                  const formattedAmount = scaledAmount % 1 === 0 ? scaledAmount : scaledAmount.toFixed(1);
                  const inList = isIngredientInShoppingList ? isIngredientInShoppingList(item.nameEn, item.nameHi) : false;

                  return (
                    <div
                      key={item.id}
                      className={`flex items-start justify-between gap-2 p-3 rounded-xl border text-left transition-all ${
                        isChecked 
                          ? 'bg-emerald-50/70 border-emerald-300 opacity-75' 
                          : 'bg-white border-[#E8E1D5] hover:border-[#1B4332]/30 shadow-2xs'
                      }`}
                    >
                      {/* Check toggle */}
                      <button
                        type="button"
                        onClick={() => toggleCheck(item.id)}
                        className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer text-left"
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                          isChecked ? 'bg-emerald-600 text-white' : 'border border-stone-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <span className={`font-semibold truncate ${isChecked ? 'line-through text-stone-500' : 'text-stone-900'}`}>
                              {language === 'hi' ? item.nameHi : item.nameEn}
                            </span>
                            <span className="font-bold text-[#1B4332] tabular-nums whitespace-nowrap ml-2">
                              {formattedAmount} {item.unit}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] text-stone-500 truncate">
                              {language === 'hi' ? item.nameEn : item.nameHi}
                            </span>
                            {!item.isRequired && (
                              <span className="text-[10px] text-amber-700 font-medium shrink-0">
                                ({language === 'hi' ? 'ऐच्छिक' : 'optional'})
                              </span>
                            )}
                          </div>
                        </div>
                      </button>

                      {/* Add to shopping list button */}
                      {onAddSingleToShoppingList && (
                        <button
                          type="button"
                          onClick={() => {
                            onAddSingleToShoppingList(item, recipe);
                            setAddedToast(
                              language === 'hi' 
                                ? `${item.nameHi} लिस्ट में जोड़ दिया गया!` 
                                : `Added ${item.nameEn} to Shopping List!`
                            );
                            setTimeout(() => setAddedToast(null), 2500);
                          }}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer shrink-0 mt-0.5 ${
                            inList 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'text-stone-400 hover:text-[#1B4332] hover:bg-stone-100'
                          }`}
                          title={inList ? (language === 'hi' ? 'लिस्ट में मौजूद' : 'In Shopping List') : (language === 'hi' ? 'शॉपिंग लिस्ट में जोड़ें' : 'Add to Shopping List')}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step-by-Step Instructions Summary */}
            <div>
              <h3 className="font-extrabold text-lg text-stone-900 mb-3">
                {t.instructions}
              </h3>
              <div className="space-y-3">
                {recipe.steps.map(step => (
                  <div 
                    key={step.stepNumber}
                    className="p-4 bg-white rounded-2xl border border-[#E8E1D5] flex gap-3 shadow-2xs"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#1B4332] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {step.stepNumber}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-stone-800 leading-relaxed">
                        {language === 'hi' ? step.instructionHi : step.instructionEn}
                      </p>
                      {step.durationMinutes && (
                        <div className="flex items-center gap-1 text-xs text-stone-500 font-medium pt-1">
                          <Clock className="w-3 h-3 text-[#E76F51]" />
                          <span>~{step.durationMinutes} {language === 'hi' ? 'मिनट' : 'mins'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chef Secrets & Cooking Tips */}
            {recipe.tipsEn && recipe.tipsEn.length > 0 && (
              <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200">
                <h4 className="font-bold text-sm text-amber-950 flex items-center gap-2 mb-2">
                  <ChefHat className="w-4 h-4 text-amber-700" />
                  <span>{t.chefTips}</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-amber-900 leading-relaxed">
                  {(language === 'hi' ? recipe.tipsHi : recipe.tipsEn).map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Allergen Information */}
            {recipe.allergensEn && recipe.allergensEn.length > 0 && (
              <div className="p-3.5 bg-stone-100 rounded-2xl border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-stone-500 shrink-0" />
                <span>
                  <strong>{t.allergens}: </strong>
                  {(language === 'hi' ? recipe.allergensHi : recipe.allergensEn).join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Bottom Primary CTA Action Bar */}
        <div className="p-4 bg-white border-t border-[#E8E1D5] flex items-center justify-between gap-3">
          <div className="text-xs text-stone-500 hidden sm:block">
            <span>{recipe.steps.length} {language === 'hi' ? 'आसान कदम' : 'easy steps'}</span>
            <span aria-hidden="true" className="mx-2">·</span>
            <span>{recipe.totalTime} {language === 'hi' ? 'मिनट' : 'minutes'}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleShareToWhatsApp}
              className="px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-[#25D366]/20 active:scale-98 transition-all cursor-pointer whitespace-nowrap"
              title={language === 'hi' ? 'व्हाट्सएप पर शेयर करें' : 'Share on WhatsApp'}
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>{language === 'hi' ? 'व्हाट्सएप शेयर' : 'Share WhatsApp'}</span>
            </button>

            <button
              onClick={() => onStartCooking(recipe)}
              className="flex-1 sm:flex-initial px-6 py-3.5 rounded-xl bg-[#1B4332] hover:bg-[#235842] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#1B4332]/30 active:scale-98 transition-all cursor-pointer whitespace-nowrap"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{t.startCooking}</span>
            </button>
          </div>
        </div>

        {/* Share Feedback Toast */}
        {showShareToast && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-semibold shadow-lg animate-in fade-in slide-in-from-top-2">
            {t.copiedToClipboard}
          </div>
        )}

        {/* Shopping List Added Toast */}
        {addedToast && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 px-4 py-2.5 bg-[#1B4332] text-white rounded-full text-xs font-bold shadow-xl border border-emerald-600 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-300" />
            <span>{addedToast}</span>
          </div>
        )}
      </div>
    </div>
  );
};
