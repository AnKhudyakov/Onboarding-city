import { TILE_H, TILE_W } from '@/shared/constants/tiles'

export const isoToScreen = (x: number, y: number) => ({
  x: (x - y) * (TILE_W / 2),
  y: (x + y) * (TILE_H / 2),
})
