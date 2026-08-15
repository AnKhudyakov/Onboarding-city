import { configureStore } from '@reduxjs/toolkit'

import cityReducer from '@/entities/citySlice'
import progressReducer from '@/entities/progressSlice'
import tourReducer from '@/entities/tourSlice'

export const store = configureStore({
  reducer: {
    city: cityReducer,
    progress: progressReducer,
    tour: tourReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
