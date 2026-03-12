import { useEffect, useState } from 'react';
import MenuForm from './components/MenuForm';
import MenuList from './components/MenuList';
import { generateSuggestedMenu } from './utils/generateMenu';

const App = () => {
  const [menus, setMenus] = useState([]);
  const [suggestedMenu, setSuggestedMenu] = useState([]);

  useEffect(() => {
    const loadMenus = async () => {
      const response = await fetch('/data/menus.json');
      const data = await response.json();
      setMenus(data);
    };

    loadMenus();
  }, []);

  const handleGenerate = (ingredientsInput) => {
    const generated = generateSuggestedMenu(menus, ingredientsInput);
    setSuggestedMenu(generated);
  };

  return (
    <main className="app-wrapper py-4 py-md-5">
      <div className="container">
        <header className="text-center mb-4">
          <h1 className="display-6 fw-bold">Generador de Menús de Restaurante (React + IA)</h1>
          <p className="lead mb-0">
            Simula una IA que recomienda platos según los ingredientes que tengas disponibles.
          </p>
        </header>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <MenuForm onGenerate={handleGenerate} />
            <MenuList items={suggestedMenu} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
