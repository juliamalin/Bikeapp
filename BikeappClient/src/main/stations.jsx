import React from 'react'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import ViewStation from './viewstation'
import { initializeStations  } from '../services/stationReducer'
import './content.css'
import { initializeJourneyDepartureCounts } from '../services/journeyCountsDepartureReducer'
import { initializeJourneyReturnCounts } from '../services/journeyCountsReturnReducer'
import { initializeJourneysStations, setCurrentPage } from '../services/journeysStationsReducer'

export const Stations = () => {
    const dispatch = useDispatch()
    const stationData = useSelector(state => state.stations.stations)
    const countDepartureStation = useSelector(state => state.countsDeparture.countsDeparture)
    const countReturnStation = useSelector(state => state.countsReturn.countsReturn)
    const allJourneysStations = useSelector(state => state.allJourneysStations.allJourneysStations)
    const totalPages = useSelector(state => state.allJourneysStations.totalPages)
    const currentPage = useSelector(state => state.allJourneysStations.currentPage)
    const loading = useSelector((state) => state.journey.loading)
    const [searchStation, setStation] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [selectedStation, setSelectedStation] = useState(null)

    useEffect(() => {
        dispatch(initializeStations())
        dispatch(initializeJourneyDepartureCounts())
        dispatch(initializeJourneyReturnCounts())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeJourneysStations(currentPage))
    }, [currentPage, dispatch])

    let filteredStations = allJourneysStations.flat()
    console.log(filteredStations)
    console.log(countReturnStation)

    if (searchStation) {
        const lowercaseSearchStation = searchStation.toLowerCase()
        filteredStations = filteredStations.filter(station => {
            const stationName = station.toLowerCase()
            return stationName.includes(lowercaseSearchStation)
        })
    }

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1))
        }
    }

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            dispatch(setCurrentPage(currentPage + 1))
        }
    }

    return (
        <div>
            <h2>Asemat</h2>
            <input placeholder="Hae asema" onChange={ev => setStation(ev.target.value)}></input>
            <h4>Klikkamalla asemaa saat näkyville tarkemmat tiedot</h4>
            {filteredStations.map((station, index) => (
                <article
                    key={index}
                    className="station-excerpt"
                    onClick={() => {
                        if (!open){
                            setOpen(true)
                            setSelectedStation(station)
                        }
                    }}>
                    {loading ? (
                        <div>Loading...</div>
                    ):(
                        <div>{station}</div>
                    )}
                </article>
            ))}
            {open && (
                <ViewStation
                    station={selectedStation}
                    open={open}
                    setOpen={setOpen}
                    stationInfo={stationData}
                    departureStationCount={countDepartureStation}
                    returnStationCount={countReturnStation}
                />
            )}
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous Page
            </button>
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next Page
            </button>
            <span>Page {currentPage} of {totalPages}</span>
        </div>
    )
}

