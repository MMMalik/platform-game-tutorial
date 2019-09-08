import { KeyboardState } from "../../framework";
import { GameState } from "../../state";
import {
  World,
  CharacterDirections,
  CharacterMode,
  Scene
} from "../../constants";

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
  onTheGround: boolean
) => {
  if (jump) {
    return CharacterMode.Jumping;
  } else if (!onTheGround) {
    return CharacterMode.Falling;
  } else if (movingX) {
    return CharacterMode.Running;
  }
  return CharacterMode.Idle;
};

const getCharacterJump = (
  keyboard: KeyboardState,
  prevJump: number,
  onTheGround: boolean
) => {
  if (keyboard.Space && onTheGround) {
    return World.Character.JumpSpeed;
  } else if (prevJump > 0 && prevJump < World.Character.JumpThreshold) {
    return World.Character.JumpThreshold - prevJump < World.Character.JumpSpeed
      ? World.Character.JumpThreshold
      : prevJump + World.Character.JumpSpeed;
  }
  return 0;
};

const getCharacterVy = (jumping: boolean, onTheGround: boolean) => {
  if (jumping) {
    return -World.Character.JumpSpeed;
  }
  return onTheGround ? 0 : World.Gravity;
};

const getCharacterVx = (movingX: boolean, moveDirection: number) => {
  return movingX ? moveDirection * World.Character.Speed : 0;
};

const isOnTheGround = (prevY: number) => {
  return prevY >= Scene.Height / 2;
};

export const calculateCharacterState = (
  { world }: GameState,
  keyboard: KeyboardState
) => {
  const movingX = isCharacterMovingX(keyboard);
  const direction = getCharacterMoveDirection(
    keyboard,
    world.character.direction
  );
  const onTheGround = isOnTheGround(world.character.y);
  const jump = getCharacterJump(keyboard, world.character.jump, onTheGround);
  const jumping = isCharacterJumping(jump);
  const vY = getCharacterVy(jumping, onTheGround);
  const vX = getCharacterVx(movingX, direction);
  const mode = getCharacterMode(movingX, jumping, onTheGround);

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
