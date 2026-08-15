import { BuildingPieceId } from '@/shared/constants/tiles'

export type BuildingId = 'townHall' | 'museum' | 'market' | 'library'

export type CityBuilding = {
  id: BuildingId
  name: string
  x: number
  y: number
  entry: { x: number; y: number }
  piece: BuildingPieceId
  description: string
}

export const BUILDINGS: CityBuilding[] = [
  {
    id: 'townHall',
    name: 'Town Hall',
    x: 4,
    y: 3,
    entry: { x: 4, y: 2 },
    piece: 'blockConcrete',
    description: 'The north side of the loop. Clicking a landmark asks the navigation graph for a route and the walk is animated along it.',
  },
  {
    id: 'museum',
    name: 'Museum',
    x: 6,
    y: 4,
    entry: { x: 7, y: 4 },
    piece: 'towerConcrete',
    description:
      'The east side. The whole scene shares one container sorted on grid depth, x + y, so whatever is nearer the camera is drawn last, water and pavement included.',
  },
  {
    id: 'market',
    name: 'Market Hall',
    x: 5,
    y: 6,
    entry: { x: 5, y: 7 },
    piece: 'shop',
    description: 'The south side, and where the walker starts. Road tiles are generated from the same graph the walker routes over.',
  },
  {
    id: 'library',
    name: 'Library',
    x: 3,
    y: 5,
    entry: { x: 2, y: 5 },
    piece: 'officeMid',
    description: 'The west side. Selection state lives in Redux, and the Pixi scene reads it rather than owning it.',
  },
]
