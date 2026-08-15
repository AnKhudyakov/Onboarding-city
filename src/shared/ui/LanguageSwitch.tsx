import React from 'react'
import { useTranslation } from 'react-i18next'

import { LANGUAGES, setLanguage } from '@/shared/i18n'

import { FlagEn, FlagRu } from './flags'
import styles from './LanguageSwitch.module.scss'

const FLAGS = { en: FlagEn, ru: FlagRu }

export const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation()

  return (
    <div className={styles.switch}>
      {LANGUAGES.map((language) => {
        const Flag = FLAGS[language.code]
        const active = i18n.language === language.code

        return (
          <button
            key={language.code}
            type="button"
            className={active ? styles.optionActive : styles.option}
            aria-pressed={active}
            aria-label={language.label}
            onClick={() => setLanguage(language.code)}
          >
            <Flag className={styles.flag} />
            <span className={styles.code}>{language.short}</span>
          </button>
        )
      })}
    </div>
  )
}
