export type Direction = 'NE' | 'SE' | 'SW' | 'NW'

export const ROTATION: Record<Direction, number> = {
  NE: 0,
  SE: 2,
  SW: 4,
  NW: 6,
}

export const RUN_FRAMES = 10

export const START_DIRECTION: Direction = 'SW'

export const FRAME_HEIGHT = 512
export const FOOT_ROW = 466

export const FIGURE_HEIGHT = 157
