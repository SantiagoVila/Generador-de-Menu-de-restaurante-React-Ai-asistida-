import { INGREDIENT_SYNONYMS, MAX_SUGGESTIONS } from '../config';

const normalizeIngredient = (value) => {
  const normalized = value.trim().toLowerCase();
  return INGREDIENT_SYNONYMS[normalized] || normalized;
};

export const normalizeIngredients = (input) => {
  const tokens = Array.isArray(input) ? input : input.split(',');

  return [...new Set(tokens.map((item) => normalizeIngredient(item)).filter(Boolean))];
};

export const generateSuggestedMenu = (availableMenus = [], input) => {
  const ingredients = normalizeIngredients(input);

  if (!ingredients.length || !availableMenus.length) {
    return [];
  }

  return availableMenus
    .map((menu) => {
      const normalizedDishIngredients = menu.ingredients.map((ingredient) => normalizeIngredient(ingredient));
      const matchingIngredients = normalizedDishIngredients.filter((ingredient) => ingredients.includes(ingredient));
      const missingIngredients = normalizedDishIngredients.filter((ingredient) => !ingredients.includes(ingredient));
      const matchCount = matchingIngredients.length;
      const confidenceScore = Math.round((matchCount / normalizedDishIngredients.length) * 100);

      return {
        ...menu,
        matchingIngredients,
        missingIngredients,
        matchCount,
        confidenceScore
      };
    })
    .filter((menu) => menu.matchCount > 0)
    .sort((a, b) => {
      if (b.confidenceScore !== a.confidenceScore) {
        return b.confidenceScore - a.confidenceScore;
      }

      if (b.matchCount !== a.matchCount) {
        return b.matchCount - a.matchCount;
      }

      return a.name.localeCompare(b.name);
    })
    .slice(0, MAX_SUGGESTIONS);
};
