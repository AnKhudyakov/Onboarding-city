import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import { BUILDINGS, descriptionKey, nameKey } from '@/entities/buildings'
import { reset, selectBuilding } from '@/entities/tourSlice'

import styles from './TourPanel.module.scss'

const TourPanel: React.FC = () => {
  const { t } = useTranslation()
  const selectedId = useSelector((s: RootState) => s.tour.selectedBuildingId)
  const dispatch = useDispatch()

  const index = BUILDINGS.findIndex((b) => b.id === selectedId)
  const current = index >= 0 ? BUILDINGS[index] : null

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(next, BUILDINGS.length - 1))
    dispatch(selectBuilding(BUILDINGS[clamped].id))
  }

  return (
    <aside className={styles.panel} aria-label={t('tour.title')}>
      <header className={styles.header}>
        <h2 className={styles.title}>{t('tour.title')}</h2>
        <p className={styles.counter}>
          {current ? t('tour.stop', { current: index + 1, total: BUILDINGS.length }) : t('tour.stops', { count: BUILDINGS.length })}
        </p>
      </header>

      {current ? (
        <div className={styles.body}>
          <h3 className={styles.name}>{t(nameKey(current.id))}</h3>
          <p className={styles.text}>{t(descriptionKey(current.id))}</p>
        </div>
      ) : (
        <div className={styles.body}>
          <p className={styles.text}>{t('tour.intro')}</p>
        </div>
      )}

      <div className={styles.actions}>
        <button type="button" className={styles.button} onClick={() => goTo(index - 1)} disabled={index <= 0}>
          {t('tour.back')}
        </button>
        <button type="button" className={styles.primary} onClick={() => goTo(index + 1)} disabled={index === BUILDINGS.length - 1}>
          {current ? t('tour.next') : t('tour.start')}
        </button>
        <button type="button" className={styles.button} onClick={() => dispatch(reset())} disabled={!current}>
          {t('tour.reset')}
        </button>
      </div>
    </aside>
  )
}

export default TourPanel
