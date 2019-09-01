import * as PIXI from "pixi.js";
import { createPixiApp, getCanvasEl, loadPixiAssets } from "./framework";
import { Scene, Textures } from "./constants";
import { Platform } from "./components/Platform";
import { Background } from "./components/Background";
import { Character } from "./components/character";

const initGame = async () => {
  const canvasEl = getCanvasEl("game");
  canvasEl.height = Scene.height;
  canvasEl.width = Scene.width;

  const pixiApp = createPixiApp({
    view: canvasEl,
    width: Scene.width,
    height: Scene.height
  });

  await loadPixiAssets(Textures);
  const level = await import("./assets/levels/level1.json");

  const background = Background();
  const platform = Platform(level);
  const character = Character();

  const container = new PIXI.Container();

  container.addChild(background);
  platform.forEach(platformSprite => container.addChild(platformSprite));
  container.addChild(character);

  pixiApp.stage.addChild(container);
  pixiApp.renderer.render(pixiApp.stage);
};

initGame();
