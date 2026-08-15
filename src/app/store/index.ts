import { configureStore } from '@reduxjs/toolkit'

import cityReducer from '@/entities/citySlice'
import progressReducer from '@/entities/progressSlice'
import scenarioReducer from '@/entities/scenarioSlice'
import selectionReducer from '@/entities/selectionSlice'

export const store = configureStore({
  reducer: {
    city: cityReducer,
    progress: progressReducer,
    scenario: scenarioReducer,
    selection: selectionReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
