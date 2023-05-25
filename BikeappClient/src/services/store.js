import { configureStore } from '@reduxjs/toolkit'
import journeyReducer from './journeyReducer'
import stationReducer from './stationReducer'
import journeyCountDepartureReducer from './journeyCountsDepartureReducer'
import journeyCountReturnReducer from './journeyCountsReturnReducer'
import journeysStationsReducer from './journeysStationsReducer'




export const store = configureStore({
    reducer: {
        journey: journeyReducer,
        stations: stationReducer,
        countsDeparture: journeyCountDepartureReducer,
        countsReturn: journeyCountReturnReducer,
        allJourneysStations: journeysStationsReducer
    }
})

export default store