import { KeyboardState } from "../../framework";
import { GameState } from "../../state";
import { World, CharacterDirections, CharacterMode } from "../../constants";
import { CharacterCollisions } from "./characterCollisions";

export const getCharacterMoveDirection = (keyboard: KeyboardState) => {
  if (keyboard.ArrowRight) {
    return CharacterDirections.Right;
  } else if (keyboard.ArrowLeft) {
    return CharacterDirections.Left;
  }
  return 0;
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

const getCharacterVy = (jumping: boolean, collisions: CharacterCollisions) => {
  return jumping
    ? -World.Character.JumpSpeed
    : World.Gravity + collisions.platform.v;
};

const getCharacterVx = (
  movingX: boolean,
  moveDirection: number,
  collisions: CharacterCollisions
) => {
  return movingX
    ? moveDirection * World.Character.Speed + collisions.platform.h
    : 0;
};

const isOnTheGround = (collisions: CharacterCollisions) => {
  return Math.abs(collisions.platform.v) !== 0;
};

export const calculateCharacterState = (
  { world }: GameState,
  direction: number,
  keyboard: KeyboardState,
  collisions: CharacterCollisions
) => {
  const movingX = isCharacterMovingX(keyboard);
  const onTheGround = isOnTheGround(collisions);
  const jump = getCharacterJump(keyboard, world.character.jump, onTheGround);
  const jumping = isCharacterJumping(jump);
  const vY = getCharacterVy(jumping, collisions);
  const vX = getCharacterVx(movingX, direction, collisions);
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
