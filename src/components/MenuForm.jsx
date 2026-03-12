import { useState } from 'react';

const MenuForm = ({ onGenerate }) => {
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onGenerate(ingredients);
  };

  return (
    <form className="card shadow-sm p-4 border-0" onSubmit={handleSubmit}>
      <h2 className="h4 mb-3">Ingredientes disponibles</h2>
      <label htmlFor="ingredients" className="form-label">
        Ingresa ingredientes separados por coma
      </label>
      <textarea
        id="ingredients"
        className="form-control mb-3"
        rows="3"
        placeholder="Ej: tomate, ajo, pasta, albahaca"
        value={ingredients}
        onChange={(event) => setIngredients(event.target.value)}
      />
      <button type="submit" className="btn btn-primary w-100">
        Generar menú sugerido
      </button>
    </form>
  );
};

export default MenuForm;
