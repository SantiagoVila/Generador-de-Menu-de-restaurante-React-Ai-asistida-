import { generateSuggestedMenu } from './generateMenu';

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
  }
];

test('genera al menos un plato coherente para ingredientes válidos', () => {
  const result = generateSuggestedMenu(mockMenus, 'tomate, pasta');

  expect(result.length).toBeGreaterThanOrEqual(1);
  expect(result[0].name).toBe('Pasta Primavera');
  expect(result[0].matchCount).toBeGreaterThan(0);
});
