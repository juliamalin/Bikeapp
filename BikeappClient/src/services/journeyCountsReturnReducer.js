import { createSlice } from '@reduxjs/toolkit'
import journeyService from './journeygetters'

const initialState = {
    countsReturn: [],
    loading: false,
    error: null,
}

const journeyCountsReturnSlice = createSlice({
    name: 'journeyCountsReturn',
    initialState,
    reducers: {
        setCountsReturn(state, action) {
            state.countsReturn = action.payload
        },
    },
})

export const { setCountsReturn } = journeyCountsReturnSlice.actions

export const initializeJourneyReturnCounts = () => {
    return async dispatch => {
        const journeyReturnCounts = await journeyService.getJourneyCountsReturnStation()
        dispatch(setCountsReturn(journeyReturnCounts))
    }
}

export default journeyCountsReturnSlice.reducer