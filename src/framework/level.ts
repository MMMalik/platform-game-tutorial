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

export const createLevel = (jsonLevelMap: RawTileMap): ParsedTile[] => {
  const array2d = Array.from({ length: jsonLevelMap.height }).map((_, i) =>
    jsonLevelMap.layers[0].data.slice(
      i * jsonLevelMap.width,
      (i + 1) * jsonLevelMap.width
    )
  );
  return array2d
    .map((row, i) => {
      return row.map((tileId, j) => ({
        id: `${i}_${j}`,
        tileId,
        x: jsonLevelMap.tilewidth * j,
        y: jsonLevelMap.tileheight * i
      }));
    })
    .reduce((acc, row) => row.concat(acc), [])
    .filter(tile => tile.tileId !== TileId.Blank);
};
