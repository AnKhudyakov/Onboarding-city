import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import { ENERGY_MAX, energyTick, levelFromXp, resetProgress, XP_PER_LEVEL, xpIntoLevel } from '@/entities/progressSlice'
import { resetScenario } from '@/entities/scenarioSlice'
import { clearSelection } from '@/entities/selectionSlice'
import { LANGUAGES, setLanguage } from '@/shared/i18n'
import { EnergyIcon, GearIcon, GemIcon } from '@/shared/ui/icons'

import styles from './Header.module.scss'

const clock = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const { xp, gems, energy, secondsToEnergy } = useSelector((s: RootState) => s.progress)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    const id = window.setInterval(() => dispatch(energyTick()), 1000)

    return () => window.clearInterval(id)
  }, [dispatch])

  const level = levelFromXp(xp)
  const into = xpIntoLevel(xp)

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.mark}>ISO</span>
        <span className={styles.name}>City</span>
      </div>

      <div className={styles.level}>
        <span className={styles.levelBadge}>{t('header.level', { level })}</span>
        <span className={styles.bar}>
          <span className={styles.barFill} style={{ width: `${(into / XP_PER_LEVEL) * 100}%` }} />
          <span className={styles.barLabel}>{t('header.xp', { current: into, total: XP_PER_LEVEL })}</span>
        </span>
      </div>

      <div className={styles.resources}>
        <span className={`${styles.pill} ${styles.pillGem}`}>
          <GemIcon className={styles.icon} />
          <span className={styles.value}>{gems.toLocaleString(i18n.language)}</span>
        </span>

        <span className={`${styles.pill} ${styles.pillEnergy}`}>
          <EnergyIcon className={styles.icon} />
          <span className={styles.value}>
            {energy} / {ENERGY_MAX}
          </span>
          <span className={styles.timer}>{energy >= ENERGY_MAX ? t('header.energyFull') : clock(secondsToEnergy)}</span>
        </span>
      </div>

      <div className={styles.settings}>
        <button
          type="button"
          className={styles.gear}
          aria-label={t('header.settings')}
          aria-expanded={settingsOpen}
          onClick={() => setSettingsOpen((open) => !open)}
        >
          <GearIcon className={styles.gearIcon} />
        </button>

        {settingsOpen && (
          <div className={styles.menu}>
            <p className={styles.menuLabel}>{t('header.language')}</p>

            <div className={styles.languages}>
              {LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  className={i18n.language === language.code ? styles.languageActive : styles.language}
                  onClick={() => setLanguage(language.code)}
                >
                  {language.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className={styles.menuItem}
              onClick={() => {
                dispatch(resetProgress())
                dispatch(resetScenario())
                dispatch(clearSelection())
                setSettingsOpen(false)
              }}
            >
              {t('header.resetProgress')}
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
