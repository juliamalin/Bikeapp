import { createSlice } from '@reduxjs/toolkit'
import journeyService from './journeygetters'

const initialState = {
    allJourneysStations: [],
    totalPages: 0,
    currentPage: 0,
    loading: false,
    error: null,
}

const journeysStationsSlice = createSlice({
    name: 'allJourneysStations',
    initialState,
    reducers: {
        setJourneysStations(state, action) {
            return {
                ...action.payload,
                loading:false
            }},
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        }
    }

}
)

console.log(initialState.allJourneysStations)
export const { setJourneysStations, setCurrentPage, setLoading, setError } = journeysStationsSlice.actions

export const initializeJourneysStations = (currentPage) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const journeys = await journeyService.getJourneysStations(currentPage)
            dispatch(setJourneysStations(journeys))
        } catch (error) {
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }
}

export default journeysStationsSlice.reducer