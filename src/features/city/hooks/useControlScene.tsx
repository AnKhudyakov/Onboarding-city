import * as PIXI from 'pixi.js'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import { BUILDINGS, CityBuilding, nameKey } from '@/entities/buildings'
import { arrived, departed } from '@/entities/progressSlice'
import { currentStep, unlockedBuildings } from '@/entities/scenario'
import { completeStep } from '@/entities/scenarioSlice'
import { selectBuilding } from '@/entities/selectionSlice'
import { createScene } from '@/features/city/lib/renderScene'
import { createAnimationController } from '@/features/player/lib/animationController'
import { buildPath, createMovementSystem } from '@/features/player/lib/movementSystem'
import { createPlayer } from '@/features/player/lib/renderPlayer'

type Scene = ReturnType<typeof createScene>
type Player = ReturnType<typeof createPlayer>
type Movement = ReturnType<typeof createMovementSystem>

export const useControlScene = (buildings: CityBuilding[]) => {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const selectedId = useSelector((s: RootState) => s.selection.selectedBuildingId)
  const completed = useSelector((s: RootState) => s.scenario.completed)

  const sceneRef = useRef<Scene | null>(null)
  const playerRef = useRef<Player | null>(null)
  const movementRef = useRef<Movement | null>(null)
  const targetRef = useRef<string | null>(null)
  const stepRef = useRef(currentStep(completed))

  const names = () => Object.fromEntries(buildings.map((b) => [b.id, t(nameKey(b.id))]))

  const lockedIds = (done: string[]) => {
    const unlocked = unlockedBuildings(done)

    return BUILDINGS.map((b) => b.id).filter((id) => !unlocked.includes(id))
  }

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
        const target = targetRef.current

        if (!target) return

        dispatch(arrived(target))

        if (stepRef.current?.building === target) dispatch(completeStep(stepRef.current.id))
      },
    })

    scene.setNames(names())
    scene.setLocked(lockedIds(completed))
    fitView(app)
  }

  const handleResize = fitView

  useEffect(() => {
    sceneRef.current?.setNames(Object.fromEntries(buildings.map((b) => [b.id, t(nameKey(b.id))])))
  }, [buildings, i18n.language, t])

  useEffect(() => {
    stepRef.current = currentStep(completed)
    sceneRef.current?.setLocked(lockedIds(completed))
  }, [completed])

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
