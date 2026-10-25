import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Unlock, 
  Plus, 
  Trash2, 
  Check, 
  ChefHat, 
  Save, 
  Eye, 
  Key, 
  Layers, 
  Clock, 
  Download,
  AlertCircle,
  ClipboardPaste,
  ArrowRight,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Recipe, IngredientItem, CookingStep, DietaryType, DifficultyType, MealCategory, CuisineType } from '../types/recipe';
import { Language, TRANSLATIONS } from '../utils/i18n';
import { parseRecipeFromText } from '../utils/recipeTextParser';
import { RecipeImageUploader } from './RecipeImageUploader';

const SAMPLE_CHIMICHURRI = `### Chimichurri Sauce 🌿

Ingredients:
* 1 cup barik kata hua parsley
* 4 garlic cloves, barik kate hue
* 2 tbsp olive oil
* 1–2 tbsp lemon juice ya red wine vinegar
* ½ tsp chilli flakes
* ½ tsp oregano
* Salt aur black pepper taste ke according

Banane ka tarika:
* Parsley aur garlic ko barik kaat lo.
* Ek bowl mein saari ingredients daal do.
* Achhe se mix karo.
* 10–15 minute rest karne do, taaki flavours mix ho jaayein.
Bas, tumhari Chimichurri sauce ready!

Tip: Parsley nahi hai toh coriander use kar sakte ho. Paneer tikka, grilled chicken, sandwiches aur roasted vegetables ke saath achhi lagti hai.`;

interface CreatorStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  customRecipes: Recipe[];
  onSaveRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (recipeId: string) => void;
  language: Language;
}

export const CreatorStudioModal: React.FC<CreatorStudioModalProps> = ({
  isOpen,
  onClose,
  customRecipes,
  onSaveRecipe,
  onDeleteRecipe,
  language,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];

  // Password authentication state
  const [storedPassword, setStoredPassword] = useState<string>(() => {
    return localStorage.getItem('ubal_creator_pin') || 'ubal123';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Active studio tab - defaults to magic auto-paste
  const [activeTab, setActiveTab] = useState<'auto-paste' | 'create' | 'manage' | 'security'>('auto-paste');
  const [pasteText, setPasteText] = useState(SAMPLE_CHIMICHURRI);
  const [parsedRecipe, setParsedRecipe] = useState<Recipe | null>(null);
  const [parseSuccessMsg, setParseSuccessMsg] = useState('');

  // Form states for adding recipe
  const [nameEn, setNameEn] = useState('');
  const [nameHi, setNameHi] = useState('');
  const [taglineEn, setTaglineEn] = useState('');
  const [taglineHi, setTaglineHi] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionHi, setDescriptionHi] = useState('');
  const [prepTime, setPrepTime] = useState<number>(10);
  const [cookTime, setCookTime] = useState<number>(15);
  const [defaultServings, setDefaultServings] = useState<number>(2);
  const [difficulty, setDifficulty] = useState<DifficultyType>('Easy');
  const [dietary, setDietary] = useState<DietaryType>('Veg');
  const [mealCategory, setMealCategory] = useState<MealCategory>('Lunch');
  const [cuisine, setCuisine] = useState<CuisineType>('North Indian');
  const [image, setImage] = useState<string>('/src/assets/images/recipe_biryani_pulao_1792785764334.jpg');

  // Ingredients builder
  const [ingredients, setIngredients] = useState<IngredientItem[]>([
    { id: 'potato', nameEn: 'Potato', nameHi: 'आलू', amount: 2, unit: 'medium', isRequired: true },
    { id: 'onion', nameEn: 'Onion', nameHi: 'प्याज़', amount: 1, unit: 'medium', isRequired: true },
    { id: 'salt', nameEn: 'Salt', nameHi: 'नमक', amount: 1, unit: 'tsp', isRequired: true, isPantryStaple: true },
  ]);

  // Steps builder
  const [steps, setSteps] = useState<CookingStep[]>([
    {
      stepNumber: 1,
      instructionEn: 'Chop the vegetables and prepare all spices.',
      instructionHi: 'सब्जियों को काट लें और सभी मसाले तैयार कर लें।',
      durationMinutes: 5,
      timerSeconds: 300,
    },
    {
      stepNumber: 2,
      instructionEn: 'Cook over medium heat until fragrant and tender.',
      instructionHi: 'मध्यम आंच पर महक आने और पकने तक भूनें।',
      durationMinutes: 10,
      timerSeconds: 600,
    },
  ]);

  // New ingredient form inputs
  const [newIngNameEn, setNewIngNameEn] = useState('');
  const [newIngNameHi, setNewIngNameHi] = useState('');
  const [newIngAmount, setNewIngAmount] = useState<number>(1);
  const [newIngUnit, setNewIngUnit] = useState('tsp');
  const [newIngRequired, setNewIngRequired] = useState(true);

  // New step form inputs
  const [newStepEn, setNewStepEn] = useState('');
  const [newStepHi, setNewStepHi] = useState('');
  const [newStepMinutes, setNewStepMinutes] = useState(5);

  // New password form input
  const [newPin, setNewPin] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  // Password verification
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPassword.trim() === storedPassword.trim()) {
      setIsAuthenticated(true);
      setPasswordError(false);
      setEnteredPassword('');
    } else {
      setPasswordError(true);
    }
  };

  // Quick Auto-Parse from Pasted Text
  const handleAutoParse = () => {
    if (!pasteText.trim()) return;
    const result = parseRecipeFromText(pasteText);
    setParsedRecipe(result.recipe);
    setParseSuccessMsg(
      language === 'hi' 
        ? `सफलता! ${result.rawIngredientsCount} सामग्री और ${result.rawStepsCount} स्टेप्स सही तरीके से अलग हो गए!`
        : `Success! Formatted ${result.rawIngredientsCount} ingredients and ${result.rawStepsCount} cooking steps!`
    );
  };

  const handlePublishParsed = () => {
    if (!parsedRecipe) return;
    onSaveRecipe(parsedRecipe);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setParsedRecipe(null);
    setActiveTab('manage');
  };

  const handleEditParsedInForm = () => {
    if (!parsedRecipe) return;
    setNameEn(parsedRecipe.nameEn);
    setNameHi(parsedRecipe.nameHi);
    setTaglineEn(parsedRecipe.taglineEn || '');
    setTaglineHi(parsedRecipe.taglineHi || '');
    setDescriptionEn(parsedRecipe.descriptionEn);
    setDescriptionHi(parsedRecipe.descriptionHi);
    setPrepTime(parsedRecipe.prepTime);
    setCookTime(parsedRecipe.cookTime);
    setDefaultServings(parsedRecipe.defaultServings);
    setDifficulty(parsedRecipe.difficulty);
    setDietary(parsedRecipe.dietary);
    setMealCategory(parsedRecipe.mealCategory);
    setCuisine(parsedRecipe.cuisine);
    setImage(parsedRecipe.image);
    setIngredients(parsedRecipe.ingredients);
    setSteps(parsedRecipe.steps);
    setActiveTab('create');
  };

  // Add ingredient to current recipe draft
  const handleAddIngredient = () => {
    if (!newIngNameEn.trim() && !newIngNameHi.trim()) return;
    const item: IngredientItem = {
      id: `ing_${Date.now()}`,
      nameEn: newIngNameEn.trim() || newIngNameHi.trim(),
      nameHi: newIngNameHi.trim() || newIngNameEn.trim(),
      amount: Number(newIngAmount) || 1,
      unit: newIngUnit.trim() || 'pieces',
      isRequired: newIngRequired,
    };
    setIngredients(prev => [...prev, item]);
    setNewIngNameEn('');
    setNewIngNameHi('');
    setNewIngAmount(1);
  };

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  // Add step to current recipe draft
  const handleAddStep = () => {
    if (!newStepEn.trim() && !newStepHi.trim()) return;
    const step: CookingStep = {
      stepNumber: steps.length + 1,
      instructionEn: newStepEn.trim() || newStepHi.trim(),
      instructionHi: newStepHi.trim() || newStepEn.trim(),
      durationMinutes: newStepMinutes,
      timerSeconds: newStepMinutes * 60,
    };
    setSteps(prev => [...prev, step]);
    setNewStepEn('');
    setNewStepHi('');
  };

  const removeStep = (index: number) => {
    setSteps(prev => {
      const filtered = prev.filter((_, i) => i !== index);
      return filtered.map((s, i) => ({ ...s, stepNumber: i + 1 }));
    });
  };

  // Publish the recipe!
  const handlePublishRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn.trim() && !nameHi.trim()) return;

    const newRecipe: Recipe = {
      id: `custom_${Date.now()}`,
      nameEn: nameEn.trim() || nameHi.trim(),
      nameHi: nameHi.trim() || nameEn.trim(),
      taglineEn: taglineEn.trim() || 'Fresh homemade recipe by creator',
      taglineHi: taglineHi.trim() || 'क्रिएटर की ताज़ा स्पेशल रेसिपी',
      descriptionEn: descriptionEn.trim() || 'A delicious dish created with kitchen ingredients.',
      descriptionHi: descriptionHi.trim() || 'रसोई के सामान से बनी स्वादिष्ट स्पेशल रेसिपी।',
      prepTime: Number(prepTime) || 10,
      cookTime: Number(cookTime) || 15,
      totalTime: (Number(prepTime) || 10) + (Number(cookTime) || 15),
      defaultServings: Number(defaultServings) || 2,
      difficulty,
      dietary,
      mealCategory,
      cuisine,
      ingredients,
      steps,
      tipsEn: ['Cook with patience on medium heat for best aroma.'],
      tipsHi: ['बढ़िया स्वाद और खुशबू के लिए मध्यम आंच पर प्यार से पकाएं।'],
      allergensEn: [],
      allergensHi: [],
      image,
      featured: true,
    };

    onSaveRecipe(newRecipe);

    // Reset form
    setNameEn('');
    setNameHi('');
    setTaglineEn('');
    setTaglineHi('');
    setDescriptionEn('');
    setDescriptionHi('');

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    setActiveTab('manage');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPin.trim()) return;
    localStorage.setItem('ubal_creator_pin', newPin.trim());
    setStoredPassword(newPin.trim());
    setNewPin('');
    setPinChangeSuccess(true);
    setTimeout(() => setPinChangeSuccess(false), 3000);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(customRecipes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "ubal_kitchen_custom_recipes.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-[#FAF7F2] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8E1D5] max-h-[94vh] flex flex-col relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="px-6 py-4 bg-[#1B4332] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E76F51] flex items-center justify-center shadow-xs">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg tracking-tight">
                  {language === 'hi' ? 'उबाल किचन — पर्सनल क्रिएटर स्टूडियो' : 'Ubal Kitchen — Personal Creator Studio'}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-stone-950 uppercase">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">
                {language === 'hi' ? 'यहाँ अपनी रेसिपी डालें, यह तुरंत पूरे ऐप में दिखेगी' : 'Add your secret recipes to appear across the app'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto flex-1 p-6">
          {!isAuthenticated ? (
            /* PIN / Password Lock Screen */
            <div className="max-w-md mx-auto py-10 space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-stone-100 border border-stone-200 text-[#1B4332] flex items-center justify-center mx-auto shadow-xs">
                <Lock className="w-8 h-8 text-[#E76F51]" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-900">
                  {language === 'hi' ? 'पर्सनल पैनल पासवर्ड दर्ज करें' : 'Enter Secret Creator Password'}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  {language === 'hi' 
                    ? 'यह पैनल केवल आपके लिए सुरक्षित है (डिफ़ॉल्ट पासवर्ड: ubal123)' 
                    : 'Protected creator area. (Default password: ubal123)'}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <input
                    type="password"
                    value={enteredPassword}
                    onChange={(e) => {
                      setEnteredPassword(e.target.value);
                      setPasswordError(false);
                    }}
                    placeholder="Enter Secret Password..."
                    className="w-full px-4 py-3 bg-white border border-[#E8E1D5] rounded-2xl text-center text-sm font-semibold tracking-wider text-stone-900 focus:outline-none focus:border-[#1B4332] shadow-2xs"
                    autoFocus
                  />
                </div>

                {passwordError && (
                  <div className="text-xs font-semibold text-red-600 flex items-center justify-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{language === 'hi' ? 'गलत पासवर्ड! कृपया सही पासवर्ड डालें।' : 'Incorrect password!'}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1B4332] hover:bg-[#235842] text-white font-bold text-sm rounded-2xl shadow-md cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>{language === 'hi' ? 'पैनल अनलॉक करें' : 'Unlock Studio'}</span>
                </button>
              </form>

              <div className="p-3 bg-stone-100 rounded-xl text-[11px] text-stone-600">
                💡 <strong>Tip:</strong> {language === 'hi' ? 'अनलॉक होने के बाद आप अपना पासवर्ड भी बदल सकते हैं।' : 'You can change your password inside the studio.'}
              </div>
            </div>
          ) : (
            /* Unlocked Creator Studio Workspace */
            <div className="space-y-6">
              {/* Studio Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-[#E8E1D5] pb-3">
                <button
                  onClick={() => setActiveTab('auto-paste')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'auto-paste'
                      ? 'bg-[#E76F51] text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-[#E8E1D5] hover:bg-stone-50'
                  }`}
                >
                  <ClipboardPaste className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'क्विक ऑटो-पेस्ट' : 'Quick Auto-Paste'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('create')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'create'
                      ? 'bg-[#1B4332] text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-[#E8E1D5] hover:bg-stone-50'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'मैन्युअल फॉर्म' : 'Manual Form'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('manage')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'manage'
                      ? 'bg-[#1B4332] text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-[#E8E1D5] hover:bg-stone-50'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>
                    {language === 'hi' ? 'मेरी रेसिपीज़' : 'My Recipes'} ({customRecipes.length})
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'security'
                      ? 'bg-[#1B4332] text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-[#E8E1D5] hover:bg-stone-50'
                  }`}
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'पासवर्ड' : 'Security'}</span>
                </button>
              </div>

              {/* TAB 0: QUICK AUTO-PASTE & PARSE */}
              {activeTab === 'auto-paste' && (
                <div className="space-y-6">
                  {/* Intro Banner */}
                  <div className="bg-gradient-to-r from-stone-100 via-emerald-50/50 to-stone-100 border border-stone-200/80 rounded-2xl p-4.5 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shadow-xs">
                        <ClipboardPaste className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm sm:text-base text-stone-900">
                          {language === 'hi' 
                            ? 'रेसिपी ऑटो-फ़ॉर्मेटर (Quick Text to Recipe)' 
                            : 'Quick Text to Recipe Formatter'}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-stone-600">
                          {language === 'hi'
                            ? 'WhatsApp, YouTube, Instagram या नोट्स से रेसिपी टेक्स्ट यहाँ पेस्ट करें। नाम, सामग्री की मात्रा, स्टेप्स और टाइमर अपने आप तैयार हो जाएंगे!'
                            : 'Paste recipe text in any format. Title, ingredients, amounts, steps, and timers format automatically!'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Input Box with Quick Actions */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] space-y-3 shadow-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                        <ClipboardPaste className="w-4 h-4 text-[#E76F51]" />
                        <span>{language === 'hi' ? 'रेसिपी टेक्स्ट पेस्ट करें:' : 'Paste Raw Recipe Text:'}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setPasteText(SAMPLE_CHIMICHURRI);
                            setParsedRecipe(null);
                            setParseSuccessMsg('');
                          }}
                          className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-1"
                        >
                          <span>🌿 Chimichurri Sauce उदाहरण भरें</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setPasteText('');
                            setParsedRecipe(null);
                            setParseSuccessMsg('');
                          }}
                          className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-lg text-[11px] font-medium cursor-pointer transition-colors"
                        >
                          {language === 'hi' ? 'साफ़ करें' : 'Clear'}
                        </button>
                      </div>
                    </div>

                    <textarea
                      rows={8}
                      value={pasteText}
                      onChange={(e) => setPasteText(e.target.value)}
                      placeholder={
                        language === 'hi'
                          ? 'यहाँ रेसिपी टेक्स्ट पेस्ट करें (उदा. WhatsApp मेसेज, YouTube डिस्क्रिप्शन, या डायरी नोट्स)...'
                          : 'Paste recipe message here (e.g. from WhatsApp, notes, or YouTube)...'
                      }
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-xs sm:text-sm font-mono text-stone-800 focus:outline-none focus:border-[#1B4332] focus:bg-white transition-all leading-relaxed"
                    />

                    <button
                      type="button"
                      onClick={handleAutoParse}
                      disabled={!pasteText.trim()}
                      className="w-full py-3.5 bg-[#1B4332] hover:bg-[#235842] disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2"
                    >
                      <ChefHat className="w-4 h-4 text-emerald-300" />
                      <span>
                        {language === 'hi' 
                          ? 'रेसिपी में बदलें (Format Recipe)' 
                          : 'Convert & Format Recipe'}
                      </span>
                    </button>
                  </div>

                  {/* Parsed Result Preview */}
                  {parsedRecipe && (
                    <div className="bg-white rounded-2xl border-2 border-emerald-500/40 p-5 space-y-5 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                      {parseSuccessMsg && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{parseSuccessMsg}</span>
                        </div>
                      )}

                      {/* Recipe Header Card */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-lg font-extrabold text-[#1B4332]">
                              {parsedRecipe.nameHi}
                            </h4>
                            <span className="text-xs text-stone-500 font-semibold">
                              ({parsedRecipe.nameEn})
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 mt-1">
                            {parsedRecipe.descriptionHi || parsedRecipe.taglineHi}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {parsedRecipe.dietary}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-bold">
                            {parsedRecipe.mealCategory}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                            ⏱️ {parsedRecipe.totalTime}m
                          </span>
                        </div>
                      </div>

                      {/* Photo Selector / Phone Uploader */}
                      <RecipeImageUploader
                        currentImage={parsedRecipe.image}
                        onImageChange={(newImg) => setParsedRecipe({ ...parsedRecipe, image: newImg })}
                        language={language}
                      />

                      {/* Ingredients List */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-stone-800 block">
                          📋 {language === 'hi' ? 'पहचानी गई सामग्री' : 'Parsed Ingredients'} ({parsedRecipe.ingredients.length} items):
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {parsedRecipe.ingredients.map((ing, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2.5 bg-[#FAF7F2] rounded-xl text-xs border border-[#E8E1D5]">
                              <div className="flex items-center gap-1.5">
                                <span className="w-4 h-4 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-[9px] font-bold">
                                  {idx + 1}
                                </span>
                                <span className="font-bold text-stone-800">{ing.nameEn}</span>
                                <span className="text-stone-500">· {ing.amount} {ing.unit}</span>
                              </div>
                              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                                ing.isRequired ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {ing.isRequired ? 'Required' : 'Optional'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Steps List */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-stone-800 block">
                          🍳 {language === 'hi' ? 'बनाने की विधि' : 'Cooking Instructions'} ({parsedRecipe.steps.length} steps):
                        </span>
                        <div className="space-y-2">
                          {parsedRecipe.steps.map((st, idx) => (
                            <div key={idx} className="p-2.5 bg-[#FAF7F2] rounded-xl text-xs border border-[#E8E1D5] flex items-start justify-between gap-2">
                              <div>
                                <span className="font-bold text-[#1B4332] block text-[11px]">
                                  Step {st.stepNumber}
                                </span>
                                <p className="text-stone-800 font-medium">{st.instructionHi}</p>
                              </div>
                              {st.durationMinutes && (
                                <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-bold text-[10px] shrink-0">
                                  ⏳ {st.durationMinutes}m timer
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Chef Tip if any */}
                      {parsedRecipe.tipsHi && parsedRecipe.tipsHi.length > 0 && (
                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 space-y-0.5">
                          <strong className="block font-bold">💡 Chef's Secret Tip:</strong>
                          <p>{parsedRecipe.tipsHi[0]}</p>
                        </div>
                      )}

                      {/* Action Decision Buttons */}
                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={handlePublishParsed}
                          className="py-3.5 bg-[#E76F51] hover:bg-[#D65F42] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>
                            {language === 'hi' 
                              ? 'तुरंत ऐप में पब्लिश करें (Publish to App)' 
                              : 'Publish to App Instantly!'}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={handleEditParsedInForm}
                          className="py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm rounded-xl border border-stone-300 cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2"
                        >
                          <span>✏️ फॉर्म में चेक व एडिट करें (Review in Form)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 1: ADD NEW RECIPE */}
              {activeTab === 'create' && (
                <form onSubmit={handlePublishRecipe} className="space-y-6">
                  {/* Basic Info */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] space-y-4">
                    <h3 className="font-bold text-sm text-stone-900 border-b pb-2">
                      1. {language === 'hi' ? 'रेसिपी का नाम और विवरण' : 'Recipe Name & Details'}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1">
                          Name in English *
                        </label>
                        <input
                          type="text"
                          required
                          value={nameEn}
                          onChange={(e) => setNameEn(e.target.value)}
                          placeholder="e.g. Masala Paneer Roll"
                          className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:border-[#1B4332]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1">
                          हिंदी में नाम (Hindi Name) *
                        </label>
                        <input
                          type="text"
                          required
                          value={nameHi}
                          onChange={(e) => setNameHi(e.target.value)}
                          placeholder="उदा. मसाला पनीर रोल"
                          className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:border-[#1B4332]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1">
                          Tagline / One-liner (English)
                        </label>
                        <input
                          type="text"
                          value={taglineEn}
                          onChange={(e) => setTaglineEn(e.target.value)}
                          placeholder="e.g. Crispy rolls filled with spiced cottage cheese"
                          className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:border-[#1B4332]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-stone-700 block mb-1">
                          टैगलाइन (Hindi)
                        </label>
                        <input
                          type="text"
                          value={taglineHi}
                          onChange={(e) => setTaglineHi(e.target.value)}
                          placeholder="उदा. चटपटे पनीर से भरे क्रिस्पी गरमा-गरम रोल"
                          className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:border-[#1B4332]"
                        />
                      </div>
                    </div>

                    {/* Category, Diet, Time */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      <div>
                        <label className="text-[11px] font-bold text-stone-600 block mb-1">Category</label>
                        <select
                          value={mealCategory}
                          onChange={(e) => setMealCategory(e.target.value as MealCategory)}
                          className="w-full px-2.5 py-2 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-xs text-stone-800 font-semibold"
                        >
                          <option value="Breakfast">Breakfast (नाश्ता)</option>
                          <option value="Lunch">Lunch (दोपहर)</option>
                          <option value="Dinner">Dinner (रात का खाना)</option>
                          <option value="Snacks">Snacks (स्नैक्स)</option>
                          <option value="Dessert">Dessert (मीठा)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-stone-600 block mb-1">Diet</label>
                        <select
                          value={dietary}
                          onChange={(e) => setDietary(e.target.value as DietaryType)}
                          className="w-full px-2.5 py-2 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-xs text-stone-800 font-semibold"
                        >
                          <option value="Veg">Veg (शाकाहारी)</option>
                          <option value="Non-Veg">Non-Veg (मांसाहारी)</option>
                          <option value="Egg">Egg (अंडा)</option>
                          <option value="Vegan">Vegan (वीगन)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-stone-600 block mb-1">Prep Time (mins)</label>
                        <input
                          type="number"
                          min="1"
                          max="180"
                          value={prepTime}
                          onChange={(e) => setPrepTime(Number(e.target.value))}
                          className="w-full px-2.5 py-2 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-xs text-stone-800 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-stone-600 block mb-1">Cook Time (mins)</label>
                        <input
                          type="number"
                          min="1"
                          max="180"
                          value={cookTime}
                          onChange={(e) => setCookTime(Number(e.target.value))}
                          className="w-full px-2.5 py-2 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-xs text-stone-800 font-bold"
                        />
                      </div>
                    </div>

                    {/* Recipe Photo Uploader */}
                    <div className="pt-2 border-t border-[#F0EBE1]">
                      <RecipeImageUploader
                        currentImage={image}
                        onImageChange={setImage}
                        language={language}
                      />
                    </div>
                  </div>

                  {/* Ingredients Builder */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h3 className="font-bold text-sm text-stone-900">
                        2. {language === 'hi' ? 'सामग्री सूची (Ingredients List)' : 'Ingredients List'} ({ingredients.length})
                      </h3>
                      <span className="text-[11px] text-stone-400">Pantry matcher uses these items</span>
                    </div>

                    {/* Current Ingredients Chips */}
                    <div className="space-y-2">
                      {ingredients.map((ing, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-[#FAF7F2] rounded-xl text-xs border border-[#E8E1D5]">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-[10px] font-bold">
                              {idx + 1}
                            </span>
                            <span className="font-bold text-stone-800">{ing.nameEn} ({ing.nameHi})</span>
                            <span className="text-stone-500">· {ing.amount} {ing.unit}</span>
                            {ing.isRequired ? (
                              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-1.5 py-0.2 rounded">Required</span>
                            ) : (
                              <span className="text-[10px] text-amber-700 font-semibold bg-amber-100 px-1.5 py-0.2 rounded">Optional</span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeIngredient(idx)}
                            className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add ingredient row */}
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
                      <span className="text-xs font-bold text-stone-700 block">+ Add Ingredient Item:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        <input
                          type="text"
                          placeholder="Name (English)"
                          value={newIngNameEn}
                          onChange={(e) => setNewIngNameEn(e.target.value)}
                          className="px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          placeholder="नाम (हिंदी)"
                          value={newIngNameHi}
                          onChange={(e) => setNewIngNameHi(e.target.value)}
                          className="px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                        />
                        <input
                          type="number"
                          placeholder="Qty (1, 2...)"
                          value={newIngAmount}
                          onChange={(e) => setNewIngAmount(Number(e.target.value))}
                          className="px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Unit (cups, tsp, g)"
                          value={newIngUnit}
                          onChange={(e) => setNewIngUnit(e.target.value)}
                          className="px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                        />
                        <button
                          type="button"
                          onClick={handleAddIngredient}
                          className="px-3 py-1.5 bg-[#1B4332] text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-[#235842] transition-colors col-span-2 sm:col-span-1"
                        >
                          + Add Item
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Steps Builder */}
                  <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h3 className="font-bold text-sm text-stone-900">
                        3. {language === 'hi' ? 'बनाने की विधि (Step-by-Step Instructions)' : 'Cooking Steps'} ({steps.length})
                      </h3>
                      <span className="text-[11px] text-stone-400">Step timer will work automatically</span>
                    </div>

                    <div className="space-y-2">
                      {steps.map((st, idx) => (
                        <div key={idx} className="p-3 bg-[#FAF7F2] rounded-xl text-xs border border-[#E8E1D5] flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <span className="font-bold text-[#1B4332] block">
                              Step {st.stepNumber} ({st.durationMinutes || 3} mins timer)
                            </span>
                            <p className="text-stone-800 font-medium">{st.instructionHi}</p>
                            <p className="text-stone-500 italic">{st.instructionEn}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeStep(idx)}
                            className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add step row */}
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
                      <span className="text-xs font-bold text-stone-700 block">+ Add Next Cooking Step:</span>
                      <textarea
                        rows={2}
                        placeholder="हिंदी में विधि (उदा. कड़ाही में तेल गर्म करें और जीरा चटकाएं...)"
                        value={newStepHi}
                        onChange={(e) => setNewStepHi(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                      <textarea
                        rows={1}
                        placeholder="Instruction in English (optional)"
                        value={newStepEn}
                        onChange={(e) => setNewStepEn(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-stone-500" />
                          <span className="text-xs text-stone-600">Step Timer:</span>
                          <input
                            type="number"
                            min="1"
                            max="60"
                            value={newStepMinutes}
                            onChange={(e) => setNewStepMinutes(Number(e.target.value))}
                            className="w-16 px-2 py-1 bg-white border border-stone-300 rounded-lg text-xs font-bold"
                          />
                          <span className="text-xs text-stone-500">mins</span>
                        </div>

                        <button
                          type="button"
                          onClick={handleAddStep}
                          className="px-4 py-1.5 bg-[#1B4332] text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-[#235842] transition-colors"
                        >
                          + Add Step
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Publish Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#E76F51] hover:bg-[#D65F42] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2"
                    >
                      <ChefHat className="w-5 h-5 text-white" />
                      <span>
                        {language === 'hi' ? 'रेसिपी पब्लिश करें (ऐप में लाइव हो जाएगी)' : 'Publish Recipe (Live in App Now!)'}
                      </span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: MANAGE MY RECIPES */}
              {activeTab === 'manage' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base text-stone-900">
                        {language === 'hi' ? 'मेरी पब्लिश की हुई रेसिपीज़' : 'Your Published Custom Recipes'}
                      </h3>
                      <p className="text-xs text-stone-500">
                        {customRecipes.length} {language === 'hi' ? 'रेसिपी एक्टिव हैं' : 'active custom dishes'}
                      </p>
                    </div>

                    {customRecipes.length > 0 && (
                      <button
                        onClick={handleExportJSON}
                        className="px-3.5 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export JSON</span>
                      </button>
                    )}
                  </div>

                  {customRecipes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {customRecipes.map(cr => (
                        <div key={cr.id} className="p-4 bg-white rounded-2xl border border-[#E8E1D5] flex flex-col justify-between gap-3 shadow-2xs">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="font-bold text-base text-stone-900">{cr.nameHi}</h4>
                                <span className="text-xs text-stone-500 font-medium">{cr.nameEn}</span>
                              </div>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                Live
                              </span>
                            </div>
                            <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                              {cr.taglineHi || cr.taglineEn}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                            <span>{cr.ingredients.length} items · {cr.steps.length} steps</span>
                            <button
                              onClick={() => onDeleteRecipe(cr.id)}
                              className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-10 text-center bg-white rounded-2xl border border-[#E8E1D5] text-stone-500 text-xs space-y-2">
                      <ChefHat className="w-10 h-10 text-stone-300 mx-auto" />
                      <p className="font-semibold text-stone-700 text-sm">
                        {language === 'hi' ? 'अभी तक कोई पर्सनल रेसिपी नहीं डाली गई है।' : 'No personal recipes added yet.'}
                      </p>
                      <button
                        onClick={() => setActiveTab('create')}
                        className="px-4 py-2 bg-[#1B4332] text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        + Create Your First Recipe
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SECURITY / CHANGE PIN */}
              {activeTab === 'security' && (
                <div className="max-w-md bg-white p-6 rounded-2xl border border-[#E8E1D5] space-y-4">
                  <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                    <Key className="w-4 h-4 text-[#1B4332]" />
                    <span>{language === 'hi' ? 'पैनल का पासवर्ड बदलें' : 'Change Secret Password'}</span>
                  </h3>
                  <p className="text-xs text-stone-500">
                    {language === 'hi' ? 'अपना नया गुप्त पासवर्ड सेट करें ताकि कोई और इसे न खोल सके।' : 'Set a new password for your private creator panel.'}
                  </p>

                  <form onSubmit={handleUpdatePassword} className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Enter new password (e.g. secret555)..."
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl text-xs font-bold text-stone-900"
                    />

                    {pinChangeSuccess && (
                      <div className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        <span>{language === 'hi' ? 'पासवर्ड सफलतापूर्वक बदल गया!' : 'Password updated successfully!'}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#1B4332] text-white rounded-xl font-bold text-xs cursor-pointer hover:bg-[#235842] transition-colors"
                    >
                      {language === 'hi' ? 'नया पासवर्ड सेव करें' : 'Save New Password'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
