import { useState, useEffect } from 'react'
import journeyService from './services/journeys'
import './App.css'

const ShowJourneys = ({journeys}) => {
  console.log(journeys)
  if (!journeys.items) {
    return null; // Return null or show a loading indicator while data is being fetched
  }

  const renderHeaders = () => (
    <div className="journey">
      <div><strong>Lähtöasema:</strong></div>
      <div><strong>Saapumisasema:</strong></div>
      <div><strong>Matkan pituus:</strong></div>
      <div><strong>Matkan kesto:</strong></div>
    </div>
  );

  return (
    <div>
    {renderHeaders()}
    {journeys.items.map((journey) => (
      <Journey 
      key={journey.id} 
      departure_name={journey["Departure station name"]}
      return_name={journey["Return station name"]} 
      distance={journey["Covered distance (m)"]}
      duration={journey["Duration (sec"][")"]} 
      />
      ))}
    </div>
    )
  }

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    return `${minutes} min`;
  }

  const formatDistance = (distance) => {
    const kilometers = distance / 1000
    return `${kilometers} km`
  };

  const Journey = ({journeyKey, departure_name, return_name , distance, duration}) => {
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
    );
}

const ShowStations = ({departureStations, returnStations}) => {
  console.log(departureStations)
  console.log(returnStations)
  if (!departureStations && returnStations) {
    return null; // Return null or show a loading indicator while data is being fetched
  }

  const mergedSet = new Set([...departureStations, ...returnStations])
  console.log(mergedSet)

  return(
    <div>
      {Array.from(mergedSet).map((station) => (
        <div key={station}>{station}</div>
      ))}
    </div>
  )
}


const App = () => {
  const [journeys, setJourneys] = useState([])
  const [departureStations, setDepartureStations] = useState([])
  const [returnStations, setReturnStations] = useState([])

  useEffect(()=> {
    journeyService
    .getAll()
    .then(initialJourney => {
      setJourneys(initialJourney)
      console.log(initialJourney)
    })
    .catch(error => {
      console.error('Error fetching journeys:', error)
    })

    journeyService
      .getStations()
      .then((stationData) => {
        setDepartureStations(stationData.uniqueDepartureStations)
        setReturnStations(stationData.uniqueReturnStations)
        console.log(stationData)
      })
      .catch((error) => {
        console.error('Error fetching stations:', error)
      })
    }, [])

  return(
  <div>
      <h1>HSL BikeApp</h1>
      <h2>Kaikki matkat</h2>
      <ShowJourneys journeys = {journeys} />
      <h2>Kaikki asemat</h2>
      <ShowStations departureStations={departureStations} returnStations={returnStations}/>

  </div>
  )
}

export default App;
