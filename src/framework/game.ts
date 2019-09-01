import * as PIXI from "pixi.js";

interface AppConfig {
  view: HTMLCanvasElement;
  width: number;
  height: number;
}

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
