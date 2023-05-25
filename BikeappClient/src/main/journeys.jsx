/* eslint-disable react/prop-types */
import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { initializeJourneys, setCurrentPage } from '../services/journeyReducer'

const ShowJourneys = ({ journeys }) => {
    const renderHeaders = () => (
        <div className="journey">
            <div><strong>Lähtöasema:</strong></div>
            <div><strong>Saapumisasema:</strong></div>
            <div><strong>Matkan pituus:</strong></div>
            <div><strong>Matkan kesto:</strong></div>
        </div>
    )

    return (
        <div>
            {renderHeaders()}
            {journeys.map((journey) => (
                <Journey
                    key={journey.id}
                    departure_name={journey['Departure station name']}
                    return_name={journey['Return station name']}
                    distance={journey['Covered distance (m)']}
                    duration={journey['Duration (sec'] && journey['Duration (sec'][')'] ? journey['Duration (sec'][')'] : journey['Duration']}
                />
            ))}
        </div>
    )
}

const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60)
    return `${minutes} min`
}

const formatDistance = (distance) => {
    const kilometers = distance / 1000
    return `${kilometers} km`
}

const Journey = ({ departure_name, return_name , distance, duration }) => {
    const formattedDuration = formatDuration(duration)
    const formattedDistance = formatDistance(distance)

    return (
        <div className="journey">
            <div>
                {departure_name}
            </div>
            <div>
                {return_name}
            </div>
            <div>
                {formattedDistance}
            </div>
            <div>
                {formattedDuration}
            </div>
        </div>
    )
}

export const Journeys = () => {
    const dispatch = useDispatch()
    const allJourneys = useSelector(state => state.journey.items)
    const totalPages = useSelector(state => state.journey.totalPages)
    const currentPage = useSelector(state => state.journey.currentPage)
    const loading = useSelector((state) => state.journey.loading)
    const [searchTextDeparture, setSearchTextDeparture] = React.useState('')
    const [searchTextReturn, setSearchTextReturn] = React.useState('')
    const [durationRange, setDurationRange] = React.useState('all')


    useEffect(() => {
        dispatch(initializeJourneys(currentPage))
    }, [currentPage, dispatch])

    console.log(allJourneys)
    console.log(totalPages)
    console.log(currentPage)

    let filteredJourneys = [...allJourneys]

    if (searchTextDeparture) {
        const lowercaseSearchText = searchTextDeparture.toLowerCase()
        filteredJourneys = filteredJourneys.filter(journey => {
            const departureStationName = journey['Departure station name'].toLowerCase()
            return departureStationName.includes(lowercaseSearchText)
        })
    }

    if (searchTextReturn) {
        const lowercaseSearchText = searchTextReturn.toLowerCase()
        filteredJourneys = filteredJourneys.filter(journey => {
            const returnStationName = journey['Return station name'].toLowerCase()
            return returnStationName.includes(lowercaseSearchText)
        })
    }


    if (durationRange === 'short')
        filteredJourneys = filteredJourneys.filter(journey => {
            const journeyDuration = journey['Duration (sec'] && journey['Duration (sec'][')'] ? journey['Duration (sec'][')'] : journey['Duration']
            const durationMinutes = Math.floor(journeyDuration / 60)
            console.log(filteredJourneys)
            return durationMinutes <= 5
        })

    if (durationRange === 'medium')
        filteredJourneys = filteredJourneys.filter(journey => {
            const journeyDuration = journey['Duration (sec'] && journey['Duration (sec'][')'] ? journey['Duration (sec'][')'] : journey['Duration']
            const durationMinutes = Math.floor(journeyDuration / 60)
            console.log(filteredJourneys)
            return durationMinutes > 5 && durationMinutes <= 10
        })

    if (durationRange === 'long')
        filteredJourneys = filteredJourneys.filter(journey => {
            const journeyDuration = journey['Duration (sec'] && journey['Duration (sec'][')'] ? journey['Duration (sec'][')'] : journey['Duration']
            const durationMinutes = Math.floor(journeyDuration / 60)
            console.log(filteredJourneys)
            return durationMinutes > 10
        })



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
    return(
        <div>
            <h2>Matkat</h2>
            <input placeholder="Hae lähtöasema" onChange={ev => setSearchTextDeparture(ev.target.value)}></input>
            <input placeholder="Hae saapumisasema" onChange={ev => setSearchTextReturn(ev.target.value)}></input>
            <select className="" aria-label="Default select example" onChange={ev => setDurationRange(ev.target.value)}>
                <option value="all">Kaikki</option>
                <option value="short">0-5 min</option>
                <option value="medium">5-10 min</option>
                <option value="long">+10 min</option>
            </select>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ShowJourneys journeys={filteredJourneys} />
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












