import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import { BuildingId, nameKey } from '@/entities/buildings'
import { leave, nextLine } from '@/entities/interiorSlice'
import { dialogueLineKey, DIALOGUES, npcNameKey, NPCS } from '@/entities/npcs'
import { currentStep } from '@/entities/scenario'
import { completeStep } from '@/entities/scenarioSlice'

import styles from './InteriorView.module.scss'

const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`

export const InteriorView: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { building, line } = useSelector((s: RootState) => s.interior)
  const completed = useSelector((s: RootState) => s.scenario.completed)

  if (!building) return null

  const dialogue = DIALOGUES[building as BuildingId]

  if (!dialogue) return null

  const npc = NPCS[dialogue.npc]
  const last = line >= dialogue.lines.length - 1
  const step = currentStep(completed)

  const finish = () => {
    if (step?.building === building) dispatch(completeStep(step.id))
    dispatch(leave())
  }

  return (
    <div className={styles.backdrop}>
      <section className={styles.room} aria-label={t(nameKey(building as BuildingId))}>
        <header className={styles.header}>
          <h2 className={styles.place}>{t(nameKey(building as BuildingId))}</h2>
          <button type="button" className={styles.close} onClick={() => dispatch(leave())} aria-label={t('interior.leave')}>
            ×
          </button>
        </header>

        <div className={styles.stage}>
          <span className={styles.portrait}>
            <img className={styles.npc} src={asset(npc.sprite)} alt="" />
          </span>

          <div className={styles.bubble}>
            <p className={styles.speaker}>{t(npcNameKey(npc.id))}</p>
            <p className={styles.line}>{t(dialogueLineKey(dialogue.lines[line]))}</p>
          </div>
        </div>

        <footer className={styles.actions}>
          <p className={styles.counter}>
            {line + 1} / {dialogue.lines.length}
          </p>

          {last ? (
            <button type="button" className={styles.primary} onClick={finish}>
              {t('interior.done')}
            </button>
          ) : (
            <button type="button" className={styles.primary} onClick={() => dispatch(nextLine())}>
              {t('interior.next')}
            </button>
          )}
        </footer>
      </section>
    </div>
  )
}
