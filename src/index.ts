import {
  createPixiApp,
  getCanvasEl,
  loadPixiAssets,
  initializeComponents,
  createLevel
} from "./framework";
import { Scene, Textures } from "./constants";
import { Platform } from "./components/Platform";
import { Background } from "./components/Background";
import { Character } from "./components/Character";
import { initState } from "./state";
import { State } from "./components/State";

/**
 * Initializes game.
 * 1. Gets canvas element and set its height and width.
 * 2. Gets instance of PIXI Application.
 * 3. Loads textures and levels.
 * 5. Create game components. Adds them to PIXI Container. The order of adding components matter.
 */
const initGame = async () => {
  const canvasEl = getCanvasEl("game");
  canvasEl.height = Scene.Height;
  canvasEl.width = Scene.Width;

  const pixiApp = createPixiApp({
    view: canvasEl,
    width: Scene.Width,
    height: Scene.Height
  });

  const [_, level] = await Promise.all([
    loadPixiAssets(Textures),
    import("./assets/levels/level1.json")
  ]);

  const initializer = initializeComponents(
    pixiApp,
    [State, Background, Platform, Character],
    initState({ level: createLevel(level) })
  );
  initializer();
};

initGame();
