# Generador de Menús de Restaurante (React + IA)

Aplicación web construida con React que genera sugerencias de platos según ingredientes ingresados por el usuario. Implementa una lógica de **IA-asistida simulada** con scoring explicable sobre datos JSON locales.

## Características v2

- Formulario validado (evita consultas vacías).
- Ejemplos rápidos de ingredientes para probar la app.
- Visualización de ingredientes detectados (chips).
- Sugerencias con **confianza (%)**, ingredientes que coinciden y los que faltan.
- Manejo de estados profesionales: loading, error y empty state.
- Normalización inteligente (sinónimos, deduplicación y limpieza de input).

## Tecnologías

- React.js
- JavaScript (ES6)
- CSS + Bootstrap 5
- HTML5
- Datos locales en JSON (sin backend)

## Instalación

```bash
git clone <URL_DEL_REPO>
cd Generador-de-Menu-de-restaurante-React-Ai-asistida-
npm install
npm start
```

La app queda disponible en `http://localhost:3000`.

## Uso

1. Escribe ingredientes separados por coma (ej: `tomate, ajo, pasta`).
2. O selecciona un ejemplo rápido desde los botones del formulario.
3. Presiona **Generar menú sugerido**.
4. Revisa los platos sugeridos junto con:
   - porcentaje de confianza,
   - ingredientes que coinciden,
   - ingredientes faltantes.

## Detalle IA-asistida (simulación)

La "IA" está simulada con una función de scoring que:

- Normaliza ingredientes ingresados.
- Aplica sinónimos (ej: `tomates` → `tomate`, `champiñones` → `hongos`).
- Compara con catálogo local (`data/menus.json` / `public/data/menus.json`).
- Ordena resultados por confianza, luego por cantidad de coincidencias.

En un escenario real, esta lógica se puede reemplazar por integración con ChatGPT o modelos de ML.

## Pruebas

Se incluyeron pruebas unitarias para:

- normalización y sinónimos,
- input vacío,
- ordenamiento por confianza,
- coherencia del resultado para input válido.

```bash
npm test
```

## Calidad de código

```bash
npm run lint
npm run format
```

## Responsive

El layout usa Bootstrap Grid + CSS para verse bien en móvil y escritorio.

## Screenshots

- Formulario + resultados sugeridos: `docs/screenshot-menu-generator-v2.png`

## Demo

- Puedes desplegarla en GitHub Pages, Netlify o Vercel y colocar aquí el enlace.

## Roadmap

- [ ] Exportar menú a PDF.
- [ ] Filtros por categoría (entrada/principal/postre).
- [ ] Integración real con API de IA.

## Autores

- Tu Nombre

## Descripción breve (portfolio)

> “App React que genera menús de restaurante según ingredientes ingresados. Frontend dinámico con lógica IA-asistida simulada, scoring explicable y UX responsive.”
