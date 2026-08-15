import * as PIXI from 'pixi.js'

import { Direction, ROTATION, RUN_FRAMES, START_DIRECTION } from '@/entities/player'
import { playerFrame } from '@/shared/lib/pixi/loadAssets'

type AnimState = 'idle' | 'run'

const IDLE_SPEED = 0.05
const RUN_SPEED = 0.35

export const getIsoDirection = (dx: number, dy: number): Direction => {
  if (Math.abs(dx) >= Math.abs(dy)) return dx > 0 ? 'SE' : 'NW'

  return dy > 0 ? 'SW' : 'NE'
}

const buildClips = () => {
  const clips = {} as Record<`${AnimState}_${Direction}`, PIXI.Texture[]>

  for (const dir of Object.keys(ROTATION) as Direction[]) {
    clips[`idle_${dir}`] = [PIXI.Assets.get<PIXI.Texture>(playerFrame(dir, 'idle', 0))]
    clips[`run_${dir}`] = Array.from({ length: RUN_FRAMES }, (_, i) => PIXI.Assets.get<PIXI.Texture>(playerFrame(dir, 'run', i)))
  }

  return clips
}

export const createAnimationController = (player: PIXI.AnimatedSprite) => {
  const clips = buildClips()

  let currentClip = ''
  let currentDir: Direction = START_DIRECTION

  const setClip = (state: AnimState, dir: Direction) => {
    const key = `${state}_${dir}` as const

    if (currentClip === key) return

    currentClip = key
    currentDir = dir

    player.textures = clips[key]
    player.animationSpeed = state === 'run' ? RUN_SPEED : IDLE_SPEED
    player.play()
  }

  const update = (dx: number, dy: number) => {
    if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
      setClip('idle', currentDir)
      return
    }

    setClip('run', getIsoDirection(dx, dy))
  }

  return { update }
}
