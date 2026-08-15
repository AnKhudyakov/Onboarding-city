import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import { CityCanvas } from '@/features/city/CityCanvas'
import { Header } from '@/features/header/Header'
import { QuestsPanel } from '@/features/quests/QuestsPanel'
import TourPanel from '@/features/tour/TourPanel'
import { loadAssets } from '@/shared/lib/pixi/loadAssets'

import '@/shared/styles/index.scss'
import styles from './App.module.scss'

const App: React.FC = () => {
  const { t } = useTranslation()
  const [ready, setReady] = useState(false)
  const buildings = useSelector((s: RootState) => s.city.buildings)

  useEffect(() => {
    loadAssets().then(() => setReady(true))
  }, [])

  if (!ready) {
    return (
      <div className={styles.app}>
        <div className={styles.loading}>{t('app.loading')}</div>
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <CityCanvas buildings={buildings} />

      <div className={styles.hud}>
        <Header />

        <div className={styles.column}>
          <QuestsPanel />
          <TourPanel />
        </div>
      </div>
    </div>
  )
}

export default App
