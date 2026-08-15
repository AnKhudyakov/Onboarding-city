import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ScenarioState = {
  completed: string[]
}

const initialState: ScenarioState = { completed: [] }

const scenarioSlice = createSlice({
  name: 'scenario',
  initialState,
  reducers: {
    completeStep(state, action: PayloadAction<string>) {
      if (!state.completed.includes(action.payload)) state.completed.push(action.payload)
    },
    resetScenario: () => initialState,
  },
})

export default scenarioSlice.reducer
export const { completeStep, resetScenario } = scenarioSlice.actions
