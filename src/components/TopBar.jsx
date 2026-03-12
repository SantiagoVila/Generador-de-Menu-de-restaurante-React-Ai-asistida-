import { CATEGORIES } from '../config';

const TopBar = ({ category, onCategoryChange, showOnlyFavorites, onToggleFavorites, query, onQueryChange }) => (
  <section className="card border-0 shadow-sm p-3 p-md-4 mb-3">
    <div className="row g-3 align-items-end">
      <div className="col-12 col-md-4">
        <label htmlFor="category" className="form-label mb-1">
          Categoría
        </label>
        <select
          id="category"
          className="form-select"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12 col-md-5">
        <label htmlFor="search-dish" className="form-label mb-1">
          Buscar plato
        </label>
        <input
          id="search-dish"
          className="form-control"
          placeholder="Ej: risotto, tacos, pizza..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>

      <div className="col-12 col-md-3">
        <button type="button" className="btn btn-dark w-100" onClick={onToggleFavorites}>
          {showOnlyFavorites ? 'Ver todos' : 'Solo favoritos'}
        </button>
      </div>
    </div>
  </section>
);

export default TopBar;
