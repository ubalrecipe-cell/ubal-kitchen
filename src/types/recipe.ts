export type DietaryType = 'Veg' | 'Non-Veg' | 'Egg' | 'Vegan';
export type DifficultyType = 'Easy' | 'Medium' | 'Hard';
export type MealCategory = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'Dessert' | 'Beverages';
export type CuisineType = 
  | 'North Indian' 
  | 'South Indian' 
  | 'Maharashtrian' 
  | 'Bengali' 
  | 'Punjabi' 
  | 'Gujarati' 
  | 'Indo-Chinese' 
  | 'Pan-Indian'
  | 'Fusion';

export interface IngredientItem {
  id: string;
  nameEn: string;
  nameHi: string;
  amount: number;
  unit: string;
  isRequired: boolean;
  isPantryStaple?: boolean; // Salt, water, oil, basic turmeric/chilli
  notesEn?: string;
  notesHi?: string;
}

export interface CookingStep {
  stepNumber: number;
  titleEn?: string;
  titleHi?: string;
  instructionEn: string;
  instructionHi: string;
  durationMinutes?: number;
  timerSeconds?: number;
  tipEn?: string;
  tipHi?: string;
}

export interface Recipe {
  id: string;
  nameEn: string;
  nameHi: string;
  taglineEn: string;
  taglineHi: string;
  descriptionEn: string;
  descriptionHi: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  totalTime: number; // minutes
  defaultServings: number;
  difficulty: DifficultyType;
  dietary: DietaryType;
  mealCategory: MealCategory;
  cuisine: CuisineType;
  ingredients: IngredientItem[];
  steps: CookingStep[];
  tipsEn: string[];
  tipsHi: string[];
  allergensEn: string[];
  allergensHi: string[];
  image: string;
  featured?: boolean;
  quickRecipe?: boolean; // Under 15 mins
}

export interface IngredientMatchResult {
  recipe: Recipe;
  matchPercentage: number;
  totalRequiredCount: number;
  matchedRequiredCount: number;
  matchedIngredients: IngredientItem[];
  missingRequiredIngredients: IngredientItem[];
  missingOptionalIngredients: IngredientItem[];
  isFullyCookable: boolean;
}

export interface MasterIngredient {
  id: string;
  nameEn: string;
  nameHi: string;
  category: 'Vegetables' | 'Aromatics & Herbs' | 'Grains & Flours' | 'Dairy & Eggs' | 'Lentils & Pulses' | 'Pantry & Spices' | 'Beverages & Syrups';
  isStaple?: boolean;
  iconName?: string;
}

export interface ShoppingListItem {
  id: string;
  ingredientId?: string;
  nameEn: string;
  nameHi: string;
  amount: number;
  unit: string;
  isChecked: boolean;
  recipeSourceId?: string;
  recipeSourceNameEn?: string;
  recipeSourceNameHi?: string;
  addedAt: number;
}
