import { isSea } from '@/entities/cityLayout'
import { ShoreId, TileId } from '@/shared/constants/tiles'

import { variant } from './variant'

const EDGES = [
  { name: 'N', dx: -1, dy: 0 },
  { name: 'E', dx: 0, dy: -1 },
  { name: 'S', dx: 1, dy: 0 },
  { name: 'W', dx: 0, dy: 1 },
] as const

const WATER = ['waterPlain', 'waterPlain', 'waterPlain', 'water1', 'water2', 'water3'] as const

export const shoreTile = (x: number, y: number): TileId => {
  const edge = EDGES.find((e) => !isSea(x + e.dx, y + e.dy))

  if (edge) return `shore${edge.name}` as ShoreId

  return variant(WATER, x, y)
}
