import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import { BUILDINGS } from '@/entities/buildings'
import { reset, selectBuilding } from '@/entities/tourSlice'

import styles from './TourPanel.module.scss'

const TourPanel: React.FC = () => {
  const selectedId = useSelector((s: RootState) => s.tour.selectedBuildingId)
  const dispatch = useDispatch()

  const index = BUILDINGS.findIndex((b) => b.id === selectedId)
  const current = index >= 0 ? BUILDINGS[index] : null

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(next, BUILDINGS.length - 1))
    dispatch(selectBuilding(BUILDINGS[clamped].id))
  }

  return (
    <aside className={styles.panel} aria-label="Guided tour">
      <header className={styles.header}>
        <h2 className={styles.title}>Guided tour</h2>
        <p className={styles.counter}>{current ? `Stop ${index + 1} of ${BUILDINGS.length}` : `${BUILDINGS.length} stops`}</p>
      </header>

      {current ? (
        <div className={styles.body}>
          <h3 className={styles.name}>{current.name}</h3>
          <p className={styles.text}>{current.description}</p>
        </div>
      ) : (
        <div className={styles.body}>
          <p className={styles.text}>Click a building, or start the tour, and the walker routes to it over the road graph.</p>
        </div>
      )}

      <div className={styles.actions}>
        <button type="button" className={styles.button} onClick={() => goTo(index - 1)} disabled={index <= 0}>
          Back
        </button>
        <button type="button" className={styles.primary} onClick={() => goTo(index + 1)} disabled={index === BUILDINGS.length - 1}>
          {current ? 'Next' : 'Start'}
        </button>
        <button type="button" className={styles.button} onClick={() => dispatch(reset())} disabled={!current}>
          Reset
        </button>
      </div>
    </aside>
  )
}

export default TourPanel
