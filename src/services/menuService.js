export const fetchMenus = async () => {
  const response = await fetch('/data/menus.json');

  if (!response.ok) {
    throw new Error('No se pudieron cargar los platos de ejemplo.');
  }

  return response.json();
};
