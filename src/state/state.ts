import { ParsedTile } from "../framework";
import { CharacterDirections, CharacterMode, Scene } from "../constants";

interface WorldObject {
  x: number;
  y: number;
  vX: number;
  vY: number;
}

interface InitProps {
  level: ParsedTile[];
}

interface Character extends WorldObject {
  mode: CharacterMode;
  direction: number;
  jump: number;
}

export interface GameState {
  level: ParsedTile[];
  world: {
    character: Character;
  };
}

export const initState = ({ level }: InitProps): GameState => ({
  level,
  world: {
    character: {
      x: Scene.Width / 2,
      y: Scene.Height / 2,
      vX: 0,
      vY: 0,
      direction: CharacterDirections.Right,
      jump: 0,
      mode: CharacterMode.Idle
    }
  }
});
