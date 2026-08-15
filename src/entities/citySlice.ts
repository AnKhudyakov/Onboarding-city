import { createSlice } from '@reduxjs/toolkit'

import { BUILDINGS, CityBuilding } from './buildings'

type CityState = {
  buildings: CityBuilding[]
}

const initialState: CityState = { buildings: BUILDINGS }

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {},
})

export default citySlice.reducer
