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
      return action.payload;
    },
    setCurrentPage(state, action) {
        state.currentPage = action.payload;
    }
  }

}
)

export const { setJourneys, setCurrentPage } = journeySlice.actions;

export const initializeJourneys = (currentpage) => {
    return async dispatch => {
      const journeys = await journeyService.getAllJourneys(currentpage)
      dispatch(setJourneys(journeys))
      console.log(journeys)
    }
  }

export default journeySlice.reducer
