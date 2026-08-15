import * as PIXI from 'pixi.js'

import { CityBuilding } from '@/entities/buildings'
import { isoToScreen } from '@/features/city/lib/centerIsometric'
import { BUILDING_FOOTPRINT_INSET, SPRITE_BASE_OFFSET, TILE_H, TILE_W } from '@/shared/constants/tiles'

const SELECTED_COLOR = 0x00e5c0
const HOVERED_COLOR = 0xffd166

const HIGHLIGHT_GROWTH = 1.06

const LABEL_GAP = 18

const outline = (height: number) => {
  const halfW = (1 - 2 * BUILDING_FOOTPRINT_INSET) * (TILE_W / 2)
  const halfH = (1 - 2 * BUILDING_FOOTPRINT_INSET) * (TILE_H / 2)

  const base = -SPRITE_BASE_OFFSET
  const walls = height - SPRITE_BASE_OFFSET - halfH

  return new PIXI.Polygon([-halfW, base, 0, base + halfH, halfW, base, halfW, base - walls, 0, base - halfH - walls, -halfW, base - walls])
}

const silhouette = (color: number) => {
  const filter = new PIXI.ColorMatrixFilter()
  const r = ((color >> 16) & 0xff) / 255
  const g = ((color >> 8) & 0xff) / 255
  const b = (color & 0xff) / 255

  filter.matrix = [0, 0, 0, 0, r, 0, 0, 0, 0, g, 0, 0, 0, 0, b, 0, 0, 0, 1, 0]

  return filter
}

export const createBuildings = (depthLayer: PIXI.Container, buildings: CityBuilding[], onSelect: (b: CityBuilding) => void) => {
  let selectedId: string | null = null
  let hoveredId: string | null = null

  const sprites: Record<string, PIXI.Sprite> = {}
  const highlights: Record<string, PIXI.Sprite> = {}

  const selectedFilter = silhouette(SELECTED_COLOR)
  const hoveredFilter = silhouette(HOVERED_COLOR)

  const label = new PIXI.Text({
    text: '',
    style: {
      fontFamily: 'system-ui, sans-serif',
      fontSize: 16,
      fill: 0xffffff,
      stroke: { color: 0x1a1a22, width: 5 },
    },
  })

  label.anchor.set(0.5, 1)
  label.visible = false
  label.zIndex = 10_000
  depthLayer.addChild(label)

  for (const building of buildings) {
    const texture = PIXI.Assets.get<PIXI.Texture>(building.piece)
    const p = isoToScreen(building.x, building.y)
    const depth = building.x + building.y

    const highlight = new PIXI.Sprite(texture)
    highlight.anchor.set(0.5, 0.5)
    highlight.scale.set(HIGHLIGHT_GROWTH)
    highlight.x = p.x
    highlight.y = p.y + SPRITE_BASE_OFFSET - texture.height / 2
    highlight.zIndex = depth - 0.01
    highlight.visible = false
    depthLayer.addChild(highlight)
    highlights[building.id] = highlight

    const sprite = new PIXI.Sprite(texture)
    sprite.anchor.set(0.5, 1)
    sprite.x = p.x
    sprite.y = p.y + SPRITE_BASE_OFFSET
    sprite.zIndex = depth
    sprite.eventMode = 'static'
    sprite.cursor = 'pointer'
    sprite.hitArea = outline(texture.height)

    sprite.on('pointerdown', () => onSelect(building))

    sprite.on('pointerover', () => {
      hoveredId = building.id
      refresh()
    })

    sprite.on('pointerout', () => {
      hoveredId = null
      refresh()
    })

    depthLayer.addChild(sprite)
    sprites[building.id] = sprite
  }

  const refresh = () => {
    for (const [id, highlight] of Object.entries(highlights)) {
      highlight.visible = id === selectedId || id === hoveredId
      highlight.filters = [id === selectedId ? selectedFilter : hoveredFilter]
    }

    const activeId = hoveredId ?? selectedId
    const active = buildings.find((b) => b.id === activeId)

    if (!active) {
      label.visible = false
      return
    }

    const sprite = sprites[active.id]

    label.text = active.name
    label.x = sprite.x
    label.y = sprite.y - sprite.height - LABEL_GAP
    label.visible = true
  }

  const setSelected = (id: string | null) => {
    selectedId = id
    refresh()
  }

  const setViewScale = (scale: number) => {
    label.scale.set(1 / scale)
  }

  const destroy = () => {
    label.destroy()
    Object.values(highlights).forEach((h) => h.destroy())
    Object.values(sprites).forEach((s) => s.destroy())
  }

  return { setSelected, setViewScale, destroy }
}
