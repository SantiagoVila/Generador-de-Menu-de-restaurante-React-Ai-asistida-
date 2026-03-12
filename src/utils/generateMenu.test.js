import { generateSuggestedMenu, normalizeIngredients } from './generateMenu';

const mockMenus = [
  {
    id: 1,
    name: 'Pasta Primavera',
    ingredients: ['pasta', 'tomate', 'albahaca', 'ajo'],
    category: 'Principal',
    description: 'Pasta con verduras'
  },
  {
    id: 2,
    name: 'Ensalada Mediterránea',
    ingredients: ['lechuga', 'tomate', 'pepino'],
    category: 'Entrada',
    description: 'Ensalada fresca'
  },
  {
    id: 3,
    name: 'Risotto de Hongos',
    ingredients: ['arroz', 'hongos', 'ajo'],
    category: 'Principal',
    description: 'Risotto cremoso'
  }
];

test('normaliza ingredientes, elimina duplicados y aplica sinónimos', () => {
  const normalized = normalizeIngredients('Tomates, ajo, AJOS, champiñones');

  expect(normalized).toEqual(['tomate', 'ajo', 'hongos']);
});

test('genera al menos un plato coherente para ingredientes válidos', () => {
  const result = generateSuggestedMenu(mockMenus, 'tomate, pasta');

  expect(result.length).toBeGreaterThanOrEqual(1);
  expect(result[0].name).toBe('Pasta Primavera');
  expect(result[0].matchCount).toBeGreaterThan(0);
  expect(result[0].confidenceScore).toBeGreaterThan(0);
});

test('retorna vacío cuando no hay input útil', () => {
  expect(generateSuggestedMenu(mockMenus, ' , , ')).toEqual([]);
});

test('ordena por mayor confianza y luego por matchCount', () => {
  const result = generateSuggestedMenu(mockMenus, 'tomate, ajo, hongos, arroz');

  expect(result[0].name).toBe('Risotto de Hongos');
  expect(result[1].name).toBe('Pasta Primavera');
});
