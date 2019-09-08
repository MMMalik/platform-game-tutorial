import {
  GameComponent,
  getKeyboardState,
  RenderFn,
  KeyboardState
} from "../framework";
import { GameState } from "../state";
import { World, CharacterDirections, CharacterMode, Scene } from "../constants";

const getCharacterMoveDirection = (
  keyboard: KeyboardState,
  prevDirection: number
) => {
  if (keyboard.ArrowRight) {
    return CharacterDirections.Right;
  } else if (keyboard.ArrowLeft) {
    return CharacterDirections.Left;
  }
  return prevDirection;
};

const isCharacterMovingX = (keyboard: KeyboardState) =>
  keyboard.ArrowLeft || keyboard.ArrowRight;

const isCharacterJumping = (jump: number) => {
  return jump > 0;
};

const getCharacterMode = (
  movingX: boolean,
  jump: boolean,
  isOnTheGround: boolean
) => {
  if (jump) {
    return CharacterMode.Jumping;
  } else if (!isOnTheGround) {
    return CharacterMode.Falling;
  } else if (movingX) {
    return CharacterMode.Running;
  }
  return CharacterMode.Idle;
};

const getCharacterJump = (keyboard: KeyboardState, prevJump: number) => {
  if (keyboard.Space && prevJump === 0) {
    return World.Character.JumpSpeed;
  } else if (prevJump > 0 && prevJump < World.Character.JumpThreshold) {
    return World.Character.JumpThreshold - prevJump < World.Character.JumpSpeed
      ? World.Character.JumpThreshold
      : prevJump + World.Character.JumpSpeed;
  }
  return 0;
};

const getCharacterVy = (jumping: boolean, prevY: number) => {
  if (jumping) {
    return -World.Character.JumpSpeed;
  }
  return prevY < Scene.Height / 2 ? World.Gravity : 0;
};

const getCharacterVx = (movingX: boolean, moveDirection: number) => {
  return movingX ? moveDirection * World.Character.Speed : 0;
};

const calculateCharacterState = (
  { world }: GameState,
  keyboard: KeyboardState
) => {
  const movingX = isCharacterMovingX(keyboard);
  const direction = getCharacterMoveDirection(
    keyboard,
    world.character.direction
  );
  const jump = getCharacterJump(keyboard, world.character.jump);
  const jumping = isCharacterJumping(jump);
  const vY = getCharacterVy(jumping, world.character.y);
  const vX = getCharacterVx(movingX, direction);
  const mode = getCharacterMode(movingX, jumping, vY === 0);

  return {
    direction,
    vX,
    vY,
    mode,
    jump,
    x: world.character.x + vX, 
    y: world.character.y + vY
  };
};

const render: RenderFn<GameState> = (_, state) => {
  const keyboard = getKeyboardState();
  state.world.character = calculateCharacterState(state, keyboard);
};

/**
 * Calculates new state on each frame.
 */
export const State: GameComponent<GameState> = () => {
  return {
    sprites: [],
    render
  };
};
