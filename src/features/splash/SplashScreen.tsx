import React from 'react'
import { useTranslation } from 'react-i18next'

import { LanguageSwitch } from '@/shared/ui/LanguageSwitch'

import styles from './SplashScreen.module.scss'

type Props = {
  progress: number
  ready: boolean
  onStart: () => void
}

export const SplashScreen: React.FC<Props> = ({ progress, ready, onStart }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.splash}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.mark}>ISO</span>
          <span className={styles.name}>City</span>
        </div>

        <p className={styles.tagline}>{t('splash.tagline')}</p>

        <div className={styles.progress}>
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
          <p className={styles.status}>{ready ? t('splash.ready') : t('splash.loading', { percent: Math.round(progress * 100) })}</p>
        </div>

        <button type="button" className={styles.start} onClick={onStart} disabled={!ready}>
          {t('splash.start')}
        </button>

        <LanguageSwitch />
      </div>
    </div>
  )
}
