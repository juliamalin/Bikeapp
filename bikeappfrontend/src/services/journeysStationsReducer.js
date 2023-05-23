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
      return action.payload;
    },
    setCurrentPage(state, action) {
        state.currentPage = action.payload;
    }
  }

}
)

console.log(initialState.allJourneysStations);
export const { setJourneysStations, setCurrentPage } = journeysStationsSlice.actions;

export const initializeJourneysStations = (currentpage) => {
    return async dispatch => {
      const journeysStations = await journeyService.getJourneysStations(currentpage)
      dispatch(setJourneysStations(journeysStations))
      console.log(journeysStations)
      console.log(initialState.allJourneysStations)

    }
  }

export default journeysStationsSlice.reducer