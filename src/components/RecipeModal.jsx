const RecipeModal = ({ dish, onClose }) => {
  if (!dish) {
    return null;
  }

  return (
    <div className="recipe-modal-backdrop" role="dialog" aria-modal="true" aria-label={`Receta de ${dish.name}`}>
      <div className="recipe-modal card border-0 shadow-lg">
        <div className="card-body p-4 p-md-5">
          <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
            <div>
              <span className="badge text-bg-secondary mb-2">{dish.category}</span>
              <h2 className="h3 mb-1">{dish.name}</h2>
              <p className="text-muted mb-0">{dish.description}</p>
            </div>
            <button type="button" className="btn btn-outline-dark btn-sm" onClick={onClose}>
              Cerrar
            </button>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-6 col-md-3">
              <div className="recipe-stat">
                <span className="recipe-stat-label">Tiempo</span>
                <strong>{dish.prepTime} min</strong>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="recipe-stat">
                <span className="recipe-stat-label">Dificultad</span>
                <strong>{dish.difficulty}</strong>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="recipe-stat">
                <span className="recipe-stat-label">Porciones</span>
                <strong>{dish.servings}</strong>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="recipe-stat">
                <span className="recipe-stat-label">Confianza</span>
                <strong>{dish.confidenceScore}%</strong>
              </div>
            </div>
          </div>

          <h3 className="h5">Ingredientes</h3>
          <div className="d-flex flex-wrap gap-2 mb-4">
            {dish.ingredients.map((ingredient) => (
              <span className="badge rounded-pill text-bg-light border" key={`${dish.id}-${ingredient}`}>
                {ingredient}
              </span>
            ))}
          </div>

          <h3 className="h5">Paso a paso</h3>
          <ol className="mb-0 ps-3">
            {dish.steps.map((step) => (
              <li key={step} className="mb-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
