import React from 'react'
import './App.css'
import { Main, Navbar } from './main/content'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeJourneys } from './services/journeyReducer'
import { initializeJourneysStations } from './services/journeysStationsReducer'
import { initializeStations } from './services/stationReducer'
import { initializeJourneyDepartureCounts } from './services/journeyCountsDepartureReducer'
import { initializeJourneyReturnCounts } from './services/journeyCountsReturnReducer'

const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeJourneys())
        dispatch(initializeJourneysStations())
        dispatch(initializeStations())
        dispatch(initializeJourneyDepartureCounts())
        dispatch(initializeJourneyReturnCounts())
    })

    return(
        <div>
            <Navbar />
            <Main />
        </div>
    )
}

export default App
