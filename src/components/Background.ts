import * as PIXI from "pixi.js";
import { Textures, Scene } from "../constants";
import { GameComponent, noop } from "../framework";
import { GameState } from "../state";

/**
 * Creates background sprite.
 */
export const Background: GameComponent<GameState> = () => {
  const resource = PIXI.Loader.shared.resources[Textures.Background];
  const texture = resource.textures!["Background0.png"];
  const { width, height } = texture;
  const sprite = new PIXI.Sprite(texture);
  sprite.scale.x = Scene.Width / width;
  sprite.scale.y = Scene.Height / height;
  sprite.width = Scene.Width;
  sprite.height = Scene.Height;
  return {
    sprites: [sprite],
    render: noop
  };
};
