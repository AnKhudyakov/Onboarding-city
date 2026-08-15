import { BUILDINGS } from './buildings'

export type Quest = {
  id: string
  labelKey: string
  labelCount?: number
  done: number
  goal: number
}

export const ROUTES_GOAL = 3

export const buildQuests = (visited: string[], trips: number): Quest[] => [
  {
    id: 'townHall',
    labelKey: 'quests.townHall',
    done: visited.includes('townHall') ? 1 : 0,
    goal: 1,
  },
  {
    id: 'landmarks',
    labelKey: 'quests.landmarks',
    done: visited.length,
    goal: BUILDINGS.length,
  },
  {
    id: 'routes',
    labelKey: 'quests.routes',
    labelCount: ROUTES_GOAL,
    done: Math.min(trips, ROUTES_GOAL),
    goal: ROUTES_GOAL,
  },
]
