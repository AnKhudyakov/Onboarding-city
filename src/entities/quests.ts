import { BUILDINGS } from './buildings'

export type Quest = {
  id: string
  title: string
  done: number
  goal: number
}

export const ROUTES_GOAL = 3

export const buildQuests = (visited: string[], trips: number): Quest[] => [
  {
    id: 'townHall',
    title: 'Reach the Town Hall',
    done: visited.includes('townHall') ? 1 : 0,
    goal: 1,
  },
  {
    id: 'landmarks',
    title: 'Visit every landmark',
    done: visited.length,
    goal: BUILDINGS.length,
  },
  {
    id: 'routes',
    title: `Walk ${ROUTES_GOAL} routes`,
    done: Math.min(trips, ROUTES_GOAL),
    goal: ROUTES_GOAL,
  },
]
