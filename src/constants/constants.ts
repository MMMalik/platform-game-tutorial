export const Scene = {
  Width: 1280,
  Height: 578
};

export const Textures = {
  Platform: "assets/platform/Tileset.json",
  Character: "assets/character/adventurer.json",
  Background: "assets/background/Background.json"
};

export const KeyCodes = {
  Space: "Space",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight"
};

export const World = {
  Character: {
    Speed: 2,
    JumpSpeed: 3,
    JumpThreshold: 75
  },
  Gravity: 3
};

export const CharacterDirections = {
  Left: -1,
  Right: 1
};

export enum CharacterMode {
  Jumping,
  Running,
  Falling,
  Idle
}
