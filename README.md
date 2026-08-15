# Iso City

An isometric city built with Pixi.js and React. Click a building, or start the tour, and a walker
routes to it along the streets.

## Stack

Pixi 8, React 19, TypeScript, Redux Toolkit, Vite, SCSS modules.

## Running

```bash
npm install
npm run dev
```

Also available: `build`, `lint`, `lint:css`, `format:check`.

## Structure

```
src/
  app/         store
  entities/    city layout, landmarks, walker, state slices
  features/    scene and camera, buildings, walker, roads, tour panel
  shared/      geometry constants, navigation graph, Pixi canvas, styles
```

Road tiles are generated from the same graph the walker routes over, so the streets and the paths
cannot disagree. The whole scene is drawn in one depth sorted container, ground included.

## Assets

Tiles, buildings and props are drawn for this project. The character is from Kenney, CC0. See
[public/assets/CREDITS.md](public/assets/CREDITS.md).
