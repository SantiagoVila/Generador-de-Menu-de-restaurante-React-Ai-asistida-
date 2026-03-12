import { MAX_SUGGESTIONS } from '../config';
import { generateSuggestedMenu, normalizeIngredients } from './generateMenu';

const mockMenus = [
  {
    id: 1,
    name: 'Pasta Primavera',
    ingredients: ['pasta', 'tomate', 'albahaca', 'ajo'],
    category: 'Principal',
    description: 'Pasta con verduras',
    prepTime: 20,
    difficulty: 'Fácil',
    servings: 2,
    steps: ['Paso 1']
  },
  {
    id: 2,
    name: 'Ensalada Mediterránea',
    ingredients: ['lechuga', 'tomate', 'pepino'],
    category: 'Entrada',
    description: 'Ensalada fresca',
    prepTime: 10,
    difficulty: 'Fácil',
    servings: 2,
    steps: ['Paso 1']
  },
  {
    id: 3,
    name: 'Risotto de Hongos',
    ingredients: ['arroz', 'hongos', 'ajo'],
    category: 'Principal',
    description: 'Risotto cremoso',
    prepTime: 40,
    difficulty: 'Media',
    servings: 3,
    steps: ['Paso 1']
  }
];

test('normaliza ingredientes, elimina duplicados y aplica sinónimos', () => {
  const normalized = normalizeIngredients('Tomates, ajo, AJOS, champiñones');
  expect(normalized).toEqual(['tomate', 'ajo', 'hongos']);
});

test('retorna vacío con input null o vacío', () => {
  expect(generateSuggestedMenu(mockMenus, null)).toEqual([]);
  expect(generateSuggestedMenu(mockMenus, ' , , ')).toEqual([]);
});

test('genera platos con score y detalle de coincidencias', () => {
  const result = generateSuggestedMenu(mockMenus, 'tomate, pasta');
  expect(result.length).toBeGreaterThanOrEqual(1);
  expect(result[0].name).toBe('Pasta Primavera');
  expect(result[0].matchCount).toBeGreaterThan(0);
  expect(result[0].confidenceScore).toBeGreaterThan(0);
  expect(Array.isArray(result[0].matchingIngredients)).toBe(true);
  expect(Array.isArray(result[0].missingIngredients)).toBe(true);
});

test('ordena por mayor confianza y respeta limite MAX_SUGGESTIONS', () => {
  const expanded = Array.from({ length: 15 }, (_, index) => ({
    ...mockMenus[index % 3],
    id: index + 1,
    name: `${mockMenus[index % 3].name} ${index + 1}`
  }));

  const result = generateSuggestedMenu(expanded, 'tomate, ajo, hongos, arroz, pasta');
  expect(result[0].name.toLowerCase()).toContain('risotto');
  expect(result.length).toBeLessThanOrEqual(MAX_SUGGESTIONS);
});
