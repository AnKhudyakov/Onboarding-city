import { BUILDINGS } from '@/entities/buildings'
import { RING_MAX, RING_MIN } from '@/entities/cityLayout'

export type Node = {
  id: string
  x: number
  y: number
}

const CORNERS: Node[] = [
  { id: 'north', x: RING_MIN, y: RING_MIN },
  { id: 'east', x: RING_MAX, y: RING_MIN },
  { id: 'south', x: RING_MAX, y: RING_MAX },
  { id: 'west', x: RING_MIN, y: RING_MAX },
]

const GATES: Node[] = [
  { id: 'gateNorth', x: RING_MIN - 14, y: RING_MIN },
  { id: 'gateWest', x: RING_MIN, y: RING_MAX + 11 },
]

export const NODES: Record<string, Node> = Object.fromEntries(
  [...CORNERS, ...GATES, ...BUILDINGS.map((b) => ({ id: b.id, x: b.entry.x, y: b.entry.y }))].map((n) => [n.id, n])
)

export const SEGMENTS: [Node, Node][] = [
  [NODES.north, NODES.townHall],
  [NODES.townHall, NODES.east],
  [NODES.east, NODES.archive],
  [NODES.archive, NODES.south],
  [NODES.south, NODES.market],
  [NODES.market, NODES.west],
  [NODES.west, NODES.library],
  [NODES.library, NODES.north],
  [NODES.north, NODES.gateNorth],
  [NODES.west, NODES.gateWest],
]

export const GRAPH: Record<string, string[]> = SEGMENTS.reduce<Record<string, string[]>>((acc, [a, b]) => {
  ;(acc[a.id] ??= []).push(b.id)
  ;(acc[b.id] ??= []).push(a.id)
  return acc
}, {})

export const START_NODE = 'market'
