import * as PIXI from 'pixi.js'

import { CityBuilding } from '@/entities/buildings'
import { RING_MAX, RING_MIN } from '@/entities/cityLayout'
import { createBuildings } from '@/features/buildings/lib/buildingsLayer'
import { SPRITE_BASE_OFFSET, TILE_H, TILE_W } from '@/shared/constants/tiles'

import { isoToScreen } from './centerIsometric'
import { addGround } from './groundLayer'
import { addProps } from './propsLayer'

const VIEWPORT_PADDING = 0.94

const MAX_ZOOM = 0.75

const MARGIN_CELLS = 0

const cityBounds = () => {
  const lo = RING_MIN - MARGIN_CELLS
  const hi = RING_MAX + MARGIN_CELLS
  const corners = [isoToScreen(lo, lo), isoToScreen(hi, lo), isoToScreen(hi, hi), isoToScreen(lo, hi)]

  const xs = corners.map((p) => p.x)
  const ys = corners.map((p) => p.y)

  return {
    x: Math.min(...xs) - TILE_W / 2,
    y: Math.min(...ys) - TILE_H - SPRITE_BASE_OFFSET,
    width: Math.max(...xs) - Math.min(...xs) + TILE_W,
    height: Math.max(...ys) - Math.min(...ys) + TILE_H + SPRITE_BASE_OFFSET * 2,
  }
}

export const createScene = (buildings: CityBuilding[], onSelect: (b: CityBuilding) => void) => {
  const world = new PIXI.Container()

  const depthLayer = new PIXI.Container()
  depthLayer.sortableChildren = true
  world.addChild(depthLayer)

  const ground = addGround(depthLayer)
  const props = addProps(depthLayer)
  const buildingsControl = createBuildings(depthLayer, buildings, onSelect)

  const bounds = cityBounds()

  const fit = (app: PIXI.Application) => {
    const { width, height } = app.renderer

    if (!width || !height) return

    const fitted = Math.min(width / bounds.width, height / bounds.height) * VIEWPORT_PADDING
    const scale = Math.min(fitted, MAX_ZOOM)

    world.scale.set(scale)
    world.x = width / 2 - (bounds.x + bounds.width / 2) * scale
    world.y = height / 2 - (bounds.y + bounds.height / 2) * scale

    buildingsControl.setViewScale(scale)

    return scale
  }

  const destroy = () => {
    buildingsControl.destroy()
    props.destroy()
    ground.destroy()
    world.destroy({ children: true })
  }

  return {
    world,
    depthLayer,
    fit,
    setSelected: buildingsControl.setSelected,
    destroy,
  }
}
