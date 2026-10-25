import { Recipe } from '../types/recipe';
import { RECIPES_DATA } from './recipes';
import { MORE_RECIPES_DATA } from './moreRecipes';
import { MORE_RECIPES_2 } from './moreRecipes2';
import { MOCKTAIL_RECIPES } from './mocktailRecipes';

export const ALL_RECIPES: Recipe[] = [
  ...RECIPES_DATA,
  ...MORE_RECIPES_DATA,
  ...MORE_RECIPES_2,
  ...MOCKTAIL_RECIPES,
];

export const TOTAL_RECIPES_COUNT = ALL_RECIPES.length;
