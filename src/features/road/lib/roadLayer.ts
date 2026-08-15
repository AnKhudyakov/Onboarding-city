import { BUILDINGS } from '@/entities/buildings'
import { SEGMENTS } from '@/shared/constants/paths'
import { TileId } from '@/shared/constants/tiles'

export const cellKey = (x: number, y: number) => `${x}:${y}`

const EDGES = [
  { name: 'N', dx: -1, dy: 0 },
  { name: 'E', dx: 0, dy: -1 },
  { name: 'S', dx: 1, dy: 0 },
  { name: 'W', dx: 0, dy: 1 },
] as const

const edgeTowards = (dx: number, dy: number) => EDGES.find((e) => e.dx === Math.sign(dx) && e.dy === Math.sign(dy))?.name

export const buildRoadMap = (): Map<string, TileId> => {
  const exits = new Map<string, Set<string>>()

  const addExit = (x: number, y: number, dx: number, dy: number) => {
    const edge = edgeTowards(dx, dy)

    if (!edge) return

    const key = cellKey(x, y)
    const set = exits.get(key) ?? new Set<string>()

    set.add(edge)
    exits.set(key, set)
  }

  for (const [from, to] of SEGMENTS) {
    const stepX = Math.sign(to.x - from.x)
    const stepY = Math.sign(to.y - from.y)
    const length = Math.max(Math.abs(to.x - from.x), Math.abs(to.y - from.y))

    for (let i = 0; i <= length; i++) {
      const x = from.x + stepX * i
      const y = from.y + stepY * i

      if (i < length) addExit(x, y, stepX, stepY)
      if (i > 0) addExit(x, y, -stepX, -stepY)
    }
  }

  const entries = new Set(BUILDINGS.map((b) => cellKey(b.entry.x, b.entry.y)))
  const road = new Map<string, TileId>()

  for (const [key, set] of exits) {
    const signature = EDGES.filter((e) => set.has(e.name))
      .map((e) => e.name)
      .join('')

    if (entries.has(key) && (signature === 'NS' || signature === 'EW')) {
      road.set(key, `crossing${signature}` as TileId)
      continue
    }

    road.set(key, (signature.length === 1 ? `roadEnd${signature}` : `road${signature}`) as TileId)
  }

  return road
}
