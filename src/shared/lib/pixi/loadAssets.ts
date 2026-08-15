import * as PIXI from 'pixi.js'

import { Direction, ROTATION, RUN_FRAMES } from '@/entities/player'
import { BUILDING_TEXTURES, PROP_TEXTURES, TILE_TEXTURES } from '@/shared/constants/tiles'

const url = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`

export const playerFrame = (dir: Direction, state: 'idle' | 'run', frame: number) => `player_${dir}_${state}_${frame}`

const playerBundle = () =>
  Object.entries(ROTATION).flatMap(([dir, rotation]) => [
    {
      alias: playerFrame(dir as Direction, 'idle', 0),
      src: url(`character/Male_${rotation}_Idle0.png`),
    },
    ...Array.from({ length: RUN_FRAMES }, (_, i) => ({
      alias: playerFrame(dir as Direction, 'run', i),
      src: url(`character/Male_${rotation}_Run${i}.png`),
    })),
  ])

export const loadAssets = async () => {
  await PIXI.Assets.load([
    ...Object.entries(TILE_TEXTURES).map(([alias, path]) => ({ alias, src: url(path) })),
    ...Object.entries(PROP_TEXTURES).map(([alias, path]) => ({ alias, src: url(path) })),
    ...Object.entries(BUILDING_TEXTURES).map(([alias, path]) => ({ alias, src: url(path) })),
    ...playerBundle(),
  ])
}
