import { configureStore } from '@reduxjs/toolkit'

import cityReducer from '@/entities/citySlice'
import interiorReducer from '@/entities/interiorSlice'
import progressReducer from '@/entities/progressSlice'
import scenarioReducer from '@/entities/scenarioSlice'
import selectionReducer from '@/entities/selectionSlice'

export const store = configureStore({
  reducer: {
    city: cityReducer,
    interior: interiorReducer,
    progress: progressReducer,
    scenario: scenarioReducer,
    selection: selectionReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
