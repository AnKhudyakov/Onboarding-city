import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SelectionState = {
  selectedBuildingId: string | null
}

const initialState: SelectionState = { selectedBuildingId: null }

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    selectBuilding(state, action: PayloadAction<string | null>) {
      state.selectedBuildingId = action.payload
    },
    clearSelection(state) {
      state.selectedBuildingId = null
    },
  },
})

export default selectionSlice.reducer
export const { selectBuilding, clearSelection } = selectionSlice.actions
