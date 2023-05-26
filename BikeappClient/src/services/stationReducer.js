import { createSlice } from '@reduxjs/toolkit'
import journeyService from './journeygetters'


const initialState = {
    stations: [],
    loading: false,
    error: null,
}

const stationSlice = createSlice({
    name: 'stations',
    initialState,
    reducers: {
        setStations: (state, action) => {
            state.stations = action.payload
        }
    },
})

export const initializeStations = () => {
    return async dispatch => {
        const stations = await journeyService.getStationinfo()
        dispatch(setStations(stations))
    }
}

export const { setStations } = stationSlice.actions
export default stationSlice.reducer