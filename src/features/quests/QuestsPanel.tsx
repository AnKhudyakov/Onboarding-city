import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import { currentStage, currentStep, stageSteps, stageTitleKey, stepTitleKey } from '@/entities/scenario'
import { CheckIcon, QuestIcon } from '@/shared/ui/icons'

import styles from './QuestsPanel.module.scss'

export const QuestsPanel: React.FC = () => {
  const { t } = useTranslation()
  const completed = useSelector((s: RootState) => s.scenario.completed)
  const [open, setOpen] = useState(true)

  const stage = currentStage(completed)
  const steps = stageSteps(stage)
  const active = currentStep(completed)
  const done = steps.filter((step) => completed.includes(step.id)).length

  return (
    <section className={styles.panel} aria-label={t('quests.title')}>
      <button type="button" className={styles.header} onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <QuestIcon className={styles.headerIcon} />
        <span className={styles.title}>{t(stageTitleKey(stage))}</span>
        <span className={styles.count}>
          {done} / {steps.length}
        </span>
        <span className={open ? styles.chevronOpen : styles.chevron} aria-hidden="true" />
      </button>

      {open && (
        <ul className={styles.list}>
          {steps.map((step) => {
            const isDone = completed.includes(step.id)
            const isActive = active?.id === step.id

            return (
              <li key={step.id} className={isDone ? styles.itemDone : styles.item}>
                <span className={styles.marker}>{isDone && <CheckIcon className={styles.check} />}</span>
                <span className={isActive ? styles.labelActive : styles.label}>{t(stepTitleKey(step.id))}</span>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
