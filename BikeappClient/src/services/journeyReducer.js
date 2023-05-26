import { createSlice } from '@reduxjs/toolkit'
import journeyService from './journeygetters'

const initialState = {
    items: [],
    totalPages: 0,
    currentPage: 0,
    uniqueDepartureStations: [],
    uniqueReturnStations: [],
    loading: false,
    error: null,
}

const journeySlice = createSlice({
    name: 'journeys',
    initialState,
    reducers: {
        setJourneys(state, action) {
            return {
                ...action.payload,
                loading: false
            }},
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        appendJourney(state, action) {
            state.items.push(action.payload)
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        }
    },
})

export const {
    setJourneys,
    setCurrentPage,
    appendJourney,
    setLoading,
    setError,
} = journeySlice.actions

export const initializeJourneys = (currentPage) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const journeys = await journeyService.getAllJourneys(currentPage)

            dispatch(setJourneys(journeys))
        } catch (error) {
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }
}

export default journeySlice.reducer
