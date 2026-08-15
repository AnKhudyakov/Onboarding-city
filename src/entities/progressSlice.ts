import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const XP_PER_LEVEL = 500
export const ENERGY_MAX = 60
export const ENERGY_REGEN_SECONDS = 30

const TRAVEL_COST = 1
const XP_FIRST_VISIT = 120
const XP_REVISIT = 30
const COINS_FIRST_VISIT = 250
const COINS_REVISIT = 60

type ProgressState = {
  visited: string[]
  trips: number
  xp: number
  coins: number
  energy: number
  secondsToEnergy: number
}

const initialState: ProgressState = {
  visited: [],
  trips: 0,
  xp: 0,
  coins: 1250,
  energy: 48,
  secondsToEnergy: ENERGY_REGEN_SECONDS,
}

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    departed(state) {
      state.trips += 1
      state.energy = Math.max(0, state.energy - TRAVEL_COST)
    },
    arrived(state, action: PayloadAction<string>) {
      const first = !state.visited.includes(action.payload)

      if (first) state.visited.push(action.payload)

      state.xp += first ? XP_FIRST_VISIT : XP_REVISIT
      state.coins += first ? COINS_FIRST_VISIT : COINS_REVISIT
    },
    energyTick(state) {
      if (state.energy >= ENERGY_MAX) {
        state.secondsToEnergy = ENERGY_REGEN_SECONDS
        return
      }

      state.secondsToEnergy -= 1

      if (state.secondsToEnergy <= 0) {
        state.energy += 1
        state.secondsToEnergy = ENERGY_REGEN_SECONDS
      }
    },
    resetProgress: () => initialState,
  },
})

export const levelFromXp = (xp: number) => Math.floor(xp / XP_PER_LEVEL) + 1
export const xpIntoLevel = (xp: number) => xp % XP_PER_LEVEL

export default progressSlice.reducer
export const { departed, arrived, energyTick, resetProgress } = progressSlice.actions
