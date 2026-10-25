import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Check, 
  Trash2, 
  Plus, 
  Share2, 
  Copy, 
  CheckCheck, 
  ChefHat, 
  Utensils, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ShoppingListItem, Recipe } from '../types/recipe';
import { Language, TRANSLATIONS } from '../utils/i18n';

// Clean SVG WhatsApp Icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M12.031 2c-5.508 0-9.985 4.477-9.985 9.985 0 1.761.459 3.479 1.331 4.992L2 22l5.187-1.36a9.92 9.92 0 004.844 1.251h.005c5.508 0 9.985-4.477 9.985-9.985 0-2.668-1.039-5.176-2.926-7.063A9.927 9.927 0 0012.031 2zm0 18.283h-.004a8.23 8.23 0 01-4.198-1.149l-.301-.179-3.118.818.832-3.04-.196-.312a8.232 8.232 0 01-1.266-4.436c0-4.558 3.708-8.266 8.253-8.266 2.208 0 4.283.861 5.845 2.423a8.217 8.217 0 012.422 5.845c0 4.558-3.708 8.266-8.267 8.266zm4.526-6.183c-.248-.124-1.467-.724-1.695-.807-.228-.083-.394-.124-.56.124-.166.248-.642.807-.787.973-.145.166-.29.186-.538.062a6.79 6.79 0 01-1.996-1.231 7.498 7.498 0 01-1.382-1.723c-.145-.248-.016-.382.108-.506.111-.111.248-.29.373-.435.124-.145.166-.248.248-.415.083-.166.042-.311-.021-.435-.062-.124-.56-1.349-.767-1.848-.201-.486-.405-.42-.56-.428l-.477-.008c-.166 0-.435.062-.663.311-.228.248-.871.851-.871 2.075 0 1.224.892 2.407 1.016 2.573.124.166 1.755 2.68 4.252 3.757.594.256 1.058.409 1.42.524.597.189 1.14.163 1.569.098.479-.071 1.467-.6 1.674-1.18.207-.58.207-1.077.145-1.18-.062-.104-.228-.166-.476-.29z" />
  </svg>
);

interface ShoppingListScreenProps {
  items: ShoppingListItem[];
  onToggleItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onClearCompleted: () => void;
  onClearAll: () => void;
  onAddCustomItem: (nameEn: string, nameHi: string, amount: number, unit: string) => void;
  onGoToPantry: () => void;
  onSelectRecipeById?: (recipeId: string) => void;
  allRecipes: Recipe[];
  language: Language;
}

export const ShoppingListScreen: React.FC<ShoppingListScreenProps> = ({
  items,
  onToggleItem,
  onRemoveItem,
  onClearCompleted,
  onClearAll,
  onAddCustomItem,
  onGoToPantry,
  onSelectRecipeById,
  allRecipes,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const [inputName, setInputName] = useState('');
  const [inputAmount, setInputAmount] = useState('');
  const [inputUnit, setInputUnit] = useState('');
  const [copyFeedback, setCopyFeedback] = useState(false);

  const completedCount = items.filter(i => i.isChecked).length;
  const pendingCount = items.length - completedCount;
  const progressPercent = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    
    const parsedAmount = inputAmount ? parseFloat(inputAmount) || 1 : 1;
    const unit = inputUnit.trim() || (language === 'hi' ? 'यूनिट' : 'unit');

    onAddCustomItem(inputName.trim(), inputName.trim(), parsedAmount, unit);
    setInputName('');
    setInputAmount('');
    setInputUnit('');
  };

  const handleShareWhatsApp = () => {
    if (items.length === 0) return;

    let text = language === 'hi' 
      ? `🛒 *उबाल किचन — राशन / किराना खरीदारी सूची*\n\n`
      : `🛒 *Ubal Kitchen — Grocery Shopping List*\n\n`;

    items.forEach(item => {
      const checkMark = item.isChecked ? '✅' : '◻️';
      const name = language === 'hi' ? item.nameHi : item.nameEn;
      const recipeRef = item.recipeSourceNameHi || item.recipeSourceNameEn 
        ? ` _(${language === 'hi' ? item.recipeSourceNameHi : item.recipeSourceNameEn})_` 
        : '';
      const amountStr = item.amount > 0 ? ` - ${item.amount} ${item.unit}` : '';
      text += `${checkMark} *${name}*${amountStr}${recipeRef}\n`;
    });

    text += `\n🍳 _Ubal Kitchen — जो घर में है, उसी से कुछ नया!_`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyList = async () => {
    if (items.length === 0) return;

    let text = language === 'hi' 
      ? `🛒 उबाल किचन — किराना खरीदारी सूची:\n\n`
      : `🛒 Ubal Kitchen — Grocery Shopping List:\n\n`;

    items.forEach(item => {
      const checkMark = item.isChecked ? '[x]' : '[ ]';
      const name = language === 'hi' ? `${item.nameHi} (${item.nameEn})` : `${item.nameEn} (${item.nameHi})`;
      const amountStr = item.amount > 0 ? ` - ${item.amount} ${item.unit}` : '';
      text += `${checkMark} ${name}${amountStr}\n`;
    });

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    }
  };

  // Group items by recipe source
  const groupedItems = React.useMemo(() => {
    const groups: { [key: string]: { labelEn: string; labelHi: string; recipeId?: string; list: ShoppingListItem[] } } = {};

    items.forEach(item => {
      const key = item.recipeSourceId || 'custom';
      if (!groups[key]) {
        groups[key] = {
          labelEn: item.recipeSourceNameEn || 'Custom Items',
          labelHi: item.recipeSourceNameHi || 'कस्टम सामान',
          recipeId: item.recipeSourceId,
          list: [],
        };
      }
      groups[key].list.push(item);
    });

    return Object.values(groups);
  }, [items]);

  const quickStapleSuggestions = [
    { en: 'Coriander leaves', hi: 'ताज़ा हरा धनिया', amount: 1, unit: 'bunch' },
    { en: 'Paneer', hi: 'ताज़ा पनीर', amount: 200, unit: 'g' },
    { en: 'Ginger', hi: 'अदरक', amount: 100, unit: 'g' },
    { en: 'Kasuri Methi', hi: 'कसूरी मेथी', amount: 1, unit: 'pack' },
    { en: 'Curd / Dahi', hi: 'ताज़ा दही', amount: 500, unit: 'g' },
    { en: 'Garam Masala', hi: 'गरम मसाला', amount: 1, unit: 'pack' },
  ];

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold tracking-wide">
            <ShoppingBag className="w-3.5 h-3.5 text-[#E76F51]" />
            <span>{language === 'hi' ? 'स्मार्ट बाज़ार लिस्ट' : 'Smart Grocery Tracker'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.shoppingList}
          </h1>

          <p className="text-emerald-100 text-xs sm:text-sm font-medium leading-relaxed">
            {t.shoppingListSubtitle}
          </p>

          {/* Progress & Quick Stats */}
          {items.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-emerald-200">
                  {completedCount} {t.itemsPurchased} · {pendingCount} {t.itemsPending}
                </span>
                <span className="text-white tabular-nums">{progressPercent}%</span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#E76F51] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Decorative corner icon */}
        <ShoppingBag className="absolute -bottom-6 -right-6 w-36 h-36 text-white/5 pointer-events-none stroke-1" />
      </div>

      {/* Action Toolbar */}
      {items.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-[#E8E1D5] shadow-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="px-3.5 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-transform active:scale-95 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>{t.shareShoppingList}</span>
            </button>

            <button
              onClick={handleCopyList}
              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copyFeedback ? (
                <>
                  <CheckCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">{language === 'hi' ? 'कॉपी हो गया!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-500" />
                  <span>{language === 'hi' ? 'लिस्ट कॉपी करें' : 'Copy List'}</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {completedCount > 0 && (
              <button
                onClick={onClearCompleted}
                className="px-3 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-50 rounded-xl transition-colors cursor-pointer"
              >
                {t.clearCompleted} ({completedCount})
              </button>
            )}

            <button
              onClick={onClearAll}
              className="px-3 py-1.5 text-xs font-semibold text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
            >
              {t.clearAllItems}
            </button>
          </div>
        </div>
      )}

      {/* Add Custom Item Card */}
      <div className="bg-white rounded-2xl border border-[#E8E1D5] p-4 sm:p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-extrabold text-stone-900 flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-[#1B4332]" />
          <span>{t.addCustomItem}</span>
        </h3>

        <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder={t.itemPlaceholder}
            className="flex-1 w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#1B4332]"
          />

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder={language === 'hi' ? 'मात्रा (उदा. 250)' : 'Qty (e.g. 250)'}
              className="w-28 px-3 py-2 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#1B4332]"
            />

            <input
              type="text"
              value={inputUnit}
              onChange={(e) => setInputUnit(e.target.value)}
              placeholder={language === 'hi' ? 'इकाई (g/kg)' : 'Unit (g/kg)'}
              className="w-24 px-3 py-2 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#1B4332]"
            />

            <button
              type="submit"
              disabled={!inputName.trim()}
              className="px-4 py-2 bg-[#1B4332] hover:bg-[#235842] disabled:opacity-40 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'hi' ? 'जोड़ें' : 'Add'}</span>
            </button>
          </div>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-[11px] font-semibold text-stone-400">
            {language === 'hi' ? 'जल्दी जोड़ें:' : 'Quick add:'}
          </span>
          {quickStapleSuggestions.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onAddCustomItem(s.en, s.hi, s.amount, s.unit)}
              className="text-[11px] px-2.5 py-1 bg-stone-50 hover:bg-[#FAF7F2] border border-stone-200 text-stone-700 hover:text-[#1B4332] rounded-lg transition-colors cursor-pointer"
            >
              + {language === 'hi' ? s.hi : s.en}
            </button>
          ))}
        </div>
      </div>

      {/* Main List Display */}
      {items.length > 0 ? (
        <div className="space-y-6">
          {/* All items bought congratulations */}
          {items.length > 0 && pendingCount === 0 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-emerald-950">
                    {t.allBoughtMessage}
                  </h4>
                  <p className="text-xs text-emerald-800">
                    {language === 'hi' 
                      ? 'पेंट्री मैचर में जाकर तुरंत स्वादिष्ट खाना बनाना शुरू करें!' 
                      : 'Head to Pantry Matcher to start cooking your matching recipes!'}
                  </p>
                </div>
              </div>

              <button
                onClick={onGoToPantry}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <span>{language === 'hi' ? 'पेंट्री मैचर खोलें' : 'Open Matcher'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Grouped by Recipe Source */}
          {groupedItems.map((group, groupIdx) => (
            <div key={groupIdx} className="bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden shadow-xs">
              {/* Group Header */}
              <div className="bg-[#FAF7F2] px-4 py-3 border-b border-[#E8E1D5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#1B4332]" />
                  <span className="font-bold text-xs sm:text-sm text-stone-900">
                    {language === 'hi' ? group.labelHi : group.labelEn}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    ({group.list.length})
                  </span>
                </div>

                {group.recipeId && onSelectRecipeById && (
                  <button
                    onClick={() => onSelectRecipeById(group.recipeId!)}
                    className="text-xs font-bold text-[#1B4332] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{language === 'hi' ? 'रेसिपी देखें' : 'View Recipe'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Items in this group */}
              <div className="divide-y divide-[#F0EBE1]">
                {group.list.map(item => (
                  <div
                    key={item.id}
                    className={`p-3.5 flex items-center justify-between gap-3 transition-colors ${
                      item.isChecked ? 'bg-stone-50/70 text-stone-400' : 'hover:bg-[#FAF7F2]/60'
                    }`}
                  >
                    {/* Checkbox and item labels */}
                    <div 
                      onClick={() => onToggleItem(item.id)}
                      className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                        item.isChecked 
                          ? 'bg-emerald-600 text-white' 
                          : 'border-2 border-stone-300 bg-white hover:border-[#1B4332]'
                      }`}>
                        {item.isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold truncate ${
                            item.isChecked ? 'line-through text-stone-400' : 'text-stone-900'
                          }`}>
                            {language === 'hi' ? item.nameHi : item.nameEn}
                          </span>
                          {item.amount > 0 && (
                            <span className="text-xs font-bold text-[#1B4332] bg-emerald-50 px-2 py-0.5 rounded-md shrink-0 tabular-nums">
                              {item.amount} {item.unit}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-400 truncate">
                          {language === 'hi' ? item.nameEn : item.nameHi}
                        </p>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="w-8 h-8 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                      title={language === 'hi' ? 'हटाएं' : 'Remove'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-white rounded-3xl border border-[#E8E1D5] space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center mx-auto text-[#1B4332]">
            <ShoppingBag className="w-8 h-8 text-[#1B4332]/60 stroke-1" />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-extrabold text-lg text-stone-900">{t.emptyShoppingList}</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
              {t.emptyShoppingListDesc}
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={onGoToPantry}
              className="px-5 py-2.5 bg-[#1B4332] hover:bg-[#235842] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Utensils className="w-4 h-4 text-[#E76F51]" />
              <span>{language === 'hi' ? 'पेंट्री मैचर में सामग्री देखें' : 'Match Recipes in Pantry'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
