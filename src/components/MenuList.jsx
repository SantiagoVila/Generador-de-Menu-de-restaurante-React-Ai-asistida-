const MenuList = ({ items, onSelectDish, favorites, onToggleFavorite }) => {
  if (!items.length) {
    return (
      <div className="alert alert-info mt-4" role="alert">
        No se encontraron platos con esos filtros. Prueba otra combinación de ingredientes/categoría.
      </div>
    );
  }

  return (
    <section className="mt-4" aria-live="polite">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h2 className="h4 mb-0">Platos sugeridos</h2>
        <span className="badge text-bg-primary">{items.length} resultados</span>
      </div>

      <div className="row g-3">
        {items.map((dish) => {
          const isFavorite = favorites.includes(dish.id);

          return (
            <div className="col-12 col-md-6" key={dish.id}>
              <article className="card menu-card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <span className="badge text-bg-secondary">{dish.category}</span>
                    <span className="badge text-bg-success">Confianza {dish.confidenceScore}%</span>
                  </div>

                  <h3 className="h5">{dish.name}</h3>
                  <p className="text-muted mb-3">{dish.description}</p>

                  <div className="progress mb-3" role="progressbar" aria-label="Porcentaje de coincidencia">
                    <div className="progress-bar" style={{ width: `${dish.confidenceScore}%` }}>
                      {dish.confidenceScore}%
                    </div>
                  </div>

                  <p className="small mb-2">
                    <strong>Coinciden:</strong> {dish.matchingIngredients.join(', ')}
                  </p>
                  <p className="small mb-3 text-muted">
                    <strong>Faltan:</strong> {dish.missingIngredients.join(', ') || 'Ninguno'}
                  </p>

                  <div className="d-flex gap-2 mt-auto">
                    <button type="button" className="btn btn-primary btn-sm flex-grow-1" onClick={() => onSelectDish(dish)}>
                      Ver receta
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm ${isFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
                      onClick={() => onToggleFavorite(dish.id)}
                    >
                      {isFavorite ? '★' : '☆'}
                    </button>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MenuList;
