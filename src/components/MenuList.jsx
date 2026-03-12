const MenuList = ({ items }) => {
  if (!items.length) {
    return (
      <div className="alert alert-info mt-4" role="alert">
        Aún no hay sugerencias. Ingresa ingredientes para obtener platos sugeridos.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="h4 mb-3">Platos sugeridos</h2>
      <div className="row g-3">
        {items.map((dish) => (
          <div className="col-12 col-md-6" key={dish.id}>
            <article className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <span className="badge text-bg-secondary mb-2">{dish.category}</span>
                <h3 className="h5">{dish.name}</h3>
                <p className="text-muted mb-2">{dish.description}</p>
                <p className="small mb-0">
                  <strong>Coincidencias:</strong> {dish.matchCount} ingredientes
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
