import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import { buildQuests } from '@/entities/quests'
import { CheckIcon, QuestIcon } from '@/features/hud/icons'

import styles from './QuestsPanel.module.scss'

export const QuestsPanel: React.FC = () => {
  const { visited, trips } = useSelector((s: RootState) => s.progress)
  const [open, setOpen] = useState(true)

  const quests = buildQuests(visited, trips)
  const completed = quests.filter((q) => q.done >= q.goal).length

  return (
    <section className={styles.panel} aria-label="Quests">
      <button type="button" className={styles.header} onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <QuestIcon className={styles.headerIcon} />
        <span className={styles.title}>Quests</span>
        <span className={styles.count}>
          {completed} / {quests.length}
        </span>
        <span className={open ? styles.chevronOpen : styles.chevron} aria-hidden="true" />
      </button>

      {open && (
        <ul className={styles.list}>
          {quests.map((quest) => {
            const done = quest.done >= quest.goal

            return (
              <li key={quest.id} className={done ? styles.itemDone : styles.item}>
                <span className={styles.marker}>{done && <CheckIcon className={styles.check} />}</span>

                <span className={styles.body}>
                  <span className={styles.label}>{quest.title}</span>

                  <span className={styles.track}>
                    <span className={styles.fill} style={{ width: `${(Math.min(quest.done, quest.goal) / quest.goal) * 100}%` }} />
                  </span>
                </span>

                <span className={styles.progress}>
                  {Math.min(quest.done, quest.goal)} / {quest.goal}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
