import * as PIXI from "pixi.js";
import { Textures } from "../constants";

/**
 * Creates main character sprite.
 * Adjust animation speed, and sprite's scale according to your preference.
 */
export const Character = () => {
  const resource = PIXI.Loader.shared.resources[Textures.Character];
  const sprite = new PIXI.AnimatedSprite(resource.spritesheet!.animations.idle);
  sprite.x = 50;
  sprite.y = 250;
  sprite.scale = new PIXI.Point(1.5, 1.5);
  sprite.play();
  sprite.animationSpeed = 0.1;
  return sprite;
};
