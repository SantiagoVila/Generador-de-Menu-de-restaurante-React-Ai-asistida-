const MenuList = ({ items }) => {
  if (!items.length) {
    return (
      <div className="alert alert-info mt-4" role="alert">
        Aún no hay sugerencias. Prueba con ingredientes como <strong>tomate, ajo, pasta</strong>.
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
        {items.map((dish) => (
          <div className="col-12 col-md-6" key={dish.id}>
            <article className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                  <span className="badge text-bg-secondary">{dish.category}</span>
                  <span className="badge text-bg-success">Confianza {dish.confidenceScore}%</span>
                </div>

                <h3 className="h5">{dish.name}</h3>
                <p className="text-muted mb-3">{dish.description}</p>

                <p className="small mb-2">
                  <strong>Coinciden:</strong> {dish.matchingIngredients.join(', ')}
                </p>
                <p className="small mb-0 text-muted">
                  <strong>Faltan:</strong> {dish.missingIngredients.join(', ') || 'Ninguno'}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuList;
