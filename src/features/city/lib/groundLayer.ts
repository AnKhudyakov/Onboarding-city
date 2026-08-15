import * as PIXI from 'pixi.js'

import { DECOR, groundCells, isSea, isTown } from '@/entities/cityLayout'
import { buildRoadMap, cellKey } from '@/features/road/lib/roadLayer'
import { GROUND_Z_BIAS, SPRITE_BASE_OFFSET, TileId } from '@/shared/constants/tiles'

import { isoToScreen } from './centerIsometric'
import { shoreTile } from './shoreLayer'
import { variant } from './variant'

const GRASS = ['grassPlain', 'grassPlain', 'grass1', 'grass2', 'grass3', 'grass4'] as const

export const addGround = (depthLayer: PIXI.Container) => {
  const road = buildRoadMap()
  const decor = new Map(DECOR.map((d) => [cellKey(d.x, d.y), d.tile]))

  const sprites: PIXI.Sprite[] = []

  const place = (x: number, y: number, alias: TileId) => {
    const sprite = new PIXI.Sprite(PIXI.Assets.get<PIXI.Texture>(alias))
    const p = isoToScreen(x, y)

    sprite.anchor.set(0.5, 1)
    sprite.x = p.x
    sprite.y = p.y + SPRITE_BASE_OFFSET
    sprite.zIndex = x + y - GROUND_Z_BIAS

    depthLayer.addChild(sprite)
    sprites.push(sprite)
  }

  for (const { x, y } of groundCells()) {
    if (isSea(x, y)) {
      place(x, y, shoreTile(x, y))
      continue
    }

    const key = cellKey(x, y)
    const paved = road.get(key) ?? decor.get(key)

    if (paved) {
      place(x, y, paved)
      continue
    }

    place(x, y, isTown(x, y) ? 'pavement' : variant(GRASS, x, y))
  }

  return { destroy: () => sprites.forEach((s) => s.destroy()) }
}
