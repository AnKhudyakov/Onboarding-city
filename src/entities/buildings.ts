import { BuildingPieceId } from '@/shared/constants/tiles'

export type BuildingId = 'townHall' | 'museum' | 'market' | 'library'

export type CityBuilding = {
  id: BuildingId
  x: number
  y: number
  entry: { x: number; y: number }
  piece: BuildingPieceId
}

export const nameKey = (id: BuildingId) => `buildings.${id}.name`
export const descriptionKey = (id: BuildingId) => `buildings.${id}.description`

export const BUILDINGS: CityBuilding[] = [
  {
    id: 'townHall',
    x: 4,
    y: 3,
    entry: { x: 4, y: 2 },
    piece: 'blockConcrete',
  },
  {
    id: 'museum',
    x: 6,
    y: 4,
    entry: { x: 7, y: 4 },
    piece: 'towerConcrete',
  },
  {
    id: 'market',
    x: 5,
    y: 6,
    entry: { x: 5, y: 7 },
    piece: 'shop',
  },
  {
    id: 'library',
    x: 3,
    y: 5,
    entry: { x: 2, y: 5 },
    piece: 'officeMid',
  },
]
