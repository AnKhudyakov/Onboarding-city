import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import { CityCanvas } from '@/features/city/CityCanvas'
import { Header } from '@/features/header/Header'
import { QuestsPanel } from '@/features/quests/QuestsPanel'
import { ScenarioPanel } from '@/features/scenario/ScenarioPanel'
import { SplashScreen } from '@/features/splash/SplashScreen'
import { loadAssets } from '@/shared/lib/pixi/loadAssets'

import '@/shared/styles/index.scss'
import styles from './App.module.scss'

const App: React.FC = () => {
  const { t } = useTranslation()
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [started, setStarted] = useState(false)
  const buildings = useSelector((s: RootState) => s.city.buildings)

  useEffect(() => {
    loadAssets(setProgress).then(() => {
      setProgress(1)
      setReady(true)
    })
  }, [])

  if (!started) {
    return (
      <div className={styles.app}>
        <SplashScreen progress={progress} ready={ready} onStart={() => setStarted(true)} />
      </div>
    )
  }

  return (
    <div className={styles.app} aria-label={t('app.title')}>
      <CityCanvas buildings={buildings} />

      <div className={styles.hud}>
        <Header />

        <div className={styles.column}>
          <QuestsPanel />
          <ScenarioPanel />
        </div>
      </div>
    </div>
  )
}

export default App
