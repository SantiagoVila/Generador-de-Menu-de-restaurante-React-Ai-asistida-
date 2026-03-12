# Generador de Menús de Restaurante (React + IA)

Aplicación web construida con React que genera sugerencias de platos según ingredientes ingresados por el usuario. Usa una lógica de **IA-asistida simulada** sobre datos JSON locales.

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

1. Escribe ingredientes en el formulario (separados por comas), por ejemplo: `tomate, ajo, pasta`.
2. Presiona **Generar menú sugerido**.
3. La app muestra platos recomendados con categoría, descripción y cantidad de coincidencias.

## Detalle de IA-asistida (simulación)

La "IA" está simulada con una función de scoring que:

- Normaliza ingredientes ingresados.
- Compara con un catálogo local (`data/menus.json` / `public/data/menus.json`).
- Ordena platos por mayor coincidencia de ingredientes.

En un escenario real, esta lógica se podría reemplazar por integración con modelos como ChatGPT o pipelines de ML.

## Pruebas

- Prueba unitaria con Jest para validar que, dado un input válido, se genera al menos un plato coherente:

```bash
npm test
```

## Responsive

El layout usa grid de Bootstrap y ajustes CSS para adaptarse a móvil y escritorio.

## Screenshots

- Formulario de ingreso y resultados sugeridos: `docs/screenshot-menu-generator.png`

## Demo

- Puedes desplegarla en GitHub Pages u otro servicio estático y colocar aquí el enlace.

## Manual breve de uso

1. Abrir la aplicación.
2. Ingresar ingredientes conocidos del inventario.
3. Generar sugerencias y elegir platos con mayor coincidencia.
4. Ajustar ingredientes para explorar nuevas recomendaciones.

## Autores

- Santiago Vila

## Descripción breve (portfolio)

> “App React que genera menús de restaurante según ingredientes ingresados. Frontend dinámico con formulación guiada por IA-asistida.”
