import { PropId, TileId } from '@/shared/constants/tiles'

export const RING_MIN = 2
export const RING_MAX = 7

export const isTown = (x: number, y: number) => x >= RING_MIN && x <= RING_MAX && y >= RING_MIN && y <= RING_MAX

export const SEA_EDGE = -1

export const isSea = (_x: number, y: number) => y <= SEA_EDGE

export const GROUND_HALF_ACROSS = 24
export const GROUND_HALF_DOWN = 32

const CENTRE = (RING_MIN + RING_MAX) / 2

export const groundCells = () => {
  const cells: { x: number; y: number }[] = []

  const depthCentre = CENTRE * 2

  for (let depth = depthCentre - GROUND_HALF_DOWN; depth <= depthCentre + GROUND_HALF_DOWN; depth++) {
    for (let across = -GROUND_HALF_ACROSS; across <= GROUND_HALF_ACROSS; across++) {
      if ((depth + across) % 2 !== 0) continue

      cells.push({ x: (depth + across) / 2, y: (depth - across) / 2 })
    }
  }

  return cells
}

export type Decor = { x: number; y: number; tile: TileId }
export type Prop = { x: number; y: number; prop: PropId; size?: number }

export const DECOR: Decor[] = [{ x: 4, y: 4, tile: 'fountain' }]

export const PROPS: Prop[] = [
  { x: 6, y: 3, prop: 'treeBroadA' },
  { x: 3, y: 6, prop: 'treeMaple', size: 0.86 },
  { x: 5, y: 4, prop: 'treeBroadB', size: 0.94 },

  { x: 1, y: 3, prop: 'firSmall', size: 0.8 },
  { x: 1, y: 5, prop: 'treeBroadA' },
  { x: 1, y: 7, prop: 'treeBroadB', size: 0.86 },
  { x: 3, y: 1, prop: 'treeMaple', size: 0.94 },
  { x: 5, y: 1, prop: 'firTall', size: 0.8 },
  { x: 7, y: 1, prop: 'treeBroadA' },
  { x: 8, y: 2, prop: 'firSmall', size: 0.86 },
  { x: 8, y: 4, prop: 'treeBroadB', size: 0.94 },
  { x: 8, y: 6, prop: 'treeMaple', size: 0.8 },
  { x: 8, y: 8, prop: 'firTall' },
  { x: 3, y: 8, prop: 'treeBroadA', size: 0.86 },
  { x: 5, y: 8, prop: 'firSmall', size: 0.94 },
  { x: 6, y: 9, prop: 'treeBroadB', size: 0.8 },

  { x: 10, y: 1, prop: 'firTall' },
  { x: 11, y: 4, prop: 'treeBroadA', size: 0.86 },
  { x: 10, y: 7, prop: 'treeMaple', size: 0.94 },
  { x: 11, y: 10, prop: 'firSmall', size: 0.8 },
  { x: 8, y: 11, prop: 'treeBroadB' },
  { x: 4, y: 12, prop: 'firTall', size: 0.86 },
  { x: 0, y: 10, prop: 'treeBroadA', size: 0.94 },
  { x: -2, y: 6, prop: 'treeMaple', size: 0.8 },
  { x: -3, y: 9, prop: 'firSmall' },
  { x: -1, y: 12, prop: 'treeBroadB', size: 0.86 },
  { x: -4, y: 4, prop: 'firTall', size: 0.94 },
  { x: 5, y: 0, prop: 'treeBroadA', size: 0.8 },
  { x: 8, y: 0, prop: 'treeMaple' },
  { x: 11, y: 0, prop: 'firSmall', size: 0.86 },
  { x: 13, y: 2, prop: 'treeBroadB', size: 0.94 },
  { x: 14, y: 6, prop: 'firTall', size: 0.8 },

  { x: 2, y: 0, prop: 'rocks' },
  { x: 4, y: 0, prop: 'rocks', size: 0.86 },
  { x: 3, y: -2, prop: 'boat' },
]
