import * as PIXI from "pixi.js";
import { RawTileMap, createLevel } from "../framework";
import { Textures } from "../constants";

/**
 * Creates platform tiles.
 *
 * @param rawTiles json file exported from Tiled
 */
export const Platform = (rawTiles: RawTileMap) => {
  const resource = PIXI.Loader.shared.resources[Textures.Platform];
  return createLevel(rawTiles).map(tile => {
    const sprite = new PIXI.Sprite(
      resource.textures![`Tileset${tile.tileId - 1}.png`]
    );
    sprite.x = tile.x;
    sprite.y = tile.y;
    return sprite;
  });
};
