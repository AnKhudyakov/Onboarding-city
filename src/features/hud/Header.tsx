import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import { ENERGY_MAX, energyTick, levelFromXp, resetProgress, XP_PER_LEVEL, xpIntoLevel } from '@/entities/progressSlice'
import { reset } from '@/entities/tourSlice'

import styles from './Header.module.scss'
import { CoinIcon, EnergyIcon, GearIcon } from './icons'

const clock = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

export const Header: React.FC = () => {
  const dispatch = useDispatch()
  const { xp, coins, energy, secondsToEnergy } = useSelector((s: RootState) => s.progress)
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
        <span className={styles.levelBadge}>Lv. {level}</span>
        <span className={styles.bar}>
          <span className={styles.barFill} style={{ width: `${(into / XP_PER_LEVEL) * 100}%` }} />
          <span className={styles.barLabel}>
            {into} / {XP_PER_LEVEL} XP
          </span>
        </span>
      </div>

      <div className={styles.resources}>
        <span className={`${styles.pill} ${styles.pillCoin}`}>
          <CoinIcon className={styles.icon} />
          <span className={styles.value}>{coins.toLocaleString('en-US')}</span>
        </span>

        <span className={`${styles.pill} ${styles.pillEnergy}`}>
          <EnergyIcon className={styles.icon} />
          <span className={styles.value}>
            {energy} / {ENERGY_MAX}
          </span>
          <span className={styles.timer}>{energy >= ENERGY_MAX ? 'full' : clock(secondsToEnergy)}</span>
        </span>
      </div>

      <div className={styles.settings}>
        <button
          type="button"
          className={styles.gear}
          aria-label="Settings"
          aria-expanded={settingsOpen}
          onClick={() => setSettingsOpen((open) => !open)}
        >
          <GearIcon className={styles.gearIcon} />
        </button>

        {settingsOpen && (
          <div className={styles.menu}>
            <button
              type="button"
              className={styles.menuItem}
              onClick={() => {
                dispatch(resetProgress())
                dispatch(reset())
                setSettingsOpen(false)
              }}
            >
              Reset progress
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
