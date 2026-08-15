import React from 'react'
import { useTranslation } from 'react-i18next'

import { LANGUAGES, setLanguage } from '@/shared/i18n'

import styles from './SplashScreen.module.scss'

type Props = {
  progress: number
  ready: boolean
  onStart: () => void
}

export const SplashScreen: React.FC<Props> = ({ progress, ready, onStart }) => {
  const { t, i18n } = useTranslation()

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
      </div>
    </div>
  )
}
