export const TILE_W = 264
export const TILE_H = 132
export const TILE_THICKNESS = 68
export const SPRITE_BASE_OFFSET = 137

export const GROUND_Z_BIAS = 0.5

export const TILE_TEXTURES = {
  pavement: 'tiles/pavement.png',

  grassPlain: 'tiles/grassPlain.png',
  grass1: 'tiles/grass1.png',
  grass2: 'tiles/grass2.png',
  grass3: 'tiles/grass3.png',
  grass4: 'tiles/grass4.png',

  waterPlain: 'tiles/waterPlain.png',
  water1: 'tiles/water1.png',
  water2: 'tiles/water2.png',
  water3: 'tiles/water3.png',

  fountain: 'tiles/fountain.png',

  shoreN: 'tiles/shoreN.png',
  shoreE: 'tiles/shoreE.png',
  shoreS: 'tiles/shoreS.png',
  shoreW: 'tiles/shoreW.png',

  roadNS: 'tiles/roadNS.png',
  roadEW: 'tiles/roadEW.png',

  roadNE: 'tiles/roadNE.png',
  roadES: 'tiles/roadES.png',
  roadSW: 'tiles/roadSW.png',
  roadNW: 'tiles/roadNW.png',

  roadNES: 'tiles/roadNES.png',
  roadESW: 'tiles/roadESW.png',
  roadNSW: 'tiles/roadNSW.png',
  roadNEW: 'tiles/roadNEW.png',

  roadNESW: 'tiles/roadNESW.png',

  roadEndN: 'tiles/roadEndN.png',
  roadEndE: 'tiles/roadEndE.png',
  roadEndS: 'tiles/roadEndS.png',
  roadEndW: 'tiles/roadEndW.png',

  crossingNS: 'tiles/crossingNS.png',
  crossingEW: 'tiles/crossingEW.png',
} as const

export type TileId = keyof typeof TILE_TEXTURES

export type ShoreId = Extract<TileId, `shore${string}`>

export const TERRAIN_BACKDROP = '#678b19'

export const PROP_TEXTURES = {
  treeBroadA: 'props/treeBroadA.png',
  treeBroadB: 'props/treeBroadB.png',
  treeMaple: 'props/treeMaple.png',
  firSmall: 'props/firSmall.png',
  firTall: 'props/firTall.png',
  rocks: 'props/rocks.png',
  boat: 'props/boat.png',
} as const

export type PropId = keyof typeof PROP_TEXTURES

export const BUILDING_TEXTURES = {
  blockConcrete: 'buildings/blockConcrete.png',
  towerConcrete: 'buildings/towerConcrete.png',
  officeMid: 'buildings/officeMid.png',
  shop: 'buildings/shop.png',
} as const

export type BuildingPieceId = keyof typeof BUILDING_TEXTURES

export const BUILDING_FOOTPRINT_INSET = 0.1
