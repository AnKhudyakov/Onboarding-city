import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import { nameKey } from '@/entities/buildings'
import { resetProgress } from '@/entities/progressSlice'
import { currentStep, stageTitleKey, stepDescriptionKey, stepTitleKey, STAGES, STEPS } from '@/entities/scenario'
import { resetScenario } from '@/entities/scenarioSlice'
import { clearSelection, selectBuilding } from '@/entities/selectionSlice'

import styles from './ScenarioPanel.module.scss'

export const ScenarioPanel: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const completed = useSelector((s: RootState) => s.scenario.completed)
  const selectedId = useSelector((s: RootState) => s.selection.selectedBuildingId)

  const step = currentStep(completed)
  const stageIndex = step ? STAGES.indexOf(step.stage) : STAGES.length - 1

  const restart = () => {
    dispatch(resetScenario())
    dispatch(resetProgress())
    dispatch(clearSelection())
  }

  return (
    <aside className={styles.panel} aria-label={t('scenario.title')}>
      <header className={styles.header}>
        <h2 className={styles.title}>{t('scenario.title')}</h2>
        <p className={styles.counter}>{t('scenario.stageCounter', { current: stageIndex + 1, total: STAGES.length })}</p>
      </header>

      {step ? (
        <div className={styles.body}>
          <p className={styles.stage}>{t(stageTitleKey(step.stage))}</p>
          <h3 className={styles.name}>{t(stepTitleKey(step.id))}</h3>
          <p className={styles.text}>{t(stepDescriptionKey(step.id))}</p>
        </div>
      ) : (
        <div className={styles.body}>
          <h3 className={styles.name}>{t('scenario.doneTitle')}</h3>
          <p className={styles.text}>{t('scenario.doneText', { count: STEPS.length })}</p>
        </div>
      )}

      <div className={styles.actions}>
        {step && (
          <button
            type="button"
            className={styles.primary}
            onClick={() => dispatch(selectBuilding(step.building))}
            disabled={selectedId === step.building}
          >
            {t('scenario.goTo', { place: t(nameKey(step.building)) })}
          </button>
        )}

        <button type="button" className={styles.button} onClick={restart} disabled={!completed.length}>
          {t('scenario.restart')}
        </button>
      </div>
    </aside>
  )
}
