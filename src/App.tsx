import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import type { RootState } from '@/app/store'
import { CityCanvas } from '@/features/city/CityCanvas'
import TourPanel from '@/features/tour/TourPanel'
import { loadAssets } from '@/shared/lib/pixi/loadAssets'

import '@/shared/styles/index.scss'
import styles from './App.module.scss'

const App: React.FC = () => {
  const [ready, setReady] = useState(false)
  const buildings = useSelector((s: RootState) => s.city.buildings)

  useEffect(() => {
    loadAssets().then(() => setReady(true))
  }, [])

  return (
    <div className={styles.app}>
      <header className={styles.topbar}>
        <span className={styles.brand}>Iso City</span>
        <span className={styles.tagline}>Isometric Pixi demo</span>
      </header>

      {ready ? (
        <main className={styles.layout}>
          <CityCanvas buildings={buildings} />
          <TourPanel />
        </main>
      ) : (
        <div className={styles.loading}>Loading sprites…</div>
      )}
    </div>
  )
}

export default App
