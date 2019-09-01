import * as PIXI from "pixi.js";

interface AppConfig {
  view: HTMLCanvasElement;
  width: number;
  height: number;
}

export const getCanvasEl = (id: string) => {
  const canvas = document.getElementById(id) as HTMLCanvasElement | null;
  if (!canvas) {
    throw new Error(`Canvas with specified id ${id} not found.`);
  }
  return canvas;
};

export const createPixiApp = (config: AppConfig) => {
  return new PIXI.Application(config);
};

export const loadPixiAssets = (textures: { [key: string]: string }) => {
  return new Promise(resolve => {
    PIXI.Loader.shared.add(
      Object.keys(textures).map((key: keyof typeof textures) => textures[key])
    );
    PIXI.Loader.shared.load(resolve);
  });
};
