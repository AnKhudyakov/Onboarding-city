import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InteriorState = {
  building: string | null
  line: number
}

const initialState: InteriorState = { building: null, line: 0 }

const interiorSlice = createSlice({
  name: 'interior',
  initialState,
  reducers: {
    enter(state, action: PayloadAction<string>) {
      state.building = action.payload
      state.line = 0
    },
    nextLine(state) {
      state.line += 1
    },
    leave: () => initialState,
  },
})

export default interiorSlice.reducer
export const { enter, nextLine, leave } = interiorSlice.actions
