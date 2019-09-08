import * as PIXI from "pixi.js";
import { GameComponent, getKeyboardState, RenderFn } from "../../framework";
import { GameState } from "../../state";
import {
  calculateCharacterState,
  getCharacterMoveDirection
} from "./characterState";
import { calculateCharacterCollisions } from "./characterCollisions";
import { World } from "../../constants";

const render: RenderFn<GameState> = (_, state) => {
  const keyboard = getKeyboardState();
  const direction = getCharacterMoveDirection(keyboard);
  const characterCollisions = calculateCharacterCollisions(
    state,
    World.Character.Speed * direction,
    World.Gravity
  );
  state.world.character = calculateCharacterState(
    state,
    direction,
    keyboard,
    characterCollisions
  );
};

/**
 * Calculates new state on each frame.
 */
export const State: GameComponent<GameState> = () => {
  return {
    displayObject: new PIXI.Sprite(),
    render
  };
};
