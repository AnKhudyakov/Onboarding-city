import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TourState = {
  selectedBuildingId: string | null
}

const initialState: TourState = { selectedBuildingId: null }

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    selectBuilding(state, action: PayloadAction<string | null>) {
      state.selectedBuildingId = action.payload
    },
    reset(state) {
      state.selectedBuildingId = null
    },
  },
})

export default tourSlice.reducer
export const { selectBuilding, reset } = tourSlice.actions
