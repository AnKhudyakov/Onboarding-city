import * as PIXI from 'pixi.js'

import { PROPS } from '@/entities/cityLayout'
import { SPRITE_BASE_OFFSET } from '@/shared/constants/tiles'

import { isoToScreen } from './centerIsometric'

export const addProps = (depthLayer: PIXI.Container) => {
  const sprites: PIXI.Sprite[] = []

  for (const { x, y, prop, size } of PROPS) {
    const texture = PIXI.Assets.get<PIXI.Texture>(prop)
    const sprite = new PIXI.Sprite(texture)
    const p = isoToScreen(x, y)

    sprite.anchor.set(0.5, 1 - SPRITE_BASE_OFFSET / texture.height)
    sprite.scale.set(size ?? 1)
    sprite.x = p.x
    sprite.y = p.y
    sprite.zIndex = x + y

    depthLayer.addChild(sprite)
    sprites.push(sprite)
  }

  return { destroy: () => sprites.forEach((s) => s.destroy()) }
}
