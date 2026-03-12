export const normalizeIngredients = (input) =>
  input
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

export const generateSuggestedMenu = (availableMenus, input) => {
  const ingredients = Array.isArray(input) ? input : normalizeIngredients(input);

  if (!ingredients.length) {
    return [];
  }

  const scoredMenus = availableMenus
    .map((menu) => {
      const matches = menu.ingredients.filter((ingredient) => ingredients.includes(ingredient.toLowerCase()));

      return {
        ...menu,
        matchCount: matches.length,
        matchRatio: matches.length / menu.ingredients.length
      };
    })
    .filter((menu) => menu.matchCount > 0)
    .sort((a, b) => {
      if (b.matchCount !== a.matchCount) {
        return b.matchCount - a.matchCount;
      }
      return b.matchRatio - a.matchRatio;
    });

  return scoredMenus.slice(0, 4);
};
