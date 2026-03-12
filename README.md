# Generador de Menús de Restaurante (React + IA)

Aplicación React premium que recomienda platos en base a ingredientes ingresados, usando una lógica de IA-asistida simulada con scoring explicable.

## ✨ Qué trae la versión "suprema"

- Recomendaciones por coincidencia con score de confianza (%)
- Filtro por categoría, búsqueda por nombre y modo "solo favoritos"
- Botón favorito por plato (persistencia en `localStorage`)
- Modal tipo popup con receta completa:
  - ingredientes
  - tiempos
  - dificultad
  - porciones
  - pasos de preparación
- Estados UX profesionales: loading, error, empty-state, validación en formulario
- Dataset ampliado (12 platos) para demo más realista

## Tecnologías

- React.js
- JavaScript (ES6)
- CSS + Bootstrap 5
- HTML5
- Datos locales JSON (sin backend)

## Instalación

```bash
git clone <URL_DEL_REPO>
cd Generador-de-Menu-de-restaurante-React-Ai-asistida-
npm install
npm start
```

## Uso

1. Ingresa ingredientes separados por coma.
2. Presiona **Generar menú sugerido**.
3. Filtra por categoría o busca un plato por nombre.
4. Marca favoritos con ★ y alterna "Solo favoritos".
5. Haz click en **Ver receta** para abrir el popup con el paso a paso.

## IA-asistida (simulada)

La recomendación usa:

- normalización de ingredientes,
- deduplicación,
- mapeo de sinónimos,
- score por porcentaje de coincidencia,
- orden por confianza + coincidencias.

> En producción, este módulo puede reemplazarse por una API real de IA (p. ej. OpenAI).

## Pruebas

```bash
npm test
```

Incluye casos de:
- sinónimos y normalización,
- input vacío/null,
- score y campos de resultado,
- límite máximo de sugerencias.

## Calidad de código

```bash
npm run lint
npm run format
```

## Demo / Screenshots

- Screenshot sugerido: `docs/screenshot-menu-generator-v3.png`
- Demo deploy: GitHub Pages / Netlify / Vercel

## Portfolio

> “App React avanzada para generación de menús según ingredientes, con experiencia UX completa, scoring explicable y modal de recetas detalladas.”
