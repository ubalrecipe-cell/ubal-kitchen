import { Recipe, IngredientItem, CookingStep, DietaryType, DifficultyType, MealCategory, CuisineType } from '../types/recipe';

// Helper to convert unicode fractions or fractions to decimals
function parseFraction(str: string): number {
  const trimmed = str.trim();
  if (trimmed === '½') return 0.5;
  if (trimmed === '¼') return 0.25;
  if (trimmed === '¾') return 0.75;
  if (trimmed === '⅓') return 0.33;
  if (trimmed === '⅔') return 0.67;
  if (trimmed === '⅛') return 0.125;
  
  if (trimmed.includes('–') || trimmed.includes('-')) {
    const parts = trimmed.split(/[–-]/);
    const last = parseFloat(parts[parts.length - 1]);
    if (!isNaN(last)) return last;
  }
  
  if (trimmed.includes('/')) {
    const [num, den] = trimmed.split('/');
    const n = parseFloat(num);
    const d = parseFloat(den);
    if (!isNaN(n) && !isNaN(d) && d !== 0) return n / d;
  }
  
  const val = parseFloat(trimmed);
  return isNaN(val) ? 1 : val;
}

// Convert English/Hinglish common words to nice Hindi text
const HINDI_MAP: Record<string, string> = {
  parsley: 'पार्सले (Parsley)',
  garlic: 'लहसुन (Garlic)',
  'olive oil': 'जैतून का तेल (Olive Oil)',
  'lemon juice': 'नींबू का रस (Lemon Juice)',
  vinegar: 'सिरका (Vinegar)',
  'chilli flakes': 'चिली फ्लेक्स (Chilli Flakes)',
  oregano: 'ओरेगैनो (Oregano)',
  salt: 'नमक (Salt)',
  'black pepper': 'काली मिर्च (Black Pepper)',
  onion: 'प्याज़ (Onion)',
  tomato: 'टमाटर (Tomato)',
  potato: 'आलू (Potato)',
  coriander: 'धनिया (Coriander)',
  paneer: 'पनीर (Paneer)',
  chicken: 'चिकन (Chicken)',
  chilli: 'हरी मिर्च (Green Chilli)',
  cumin: 'जीरा (Jeera)',
  turmeric: 'हल्दी (Turmeric)',
  ginger: 'अदरक (Ginger)',
  oil: 'तेल (Oil)',
  butter: 'मक्खन (Butter)',
};

export interface ParsedRecipeResult {
  recipe: Recipe;
  rawIngredientsCount: number;
  rawStepsCount: number;
}

export function parseRecipeFromText(rawText: string): ParsedRecipeResult {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  
  let title = 'Special Homemade Recipe';
  let titleHi = 'स्पेशल होममेड रेसिपी';
  let tagline = 'Delicious homemade recipe with rich kitchen flavors';
  let taglineHi = 'रसोई के ताज़ा मसालों से तैयार स्वादिष्ट रेसिपी';
  
  let ingredientsSection: string[] = [];
  let instructionsSection: string[] = [];
  let tipSection: string[] = [];
  
  let currentMode: 'title' | 'ingredients' | 'instructions' | 'tip' = 'title';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lower = line.toLowerCase();

    // Check header keywords
    if (/^(#+|\*{2,})?\s*(ingredients|samagri|samagree|सामग्री)/i.test(line)) {
      currentMode = 'ingredients';
      continue;
    } else if (/^(#+|\*{2,})?\s*(banane ka tarika|vidhi|tarika|method|instructions|steps|विधि|तरीका|how to make)/i.test(line)) {
      currentMode = 'instructions';
      continue;
    } else if (/^(tip|note|सुझाव|टिप):/i.test(line)) {
      currentMode = 'tip';
      tipSection.push(line.replace(/^(tip|note|सुझाव|टिप):\s*/i, ''));
      continue;
    }

    if (currentMode === 'title') {
      if (line.startsWith('#') || line.startsWith('*') || i === 0) {
        // Clean title
        const cleanTitle = line.replace(/^[#*\s]+|[#*\s]+$/g, '').trim();
        if (cleanTitle && !cleanTitle.toLowerCase().includes('ingredient')) {
          title = cleanTitle;
          titleHi = cleanTitle;
          currentMode = 'title';
        }
      }
    } else if (currentMode === 'ingredients') {
      if (line.startsWith('*') || line.startsWith('-') || line.startsWith('•') || /^\d+[\.\)]/.test(line)) {
        ingredientsSection.push(line);
      } else if (line.length > 2 && !line.includes(':')) {
        ingredientsSection.push(line);
      }
    } else if (currentMode === 'instructions') {
      if (line.toLowerCase().startsWith('tip:') || line.toLowerCase().startsWith('note:')) {
        currentMode = 'tip';
        tipSection.push(line.replace(/^(tip|note|सुझाव|टिप):\s*/i, ''));
      } else if (line.toLowerCase().startsWith('bas,') || line.toLowerCase().startsWith('enjoy')) {
        // Optional concluding note
        instructionsSection.push(line);
      } else if (line.startsWith('*') || line.startsWith('-') || line.startsWith('•') || /^\d+[\.\)]/.test(line)) {
        instructionsSection.push(line);
      } else if (line.length > 3) {
        instructionsSection.push(line);
      }
    } else if (currentMode === 'tip') {
      tipSection.push(line);
    }
  }

  // Parse Ingredients
  const parsedIngredients: IngredientItem[] = [];
  const unitRegex = /\b(cup|cups|tbsp|tsp|tablespoon|teaspoon|clove|cloves|piece|pieces|gm|g|kg|ml|pinch|katori|bunch)\b/i;
  const qtyRegex = /^[\*\-•\s]*([0-9½¼¾⅓⅔⅛\.\/–-]+)/;

  ingredientsSection.forEach((raw, idx) => {
    let clean = raw.replace(/^[\*\-•\d\.\)\s]+/, '').trim();
    if (!clean) return;

    let amount = 1;
    let unit = 'item';
    let isRequired = true;

    // Detect optional
    if (clean.toLowerCase().includes('optional') || clean.toLowerCase().includes('agar ho toh') || clean.toLowerCase().includes('ya ')) {
      isRequired = false;
    }

    // Match amount
    const qtyMatch = clean.match(/^([0-9½¼¾⅓⅔⅛\.\/–-]+)\s*/);
    if (qtyMatch) {
      amount = parseFraction(qtyMatch[1]);
      clean = clean.replace(qtyMatch[0], '').trim();
    }

    // Match unit
    const unitMatch = clean.match(unitRegex);
    if (unitMatch) {
      unit = unitMatch[1].toLowerCase();
      clean = clean.replace(unitMatch[0], '').replace(/^,\s*/, '').trim();
    } else if (clean.toLowerCase().includes('taste ke according') || clean.toLowerCase().includes('swadanusar') || clean.toLowerCase().includes('to taste')) {
      unit = 'to taste';
      clean = clean.replace(/(taste ke according|swadanusar|to taste|as per taste)/i, '').trim();
    }

    const nameEn = clean.replace(/,\s*$/, '').trim();
    let nameHi = nameEn;
    const lowerName = nameEn.toLowerCase();

    for (const [key, val] of Object.entries(HINDI_MAP)) {
      if (lowerName.includes(key)) {
        nameHi = nameEn + ' (' + val + ')';
        break;
      }
    }

    parsedIngredients.push({
      id: `ing_auto_${Date.now()}_${idx}`,
      nameEn: nameEn.length > 0 ? nameEn : `Ingredient ${idx + 1}`,
      nameHi: nameHi.length > 0 ? nameHi : nameEn,
      amount,
      unit,
      isRequired,
      isPantryStaple: lowerName.includes('salt') || lowerName.includes('oil') || lowerName.includes('pepper'),
    });
  });

  // If no ingredients were detected, create a fallback
  if (parsedIngredients.length === 0) {
    parsedIngredients.push({
      id: `ing_fallback_${Date.now()}`,
      nameEn: 'Fresh Ingredients as required',
      nameHi: 'स्वादानुसार ताज़ी सामग्री',
      amount: 1,
      unit: 'portion',
      isRequired: true,
    });
  }

  // Parse Instructions
  const parsedSteps: CookingStep[] = [];
  instructionsSection.forEach((raw, idx) => {
    let clean = raw.replace(/^[\*\-•\d\.\)\s]+/, '').trim();
    if (!clean) return;

    // Detect duration/timer (e.g. "10–15 minute", "5 mins", "2 ghante")
    let durationMinutes = 3;
    const timeMatch = clean.match(/([0-9–-]+)\s*(minute|minutes|mins|min|hr|ghante)/i);
    if (timeMatch) {
      durationMinutes = Math.min(60, Math.max(1, parseFraction(timeMatch[1])));
    }

    parsedSteps.push({
      stepNumber: parsedSteps.length + 1,
      instructionHi: clean,
      instructionEn: clean,
      durationMinutes,
      timerSeconds: durationMinutes * 60,
    });
  });

  // If no steps found
  if (parsedSteps.length === 0) {
    parsedSteps.push({
      stepNumber: 1,
      instructionHi: 'सभी सामग्री को एक साथ मिलाएं और अच्छे से तैयार करें।',
      instructionEn: 'Combine all prepared ingredients and mix thoroughly.',
      durationMinutes: 5,
      timerSeconds: 300,
    });
  }

  // Dietary Classification
  let dietary: DietaryType = 'Veg';
  const fullText = rawText.toLowerCase();
  if (fullText.includes('chicken') || fullText.includes('mutton') || fullText.includes('fish') || fullText.includes('meat') || fullText.includes('prawn')) {
    dietary = 'Non-Veg';
  } else if (fullText.includes('egg') || fullText.includes('anda') || fullText.includes('ande')) {
    dietary = 'Egg';
  } else if (!fullText.includes('milk') && !fullText.includes('paneer') && !fullText.includes('ghee') && !fullText.includes('curd') && !fullText.includes('dahi') && !fullText.includes('butter') && !fullText.includes('cheese')) {
    dietary = 'Vegan';
  }

  // Meal Category
  let mealCategory: MealCategory = 'Snacks';
  if (fullText.includes('sauce') || fullText.includes('chutney') || fullText.includes('dip') || fullText.includes('snack') || fullText.includes('pakora') || fullText.includes('chaat')) {
    mealCategory = 'Snacks';
  } else if (fullText.includes('paratha') || fullText.includes('poha') || fullText.includes('upma') || fullText.includes('sandwich') || fullText.includes('toast') || fullText.includes('dosa') || fullText.includes('idli')) {
    mealCategory = 'Breakfast';
  } else if (fullText.includes('kheer') || fullText.includes('halwa') || fullText.includes('sweet') || fullText.includes('dessert') || fullText.includes('mithai') || fullText.includes('ladoo')) {
    mealCategory = 'Dessert';
  } else if (fullText.includes('dal') || fullText.includes('sabzi') || fullText.includes('curry') || fullText.includes('rice') || fullText.includes('biryani') || fullText.includes('pulao')) {
    mealCategory = 'Lunch';
  }

  // Cuisine Type
  let cuisine: CuisineType = 'Fusion';
  if (fullText.includes('chimichurri') || fullText.includes('pasta') || fullText.includes('pizza') || fullText.includes('sauce') || fullText.includes('oregano') || fullText.includes('olive oil')) {
    cuisine = 'Fusion';
  } else if (fullText.includes('paneer') || fullText.includes('roti') || fullText.includes('dal') || fullText.includes('chole') || fullText.includes('rajma')) {
    cuisine = 'North Indian';
  } else if (fullText.includes('dosa') || fullText.includes('idli') || fullText.includes('sambar') || fullText.includes('curd rice')) {
    cuisine = 'South Indian';
  }

  // Tips
  const tipText = tipSection.join(' ').trim();
  const tipsEn = tipText ? [tipText] : ['Serve fresh for the best vibrant aroma and taste.'];
  const tipsHi = tipText ? [tipText] : ['ताज़ा परोसें, बेहतरीन स्वाद और महक आएगी।'];

  // Default time calculations
  const totalStepTime = parsedSteps.reduce((acc, curr) => acc + (curr.durationMinutes || 3), 0);
  const cookTime = Math.max(5, Math.min(60, totalStepTime));
  const prepTime = 10;

  // Selected appropriate image
  let image = '/src/assets/images/recipe_paneer_curry_1792785764650.jpg';
  if (fullText.includes('chimichurri') || fullText.includes('parsley') || fullText.includes('green sauce') || fullText.includes('dip')) {
    image = '/src/assets/images/recipe_chimichurri_sauce_1792790482840.jpg';
  } else if (fullText.includes('poha')) {
    image = '/src/assets/images/kanda_poha_1792898120761.jpg';
  } else if (fullText.includes('dal') || fullText.includes('lentil')) {
    image = fullText.includes('makhani') 
      ? '/src/assets/images/dal_makhani_1792898295068.jpg' 
      : '/src/assets/images/dal_tadka_1792898143890.jpg';
  } else if (fullText.includes('chole') || fullText.includes('chana')) {
    image = '/src/assets/images/chana_masala_1792898159327.jpg';
  } else if (fullText.includes('rajma')) {
    image = '/src/assets/images/rajma_masala_1792898279904.jpg';
  } else if (fullText.includes('palak paneer')) {
    image = '/src/assets/images/palak_paneer_1792898173941.jpg';
  } else if (fullText.includes('paneer tikka')) {
    image = '/src/assets/images/paneer_tikka_1792898543889.jpg';
  } else if (fullText.includes('paneer bhurji')) {
    image = '/src/assets/images/paneer_bhurji_1792898702355.jpg';
  } else if (fullText.includes('paneer') || fullText.includes('curry') || fullText.includes('gravy')) {
    image = '/src/assets/images/recipe_paneer_curry_1792785764650.jpg';
  } else if (fullText.includes('pav bhaji')) {
    image = '/src/assets/images/pav_bhaji_1792898211659.jpg';
  } else if (fullText.includes('uttapam')) {
    image = '/src/assets/images/mixed_veg_uttapam_1792900593682.jpg';
  } else if (fullText.includes('idli') || fullText.includes('sambar')) {
    image = '/src/assets/images/idli_sambar_1792898191876.jpg';
  } else if (fullText.includes('dosa')) {
    image = '/src/assets/images/recipe_masala_dosa_1792785765519.jpg';
  } else if (fullText.includes('chilla') || fullText.includes('cheela')) {
    image = '/src/assets/images/moong_dal_chilla_1792900595388.jpg';
  } else if (fullText.includes('egg fried rice')) {
    image = '/src/assets/images/egg_fried_rice_1792900573221.jpg';
  } else if (fullText.includes('egg paratha') || fullText.includes('anda paratha') || fullText.includes('mughlai egg')) {
    image = '/src/assets/images/egg_paratha_1792900020285.jpg';
  } else if (fullText.includes('paratha') || fullText.includes('roti') || fullText.includes('thepla') || fullText.includes('naan')) {
    image = fullText.includes('aloo paratha') 
      ? '/src/assets/images/recipe_aloo_paratha_1792785765531.jpg'
      : '/src/assets/images/phulka_roti_1792898478575.jpg';
  } else if (fullText.includes('paneer pulao')) {
    image = '/src/assets/images/paneer_pulao_1792900574687.jpg';
  } else if (fullText.includes('kadai paneer')) {
    image = '/src/assets/images/kadai_paneer_1792900574276.jpg';
  } else if (fullText.includes('shahi paneer')) {
    image = '/src/assets/images/shahi_paneer_1792900594825.jpg';
  } else if (fullText.includes('methi matar') || fullText.includes('matar malai')) {
    image = '/src/assets/images/methi_matar_malai_1792900573269.jpg';
  } else if (fullText.includes('aloo matar') || fullText.includes('alu matar')) {
    image = '/src/assets/images/aloo_matar_curry_1792900594873.jpg';
  } else if (fullText.includes('biryani') || fullText.includes('pulao') || fullText.includes('fried rice')) {
    image = '/src/assets/images/recipe_biryani_pulao_1792785764334.jpg';
  } else if (fullText.includes('khichdi')) {
    image = '/src/assets/images/dal_khichdi_1792898248003.jpg';
  } else if (fullText.includes('manchurian') || fullText.includes('gobi manchurian')) {
    image = '/src/assets/images/gobi_manchurian_1792900050099.jpg';
  } else if (fullText.includes('noodle') || fullText.includes('chowmein')) {
    image = '/src/assets/images/hakka_noodles_1792898436517.jpg';
  } else if (fullText.includes('kheer')) {
    image = '/src/assets/images/rice_kheer_1792898460461.jpg';
  } else if (fullText.includes('halwa') || fullText.includes('sheera')) {
    image = '/src/assets/images/indian_halwa_1792898312486.jpg';
  } else if (fullText.includes('chai') || fullText.includes('tea')) {
    image = '/src/assets/images/masala_chai_1792898231346.jpg';
  } else if (fullText.includes('lassi')) {
    image = '/src/assets/images/mango_lassi_1792898352159.jpg';
  } else if (fullText.includes('egg') || fullText.includes('anda') || fullText.includes('omelette')) {
    image = '/src/assets/images/egg_curry_1792898419362.jpg';
  } else if (fullText.includes('pakora') || fullText.includes('bhajiya') || fullText.includes('cutlet')) {
    image = '/src/assets/images/vegetable_pakora_1792898264058.jpg';
  } else if (fullText.includes('sandwich')) {
    image = '/src/assets/images/veg_sandwich_1792898367785.jpg';
  } else if (fullText.includes('bean') || fullText.includes('beans') || fullText.includes('french beans')) {
    image = '/src/assets/images/french_beans_sabzi_1792900050624.jpg';
  } else if (fullText.includes('aloo gobi') || fullText.includes('gobi')) {
    image = '/src/assets/images/aloo_gobi_1792898386057.jpg';
  } else if (fullText.includes('bhindi')) {
    image = '/src/assets/images/bhindi_masala_1792898402363.jpg';
  } else if (fullText.includes('baingan')) {
    image = '/src/assets/images/baingan_bharta_1792898496787.jpg';
  } else if (fullText.includes('upma')) {
    image = '/src/assets/images/suji_upma_1792898684699.jpg';
  } else {
    image = '/src/assets/images/recipe_paneer_curry_1792785764650.jpg';
  }

  const recipe: Recipe = {
    id: `custom_${Date.now()}`,
    nameEn: title,
    nameHi: titleHi,
    taglineEn: tagline,
    taglineHi: taglineHi,
    descriptionEn: `Homemade ${title} made with fresh ingredients.`,
    descriptionHi: `घर पर आसानी से बनने वाली लाजवाब ${titleHi}।`,
    prepTime,
    cookTime,
    totalTime: prepTime + cookTime,
    defaultServings: 4,
    difficulty: 'Easy',
    dietary,
    mealCategory,
    cuisine,
    ingredients: parsedIngredients,
    steps: parsedSteps,
    tipsEn,
    tipsHi,
    allergensEn: [],
    allergensHi: [],
    image,
    featured: true,
  };

  return {
    recipe,
    rawIngredientsCount: parsedIngredients.length,
    rawStepsCount: parsedSteps.length,
  };
}
