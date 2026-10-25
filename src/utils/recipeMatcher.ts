import { Recipe, IngredientMatchResult, IngredientItem } from '../types/recipe';

export interface MatchFilterOptions {
  dietary?: string;
  mealCategory?: string;
  maxTime?: number;
  difficulty?: string;
  onlyFullyCookable?: boolean;
  minMatchPercentage?: number;
  searchQuery?: string;
}

/**
 * Calculates matching statistics between a user's selected ingredient IDs
 * and a given recipe's ingredients.
 *
 * CRITICAL RULE:
 * 1. Only REQUIRED ingredients count toward the match percentage.
 * 2. If a required ingredient is missing, isFullyCookable is FALSE.
 * 3. Optional ingredients are categorized separately and do NOT degrade match percentage.
 * 4. Pantry staples (like salt, water, cooking oil) can be auto-assumed or checked based on user toggle.
 */
export function calculateRecipeMatch(
  recipe: Recipe,
  selectedIngredientIds: Set<string>,
  assumePantryStaples: boolean = true
): IngredientMatchResult {
  const matchedIngredients: IngredientItem[] = [];
  const missingRequiredIngredients: IngredientItem[] = [];
  const missingOptionalIngredients: IngredientItem[] = [];

  const requiredIngredients = recipe.ingredients.filter(ing => ing.isRequired);
  const totalRequiredCount = requiredIngredients.length;

  recipe.ingredients.forEach(item => {
    const isStapleAvailable = assumePantryStaples && item.isPantryStaple;
    const isSelected = selectedIngredientIds.has(item.id) || isStapleAvailable;

    if (isSelected) {
      matchedIngredients.push(item);
    } else {
      if (item.isRequired) {
        missingRequiredIngredients.push(item);
      } else {
        missingOptionalIngredients.push(item);
      }
    }
  });

  const matchedRequiredCount = totalRequiredCount - missingRequiredIngredients.length;
  
  // Percentage based strictly on required ingredients
  const matchPercentage = totalRequiredCount > 0 
    ? Math.round((matchedRequiredCount / totalRequiredCount) * 100) 
    : 100;

  const isFullyCookable = missingRequiredIngredients.length === 0;

  return {
    recipe,
    matchPercentage,
    totalRequiredCount,
    matchedRequiredCount,
    matchedIngredients,
    missingRequiredIngredients,
    missingOptionalIngredients,
    isFullyCookable,
  };
}

/**
 * Matches a list of recipes against selected ingredients and applies filters.
 */
export function findMatchingRecipes(
  recipes: Recipe[],
  selectedIngredientIds: Set<string>,
  options: MatchFilterOptions = {},
  assumePantryStaples: boolean = true
): IngredientMatchResult[] {
  let results = recipes.map(recipe => 
    calculateRecipeMatch(recipe, selectedIngredientIds, assumePantryStaples)
  );

  // Search filter
  if (options.searchQuery && options.searchQuery.trim() !== '') {
    const q = options.searchQuery.toLowerCase().trim();
    results = results.filter(res => {
      const { recipe } = res;
      return (
        recipe.nameEn.toLowerCase().includes(q) ||
        recipe.nameHi.includes(q) ||
        recipe.cuisine.toLowerCase().includes(q) ||
        recipe.mealCategory.toLowerCase().includes(q) ||
        recipe.ingredients.some(i => i.nameEn.toLowerCase().includes(q) || i.nameHi.includes(q))
      );
    });
  }

  // Dietary filter
  if (options.dietary && options.dietary !== 'All') {
    results = results.filter(res => res.recipe.dietary === options.dietary);
  }

  // Meal Category filter
  if (options.mealCategory && options.mealCategory !== 'All') {
    results = results.filter(res => res.recipe.mealCategory === options.mealCategory);
  }

  // Max Time filter
  if (options.maxTime && options.maxTime > 0) {
    results = results.filter(res => res.recipe.totalTime <= options.maxTime!);
  }

  // Difficulty filter
  if (options.difficulty && options.difficulty !== 'All') {
    results = results.filter(res => res.recipe.difficulty === options.difficulty);
  }

  // Only 100% Cookable filter
  if (options.onlyFullyCookable) {
    results = results.filter(res => res.isFullyCookable);
  }

  // Minimum Match Percentage filter
  if (options.minMatchPercentage !== undefined && options.minMatchPercentage > 0) {
    results = results.filter(res => res.matchPercentage >= options.minMatchPercentage!);
  }

  // Sorting: highest match percentage first, then shortest cooking time
  results.sort((a, b) => {
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    return a.recipe.totalTime - b.recipe.totalTime;
  });

  return results;
}
