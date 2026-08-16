import * as PIXI from 'pixi.js'

import { NPCS } from '@/entities/npcs'
import { Direction, ROTATION, RUN_FRAMES } from '@/entities/player'
import { BUILDING_TEXTURES, PROP_TEXTURES, TILE_TEXTURES } from '@/shared/constants/tiles'

const url = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`

const SPRITE_SHARE = 0.9

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

const decodeImages = async (sources: string[], onProgress?: (progress: number) => void) => {
  let done = 0

  await Promise.all(
    sources.map(async (src) => {
      const image = new Image()

      image.src = src

      await image.decode().catch(() => undefined)

      done += 1
      onProgress?.(done / sources.length)
    })
  )
}

export const loadAssets = async (onProgress?: (progress: number) => void) => {
  await PIXI.Assets.load(
    [
      ...Object.entries(TILE_TEXTURES).map(([alias, path]) => ({ alias, src: url(path) })),
      ...Object.entries(PROP_TEXTURES).map(([alias, path]) => ({ alias, src: url(path) })),
      ...Object.entries(BUILDING_TEXTURES).map(([alias, path]) => ({ alias, src: url(path) })),
      ...playerBundle(),
    ],
    (progress) => onProgress?.(progress * SPRITE_SHARE)
  )

  await decodeImages(
    Object.values(NPCS).map((npc) => url(npc.sprite)),
    (progress) => onProgress?.(SPRITE_SHARE + progress * (1 - SPRITE_SHARE))
  )
}
