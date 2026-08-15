import React from 'react'

import { CityBuilding } from '@/entities/buildings'
import { TERRAIN_BACKDROP } from '@/shared/constants/tiles'
import { PixiCanvas } from '@/shared/lib/pixi/PixiCanvas'

import styles from './CityCanvas.module.scss'
import { useControlScene } from './hooks/useControlScene'

type Props = {
  buildings: CityBuilding[]
}

export const CityCanvas: React.FC<Props> = ({ buildings }) => {
  const { handleInit, handleResize } = useControlScene(buildings)

  return <PixiCanvas className={styles.wrapper} background={TERRAIN_BACKDROP} onInit={handleInit} onResize={handleResize} />
}
