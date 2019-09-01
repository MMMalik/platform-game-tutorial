export interface RawTileMap {
  layers: Array<{ data: number[] }>;
  height: number;
  width: number;
  tileheight: number;
  tilewidth: number;
}

export interface ParsedTile {
  id: string;
  tileId: number;
  x: number;
  y: number;
}

export enum TileId {
  Blank = 0
}

/**
 * Parses json exported from Tiled.
 * Level data comes as a 1-dimensional array. However, we need to establish things like tile's position in 2d world.
 * Later, we will also need to know if a tile has neighbours. Therefore, let's transform it into 2d array.
 *
 * Once all required data is calculated, flatten array back into 1d and filter all blank tiles.
 *
 * @param rawTiles json file exported from Tiled
 */
export const createLevel = (rawTiles: RawTileMap): ParsedTile[] => {
  const array2d = Array.from({ length: rawTiles.height }).map((_, i) =>
    rawTiles.layers[0].data.slice(i * rawTiles.width, (i + 1) * rawTiles.width)
  );
  return array2d
    .map((row, i) => {
      return row.map((tileId, j) => ({
        id: `${i}_${j}`,
        tileId,
        x: rawTiles.tilewidth * j,
        y: rawTiles.tileheight * i
      }));
    })
    .reduce((acc, row) => row.concat(acc), [])
    .filter(tile => tile.tileId !== TileId.Blank);
};
