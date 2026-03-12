import { useEffect, useMemo, useState } from 'react';
import MenuForm from './components/MenuForm';
import MenuList from './components/MenuList';
import { fetchMenus } from './services/menuService';
import { generateSuggestedMenu, normalizeIngredients } from './utils/generateMenu';

const App = () => {
  const [menus, setMenus] = useState([]);
  const [suggestedMenu, setSuggestedMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastQuery, setLastQuery] = useState('');

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

  const handleGenerate = (ingredientsInput) => {
    const generated = generateSuggestedMenu(menus, ingredientsInput);
    setSuggestedMenu(generated);
    setLastQuery(ingredientsInput);
  };

  const normalizedQuery = useMemo(() => normalizeIngredients(lastQuery), [lastQuery]);

  return (
    <main className="app-wrapper py-4 py-md-5">
      <div className="container">
        <header className="text-center mb-4">
          <h1 className="display-6 fw-bold">Generador de Menús de Restaurante (React + IA)</h1>
          <p className="lead mb-1">
            Simula una IA que recomienda platos según los ingredientes que tengas disponibles.
          </p>
          <p className="text-muted small mb-0">Demo frontend sin backend real, con scoring explicable.</p>
        </header>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            {isLoading ? <div className="alert alert-secondary">Cargando catálogo de platos...</div> : null}

            {error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : null}

            <MenuForm onGenerate={handleGenerate} disabled={isLoading || Boolean(error)} />

            {normalizedQuery.length ? (
              <p className="small text-muted mt-3 mb-0">
                Consulta actual: <strong>{normalizedQuery.join(', ')}</strong>
              </p>
            ) : null}

            <MenuList items={suggestedMenu} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
