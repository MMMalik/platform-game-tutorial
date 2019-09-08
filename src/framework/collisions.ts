export interface CollisionRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const collide = (rect1: CollisionRect, rect2: CollisionRect) => {
  return (
    rect1.x + rect1.width > rect2.x &&
    rect1.x < rect2.x + rect2.width &&
    rect1.y + rect1.height > rect2.y &&
    rect1.y < rect2.y + rect2.height
  );
};

export const willCollideDiag = (
  rect1: CollisionRect,
  rect2: CollisionRect,
  vX: number,
  vY: number
) => {
  const adjustedRect1 = {
    ...rect1,
    x: rect1.x + vX,
    y: rect1.y + vY
  };

  const NE = vX >= 0 && vY <= 0;
  const NW = vX <= 0 && vY <= 0;
  const SE = vX >= 0 && vY >= 0;
  const SW = vX <= 0 && vY >= 0;

  if (collide(adjustedRect1, rect2)) {
    if (NE) {
      return {
        h: rect2.x - (adjustedRect1.x + adjustedRect1.width),
        v: rect2.y + rect2.height - adjustedRect1.y
      };
    } else if (NW) {
      return {
        h: rect2.x + rect2.width - adjustedRect1.x,
        v: rect2.y + rect2.height - adjustedRect1.y
      };
    } else if (SE) {
      return {
        h: rect2.x - (adjustedRect1.x + adjustedRect1.width),
        v: rect2.y - (adjustedRect1.y + adjustedRect1.height)
      };
    } else if (SW) {
      return {
        h: rect2.x + rect2.width - adjustedRect1.x,
        v: rect2.y - (adjustedRect1.y + adjustedRect1.height)
      };
    }
  }
  return {
    h: 0,
    v: 0
  };
};

export const willCollideH = (
  rect1: CollisionRect,
  rect2: CollisionRect,
  vX: number
) => {
  const adjustedHRect1 = {
    ...rect1,
    x: rect1.x + vX
  };
  const collideH = collide(adjustedHRect1, rect2);
  if (collideH) {
    return vX >= 0
      ? rect2.x - (adjustedHRect1.x + adjustedHRect1.width)
      : rect2.x + rect2.width - adjustedHRect1.x;
  }
  return 0;
};

export const willCollideY = (
  rect1: CollisionRect,
  rect2: CollisionRect,
  vY: number
) => {
  const adjustedYRect1 = {
    ...rect1,
    y: rect1.y + vY
  };
  const collideY = collide(adjustedYRect1, rect2);
  if (collideY) {
    return vY >= 0
      ? rect2.y - (adjustedYRect1.y + adjustedYRect1.height)
      : rect2.y + rect2.height - adjustedYRect1.y;
  }
  return 0;
};
