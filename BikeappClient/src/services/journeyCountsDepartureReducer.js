import { createSlice } from '@reduxjs/toolkit'
import journeyService from './journeygetters'

const initialState = {
    countsDeparture: [],
    loading: false,
    error: null,
}

const journeyCountsDepartureSlice = createSlice({
    name: 'journeyCountsDeparture',
    initialState,
    reducers: {
        setCountsDeparture(state, action) {
            state.countsDeparture = action.payload
        },
    },
})

export const { setCountsDeparture } = journeyCountsDepartureSlice.actions

export const initializeJourneyDepartureCounts = () => {
    return async dispatch => {
        const journeyDepartureCounts = await journeyService.getJourneyCountsDepartureStation()
        dispatch(setCountsDeparture(journeyDepartureCounts))
    }
}

export default journeyCountsDepartureSlice.reducer
