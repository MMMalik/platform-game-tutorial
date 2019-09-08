import {
  willCollideH,
  willCollideY,
  willCollideDiag,
  CollisionRect,
  ParsedTile
} from "../../framework";
import { GameState } from "../../state";

export interface Collision {
  v: number;
  h: number;
}

export interface CharacterCollisions {
  platform: Collision;
}

export const CharacterCollisionRect = {
  Width: 30,
  Height: 50
};

export const createCenteredCollisionBox = (box: CollisionRect) => {
  return {
    x: box.x - box.width / 2,
    y: box.y - box.height / 2,
    width: box.width,
    height: box.height
  };
};

export const collisionsWithPlatform = (
  collisionBox: CollisionRect,
  platform: ParsedTile[],
  predictedVx: number,
  predictedVy: number
) => {
  const collisions = platform.map(tile => ({
    h: willCollideH(collisionBox, tile, predictedVx),
    v: willCollideY(collisionBox, tile, predictedVy),
    diag: willCollideDiag(collisionBox, tile, predictedVx, predictedVy)
  }));

  const collisionHorizontal = collisions.find(collision => collision.h);
  const collisionVertical = collisions.find(collision => collision.v);
  const collisionDiag = collisions.find(
    collision => collision.diag.h || collision.diag.v
  );

  if (collisionHorizontal || collisionVertical) {
    return {
      h: collisionHorizontal ? collisionHorizontal.h : 0,
      v: collisionVertical ? collisionVertical.v : 0
    };
  }

  return {
    h: collisionDiag ? collisionDiag.h : 0,
    v: 0
  };
};

export const calculateCharacterCollisions = (
  state: GameState,
  predictedVx: number,
  predictedVy: number
): CharacterCollisions => {
  const { world, level } = state;
  const characterCollisionBox = createCenteredCollisionBox({
    x: world.character.x,
    y: world.character.y,
    width: CharacterCollisionRect.Width,
    height: CharacterCollisionRect.Height
  });
  return {
    platform: collisionsWithPlatform(
      characterCollisionBox,
      level,
      predictedVx,
      predictedVy
    )
  };
};
