import * as PIXI from "pixi.js";
import { Textures, Scene } from "../constants";

/**
 * Creates background sprite.
 */
export const Background = () => {
  const resource = PIXI.Loader.shared.resources[Textures.Background];
  const texture = resource.textures!["Background0.png"];
  const { width, height } = texture;
  const sprite = new PIXI.Sprite(texture);
  sprite.scale.x = Scene.width / width;
  sprite.scale.y = Scene.height / height;
  sprite.width = Scene.width;
  sprite.height = Scene.height;
  return sprite;
};
