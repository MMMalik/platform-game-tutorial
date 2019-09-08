import * as PIXI from "pixi.js";

export interface AppConfig {
  view: HTMLCanvasElement;
  width: number;
  height: number;
}

export type RenderFn<T> = (displayObject: PIXI.DisplayObject, state: T) => void;

export type GameComponent<T> = (
  state: T
) => {
  displayObject: PIXI.DisplayObject;
  render: RenderFn<T>;
};

/**
 * Initializes game components.
 *
 * @param app instance of Pixi Application
 * @param components array of game components
 * @param state game state
 */
export const initializeComponents = <T>(
  app: PIXI.Application,
  components: GameComponent<T>[],
  state: T
) => {
  const container = new PIXI.Container();
  components.forEach(component => {
    const cmp = component(state);
    container.addChild(cmp.displayObject);
    app.ticker.add(() => {
      cmp.render(cmp.displayObject, state);
    });
  });

  return () => {
    app.stage.addChild(container);
    app.renderer.render(app.stage);
  };
};

/**
 * Gets canvas element from DOM.
 * Throws error in case it cannot be found.
 *
 * @param id id of canvas element
 */
export const getCanvasEl = (id: string) => {
  const canvas = document.getElementById(id) as HTMLCanvasElement | null;
  if (!canvas) {
    throw new Error(`Canvas with specified id ${id} not found.`);
  }
  return canvas;
};

/**
 * Gets instance of PIXI Application.
 *
 * @param config initial config
 */
export const createPixiApp = (config: AppConfig) => {
  return new PIXI.Application(config);
};

/**
 * Promisified version of PIXI Loader.
 * Loads all required assets.
 *
 * @param textures map of textures to their paths
 */
export const loadPixiAssets = (textures: { [key: string]: string }) => {
  return new Promise(resolve => {
    PIXI.Loader.shared.add(
      Object.keys(textures).map((key: keyof typeof textures) => textures[key])
    );
    PIXI.Loader.shared.load(resolve);
  });
};
