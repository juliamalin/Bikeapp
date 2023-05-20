import { useState, useEffect } from 'react'
import journeyService from '../services/journeygetters'



const ShowJourneys = ({journeys}) => {
    console.log(journeys)
    if (!journeys.items) {
      return null
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
  
  export const Journeys = () => {
    const [journeys, setJourneys] = useState([])
  
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
      }, [])
  
    return(
    <div>
        <h2>Kaikki matkat</h2>
        <ShowJourneys journeys = {journeys} />  
    </div>
    )
  }