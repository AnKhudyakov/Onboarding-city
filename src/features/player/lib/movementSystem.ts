import * as PIXI from 'pixi.js'

import { ARRIVE_THRESHOLD, SPEED } from '@/shared/constants/movement'
import { GRAPH, NODES } from '@/shared/constants/paths'

import { createAnimationController } from './animationController'

type Vector = { x: number; y: number }

type Options = {
  speed?: number
  arriveThreshold?: number
  animationController?: ReturnType<typeof createAnimationController>
}

export const createMovementSystem = (state: { position: Vector }, app: PIXI.Application, options: Options = {}) => {
  const speed = options.speed ?? SPEED
  const arriveThreshold = options.arriveThreshold ?? ARRIVE_THRESHOLD

  let path: Vector[] = []
  let index = 0

  const clear = () => {
    path = []
    index = 0
  }

  const setPath = (next: Vector[]) => {
    if (!next.length) return

    path = next
    index = 0
  }

  const update = () => {
    const target = path[index]

    if (!target) {
      options.animationController?.update(0, 0)
      return
    }

    const dx = target.x - state.position.x
    const dy = target.y - state.position.y
    const distance = Math.hypot(dx, dy)

    options.animationController?.update(dx, dy)

    if (distance < arriveThreshold) {
      state.position.x = target.x
      state.position.y = target.y

      index += 1

      if (index >= path.length) clear()

      return
    }

    state.position.x += (dx / distance) * speed
    state.position.y += (dy / distance) * speed
  }

  app.ticker.add(update)

  return {
    setPath,
    clear,
    destroy: () => app.ticker.remove(update),
  }
}

export const getClosestNode = (position: Vector) => {
  let closest = ''
  let best = Infinity

  for (const node of Object.values(NODES)) {
    const distance = (node.x - position.x) ** 2 + (node.y - position.y) ** 2

    if (distance < best) {
      best = distance
      closest = node.id
    }
  }

  return closest
}

export const findPath = (start: string, goal: string): string[] => {
  if (start === goal) return [start]

  const cameFrom = new Map<string, string | null>([[start, null]])
  const queue = [start]

  while (queue.length) {
    const current = queue.shift()!

    if (current === goal) break

    for (const next of GRAPH[current] ?? []) {
      if (cameFrom.has(next)) continue

      cameFrom.set(next, current)
      queue.push(next)
    }
  }

  if (!cameFrom.has(goal)) return []

  const path: string[] = []

  for (let at: string | null = goal; at; at = cameFrom.get(at) ?? null) path.push(at)

  return path.reverse()
}

export const buildPath = (from: Vector, toNode: string): Vector[] =>
  findPath(getClosestNode(from), toNode).map((id) => ({ x: NODES[id].x, y: NODES[id].y }))
