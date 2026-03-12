import { useMemo, useState } from 'react';
import { EXAMPLE_INGREDIENT_SETS } from '../config';
import { normalizeIngredients } from '../utils/generateMenu';

const MenuForm = ({ onGenerate, disabled }) => {
  const [ingredients, setIngredients] = useState('');
  const [error, setError] = useState('');

  const ingredientChips = useMemo(() => normalizeIngredients(ingredients), [ingredients]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!ingredientChips.length) {
      setError('Ingresa al menos un ingrediente para generar sugerencias.');
      return;
    }

    setError('');
    onGenerate(ingredients);
  };

  const applyExample = (example) => {
    setIngredients(example);
    setError('');
  };

  return (
    <form className="card shadow-sm p-4 border-0" onSubmit={handleSubmit}>
      <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
        <h2 className="h4 mb-0">Ingredientes disponibles</h2>
        <span className="text-muted small">Tip: separa por comas</span>
      </div>

      <label htmlFor="ingredients" className="form-label">
        Ingresa ingredientes del inventario
      </label>
      <textarea
        id="ingredients"
        className={`form-control mb-2 ${error ? 'is-invalid' : ''}`}
        rows="3"
        placeholder="Ej: tomate, ajo, pasta, albahaca"
        value={ingredients}
        onChange={(event) => setIngredients(event.target.value)}
        disabled={disabled}
      />

      {error ? <div className="invalid-feedback d-block mb-2">{error}</div> : null}

      <div className="d-flex flex-wrap gap-2 mb-3">
        {EXAMPLE_INGREDIENT_SETS.map((example) => (
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            key={example}
            onClick={() => applyExample(example)}
            disabled={disabled}
          >
            {example}
          </button>
        ))}
      </div>

      {ingredientChips.length ? (
        <div className="mb-3">
          <p className="small text-muted mb-2">Ingredientes detectados:</p>
          <div className="d-flex gap-2 flex-wrap">
            {ingredientChips.map((ingredient) => (
              <span key={ingredient} className="badge rounded-pill text-bg-light border ingredient-chip">
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <button type="submit" className="btn btn-primary w-100" disabled={disabled}>
        Generar menú sugerido
      </button>
    </form>
  );
};

export default MenuForm;
