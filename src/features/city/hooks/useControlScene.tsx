import * as PIXI from 'pixi.js'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import { CityBuilding } from '@/entities/buildings'
import { arrived, departed } from '@/entities/progressSlice'
import { selectBuilding } from '@/entities/tourSlice'
import { createScene } from '@/features/city/lib/renderScene'
import { createAnimationController } from '@/features/player/lib/animationController'
import { buildPath, createMovementSystem } from '@/features/player/lib/movementSystem'
import { createPlayer } from '@/features/player/lib/renderPlayer'

type Scene = ReturnType<typeof createScene>
type Player = ReturnType<typeof createPlayer>
type Movement = ReturnType<typeof createMovementSystem>

export const useControlScene = (buildings: CityBuilding[]) => {
  const dispatch = useDispatch()
  const selectedId = useSelector((s: RootState) => s.tour.selectedBuildingId)

  const sceneRef = useRef<Scene | null>(null)
  const playerRef = useRef<Player | null>(null)
  const movementRef = useRef<Movement | null>(null)
  const targetRef = useRef<string | null>(null)

  const fitView = (app: PIXI.Application) => {
    const scale = sceneRef.current?.fit(app)

    if (scale) playerRef.current?.setViewScale(scale)
  }

  const handleInit = (app: PIXI.Application) => {
    if (sceneRef.current) return

    const scene = createScene(buildings, (b) => dispatch(selectBuilding(b.id)))
    sceneRef.current = scene
    app.stage.addChild(scene.world)

    const player = createPlayer(app)
    playerRef.current = player
    scene.depthLayer.addChild(player.player)

    movementRef.current = createMovementSystem(player.state, app, {
      animationController: createAnimationController(player.player),
      onArrive: () => {
        if (targetRef.current) dispatch(arrived(targetRef.current))
      },
    })

    fitView(app)
  }

  const handleResize = fitView

  useEffect(() => {
    const scene = sceneRef.current
    const player = playerRef.current
    const movement = movementRef.current

    if (!scene || !player || !movement) return

    scene.setSelected(selectedId)
    targetRef.current = selectedId

    if (selectedId) {
      movement.setPath(buildPath(player.state.position, selectedId))
      dispatch(departed())
    } else {
      movement.clear()
    }
  }, [dispatch, selectedId])

  useEffect(
    () => () => {
      movementRef.current?.destroy()
      playerRef.current?.destroy()
      sceneRef.current?.destroy()

      movementRef.current = null
      playerRef.current = null
      sceneRef.current = null
    },
    []
  )

  return { handleInit, handleResize }
}
