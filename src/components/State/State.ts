import * as PIXI from "pixi.js";
import { GameComponent, getKeyboardState, RenderFn } from "../../framework";
import { GameState } from "../../state";
import { calculateCharacterState } from "./characterState";

const render: RenderFn<GameState> = (_, state) => {
  const keyboard = getKeyboardState();
  state.world.character = calculateCharacterState(state, keyboard);
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
