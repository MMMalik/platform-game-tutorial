import * as PIXI from "pixi.js";
import { RawTileMap, createLevel, noop, GameComponent } from "../framework";
import { Textures } from "../constants";
import { GameState } from "../state";

/**
 * Creates platform tiles.
 *
 * @param rawTiles json file exported from Tiled
 */
export const Platform: GameComponent<GameState> = state => {
  const resource = PIXI.Loader.shared.resources[Textures.Platform];
  const container = new PIXI.Container();

  state.level.forEach(tile => {
    const sprite = new PIXI.Sprite(
      resource.textures![`Tileset${tile.tileId - 1}.png`]
    );
    sprite.x = tile.x;
    sprite.y = tile.y;
    container.addChild(sprite);
  });

  return {
    displayObject: container,
    render: noop
  };
};
