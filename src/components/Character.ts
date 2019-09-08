import * as PIXI from "pixi.js";
import { Textures, CharacterMode } from "../constants";
import { GameComponent, RenderFn } from "../framework";
import { GameState } from "../state";

const CharacterTextures = {
  [CharacterMode.Idle]: "idle",
  [CharacterMode.Running]: "running",
  [CharacterMode.Jumping]: "jumping",
  [CharacterMode.Falling]: "falling"
};

const render: RenderFn<GameState> = (sprites, state) => {
  const { world } = state;
  const resource = PIXI.Loader.shared.resources[Textures.Character];
  sprites.forEach((sprite: PIXI.AnimatedSprite) => {
    sprite.scale.x = Math.abs(sprite.scale.x) * world.character.direction;

    sprite.x += world.character.vX;
    sprite.y += world.character.vY;

    resource.spritesheet!.animations;
    const currentAnimation = CharacterTextures[world.character.mode];
    const currentTextures = resource.spritesheet!.animations[currentAnimation];
    if (sprite.textures !== currentTextures) {
      sprite.textures = currentTextures;
      sprite.play();
    }
  });
};

/**
 * Creates main character sprite.
 * Adjust animation speed, and sprite's scale according to your preference.
 */
export const Character: GameComponent<GameState> = state => {
  const { world } = state;
  const resource = PIXI.Loader.shared.resources[Textures.Character];
  const sprite = new PIXI.AnimatedSprite(resource.spritesheet!.animations.idle);
  sprite.x = world.character.x;
  sprite.y = world.character.y;
  sprite.scale = new PIXI.Point(1.5, 1.5);
  sprite.anchor = new PIXI.Point(0.5, 0.5);
  sprite.play();
  sprite.animationSpeed = 0.1;
  return {
    sprites: [sprite],
    render
  };
};
