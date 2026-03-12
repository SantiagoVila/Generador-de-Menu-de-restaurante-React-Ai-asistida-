import { useEffect, useMemo, useState } from 'react';
import MenuForm from './components/MenuForm';
import MenuList from './components/MenuList';
import RecipeModal from './components/RecipeModal';
import TopBar from './components/TopBar';
import { fetchMenus } from './services/menuService';
import { generateSuggestedMenu, normalizeIngredients } from './utils/generateMenu';

const App = () => {
  const [menus, setMenus] = useState([]);
  const [suggestedMenu, setSuggestedMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastQuery, setLastQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [nameQuery, setNameQuery] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const raw = localStorage.getItem('menu-favorites');
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    const loadMenus = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMenus();
        setMenus(data);
        setError('');
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadMenus();
  }, []);

  useEffect(() => {
    localStorage.setItem('menu-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleGenerate = (ingredientsInput) => {
    const generated = generateSuggestedMenu(menus, ingredientsInput);
    setSuggestedMenu(generated);
    setLastQuery(ingredientsInput);
  };

  const handleToggleFavorite = (dishId) => {
    setFavorites((prev) => (prev.includes(dishId) ? prev.filter((item) => item !== dishId) : [...prev, dishId]));
  };

  const normalizedQuery = useMemo(() => normalizeIngredients(lastQuery), [lastQuery]);

  const visibleResults = useMemo(
    () =>
      suggestedMenu.filter((dish) => {
        const matchesCategory = categoryFilter === 'Todas' || dish.category === categoryFilter;
        const matchesName = dish.name.toLowerCase().includes(nameQuery.trim().toLowerCase());
        const matchesFavorite = !showOnlyFavorites || favorites.includes(dish.id);
        return matchesCategory && matchesName && matchesFavorite;
      }),
    [suggestedMenu, categoryFilter, nameQuery, showOnlyFavorites, favorites]
  );

  return (
    <main className="app-wrapper py-4 py-md-5">
      <div className="container">
        <header className="text-center mb-4 hero-box p-4 p-md-5">
          <p className="text-uppercase small fw-semibold mb-2 text-primary">Restaurant AI Assistant</p>
          <h1 className="display-6 fw-bold">Generador de Menús de Restaurante (React + IA)</h1>
          <p className="lead mb-1">Genera sugerencias inteligentes, explora recetas y crea tu menú ideal en segundos.</p>
          <p className="text-muted small mb-0">Sin backend, con data local y una experiencia premium orientada a portfolio.</p>
        </header>

        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            {isLoading ? <div className="alert alert-secondary">Cargando catálogo de platos...</div> : null}
            {error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : null}

            <MenuForm onGenerate={handleGenerate} disabled={isLoading || Boolean(error)} />

            <TopBar
              category={categoryFilter}
              onCategoryChange={setCategoryFilter}
              showOnlyFavorites={showOnlyFavorites}
              onToggleFavorites={() => setShowOnlyFavorites((prev) => !prev)}
              query={nameQuery}
              onQueryChange={setNameQuery}
            />

            {normalizedQuery.length ? (
              <p className="small text-muted mt-3 mb-0">
                Consulta actual: <strong>{normalizedQuery.join(', ')}</strong>
              </p>
            ) : null}

            <MenuList
              items={visibleResults}
              onSelectDish={setSelectedDish}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        </div>
      </div>

      <RecipeModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </main>
  );
};

export default App;
