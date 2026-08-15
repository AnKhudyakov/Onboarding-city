import * as PIXI from 'pixi.js'

import { FIGURE_HEIGHT, FOOT_ROW, FRAME_HEIGHT, START_DIRECTION } from '@/entities/player'
import { isoToScreen } from '@/features/city/lib/centerIsometric'
import { NODES, START_NODE } from '@/shared/constants/paths'
import { playerFrame } from '@/shared/lib/pixi/loadAssets'

const PLAYER_SCREEN_HEIGHT = 60

export const createPlayer = (app: PIXI.Application) => {
  const start = NODES[START_NODE]

  const player = new PIXI.AnimatedSprite([PIXI.Assets.get<PIXI.Texture>(playerFrame(START_DIRECTION, 'idle', 0))])

  player.anchor.set(0.5, FOOT_ROW / FRAME_HEIGHT)
  player.animationSpeed = 0.05
  player.play()

  const state = { position: { x: start.x, y: start.y } }

  const sync = () => {
    const p = isoToScreen(state.position.x, state.position.y)

    player.x = p.x
    player.y = p.y

    const depth = Math.round(state.position.x + state.position.y)

    if (player.zIndex !== depth) player.zIndex = depth
  }

  const setViewScale = (worldScale: number) => {
    player.scale.set(PLAYER_SCREEN_HEIGHT / FIGURE_HEIGHT / worldScale)
  }

  setViewScale(1)
  sync()
  app.ticker.add(sync)

  const destroy = () => {
    app.ticker.remove(sync)
    player.destroy()
  }

  return { player, state, setViewScale, destroy }
}
