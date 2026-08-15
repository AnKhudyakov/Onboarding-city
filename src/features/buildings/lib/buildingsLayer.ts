import * as PIXI from 'pixi.js'

import { CityBuilding } from '@/entities/buildings'
import { isoToScreen } from '@/features/city/lib/centerIsometric'
import { BUILDING_FOOTPRINT_INSET, SPRITE_BASE_OFFSET, TILE_H, TILE_W } from '@/shared/constants/tiles'

const SELECTED_COLOR = 0x00e5c0
const HOVERED_COLOR = 0xffd166

const MARKER_FILL = 0xffd166
const MARKER_RIM = 0x1a1a22
const MARKER_TICK = 0x2a1f06
const MARKER_RADIUS = 13
const MARKER_TIP = 4
const MARKER_GAP = 10
const MARKER_BOB = 5
const MARKER_PERIOD = 1400

const HIGHLIGHT_GROWTH = 1.06

const LABEL_GAP = 18

const outline = (height: number) => {
  const halfW = (1 - 2 * BUILDING_FOOTPRINT_INSET) * (TILE_W / 2)
  const halfH = (1 - 2 * BUILDING_FOOTPRINT_INSET) * (TILE_H / 2)

  const base = -SPRITE_BASE_OFFSET
  const walls = height - SPRITE_BASE_OFFSET - halfH

  return new PIXI.Polygon([-halfW, base, 0, base + halfH, halfW, base, halfW, base - walls, 0, base - halfH - walls, -halfW, base - walls])
}

const dimmed = () => {
  const filter = new PIXI.ColorMatrixFilter()
  const k = 0.82
  const lift = 0.08
  const [r, g, b] = [0.2126 * k, 0.7152 * k, 0.0722 * k]

  filter.matrix = [r, g, b, 0, lift, r, g, b, 0, lift, r, g, b, 0, lift, 0, 0, 0, 1, 0]

  return filter
}

const silhouette = (color: number) => {
  const filter = new PIXI.ColorMatrixFilter()
  const r = ((color >> 16) & 0xff) / 255
  const g = ((color >> 8) & 0xff) / 255
  const b = (color & 0xff) / 255

  filter.matrix = [0, 0, 0, 0, r, 0, 0, 0, 0, g, 0, 0, 0, 0, b, 0, 0, 0, 1, 0]

  return filter
}

const pinPath = (radius: number, tip: number) => {
  const centre = -(tip + Math.round(radius * 2))
  const distance = Math.abs(centre) - tip
  const half = Math.asin(radius / distance)
  const points: number[] = []

  for (let i = 0; i <= 28; i++) {
    const angle = Math.PI / 2 - half - (i / 28) * (2 * Math.PI - 2 * half)

    points.push(radius * Math.cos(angle), centre + radius * Math.sin(angle))
  }

  points.push(0, -tip)

  return { points, centre }
}

const marker = () => {
  const shape = new PIXI.Graphics()
  const { points, centre } = pinPath(MARKER_RADIUS, MARKER_TIP)

  shape.poly(points.map((v, i) => (i % 2 ? v + 3 : v))).fill({ color: 0x000000, alpha: 0.22 })
  shape.poly(points).fill(MARKER_FILL).stroke({ color: MARKER_RIM, width: 2, join: 'round' })
  shape.ellipse(0, centre - 4, MARKER_RADIUS * 0.62, MARKER_RADIUS * 0.34).fill({ color: 0xffffff, alpha: 0.34 })
  shape
    .moveTo(-5.2, centre - 0.2)
    .lineTo(-1.4, centre + 3.6)
    .lineTo(6.2, centre - 5)
    .stroke({ color: MARKER_TICK, width: 3.4, cap: 'round', join: 'round' })

  return shape
}

export const createBuildings = (depthLayer: PIXI.Container, buildings: CityBuilding[], onSelect: (b: CityBuilding) => void) => {
  let selectedId: string | null = null
  let hoveredId: string | null = null
  let targetId: string | null = null
  let names: Record<string, string> = {}
  let locked: string[] = []
  let elapsed = 0
  let markerBaseY = 0

  const sprites: Record<string, PIXI.Sprite> = {}
  const highlights: Record<string, PIXI.Sprite> = {}

  const selectedFilter = silhouette(SELECTED_COLOR)
  const hoveredFilter = silhouette(HOVERED_COLOR)
  const lockedFilter = dimmed()

  const label = new PIXI.Text({
    text: '',
    style: {
      fontFamily: 'system-ui, sans-serif',
      fontSize: 16,
      fill: 0xffffff,
      stroke: { color: 0x1a1a22, width: 5 },
    },
  })

  const pin = marker()

  pin.visible = false
  pin.zIndex = 9_000
  depthLayer.addChild(pin)

  const bob = (ticker: PIXI.Ticker) => {
    if (!pin.visible) return

    elapsed += ticker.deltaMS
    pin.y = markerBaseY - Math.abs(Math.sin((elapsed / MARKER_PERIOD) * Math.PI)) * MARKER_BOB
  }

  PIXI.Ticker.shared.add(bob)

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

  const placeMarker = () => {
    const sprite = targetId ? sprites[targetId] : null

    pin.visible = Boolean(sprite)

    if (!sprite) return

    pin.x = sprite.x
    markerBaseY = sprite.y - sprite.height - MARKER_GAP
    pin.y = markerBaseY
  }

  const refresh = () => {
    placeMarker()

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

    label.text = names[active.id] ?? active.id
    label.x = sprite.x
    label.y = sprite.y - sprite.height - LABEL_GAP
    label.visible = true
  }

  const setSelected = (id: string | null) => {
    selectedId = id
    refresh()
  }

  const setNames = (next: Record<string, string>) => {
    names = next
    refresh()
  }

  const setTarget = (id: string | null) => {
    targetId = id
    refresh()
  }

  const setLocked = (next: string[]) => {
    locked = next

    for (const [id, sprite] of Object.entries(sprites)) {
      const isLocked = locked.includes(id)

      sprite.eventMode = isLocked ? 'none' : 'static'
      sprite.cursor = isLocked ? 'default' : 'pointer'
      sprite.filters = isLocked ? [lockedFilter] : []
    }

    if (hoveredId && locked.includes(hoveredId)) hoveredId = null

    refresh()
  }

  const setViewScale = (scale: number) => {
    label.scale.set(1 / scale)
    pin.scale.set(1 / scale)
  }

  const destroy = () => {
    PIXI.Ticker.shared.remove(bob)
    pin.destroy()
    label.destroy()
    Object.values(highlights).forEach((h) => h.destroy())
    Object.values(sprites).forEach((s) => s.destroy())
  }

  return { setSelected, setNames, setLocked, setTarget, setViewScale, destroy }
}
