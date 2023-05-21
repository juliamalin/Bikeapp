import React from "react"
import { useState, useEffect } from 'react'
import journeyService from '../services/journeygetters'


const ShowJourneys = ({journeys}) => {
    console.log(journeys)
    if (!journeys) {
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
      {journeys.map((journey) => (
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
    const [allJourneys, setJourneys] = useState([])

    const [sortBy, setSortBy] = React.useState('all')
    const [searchTextDeparture, setSearchTextDeparture] = React.useState('')
    const [searchTextReturn, setSearchTextReturn] = React.useState('')
  
    useEffect(()=> {
      journeyService
      .getAll()
      .then(initialJourney => {
        setJourneys(initialJourney.items)
        console.log(initialJourney)
      })
      .catch(error => {
        console.error('Error fetching journeys:', error)
      })
      }, [])

    console.log(allJourneys)

    //filter journeys based on search results
    let filteredJourneys = [...allJourneys];

    if (searchTextDeparture) {
      const lowercaseSearchText = searchTextDeparture.toLowerCase(); // Convert search text to lowercase
      filteredJourneys = filteredJourneys.filter(journey => {
        const departureStationName = journey["Departure station name"].toLowerCase(); // Convert departure station name to lowercase
        return departureStationName.includes(lowercaseSearchText);
      });
    }

    if (searchTextReturn) {
      const lowercaseSearchText = searchTextReturn.toLowerCase(); // Convert search text to lowercase
      filteredJourneys = filteredJourneys.filter(journey => {
        const returnStationName = journey["Return station name"].toLowerCase(); // Convert departure station name to lowercase
        return returnStationName.includes(lowercaseSearchText);
      });
    }
    



    //const minDistance = 1000;

    //let filteredJourneys = allJourneys&&allJourneys.filter((journey) => journey["Covered distance (m)"] >= minDistance);
    //if (showAll) filteredJourneys = [...allJourneys]


  
    return(
    <div>
        <h2>Kaikki matkat</h2>
        <h3>Palauttaa serveriin parametrina asetetun sivun matkat (40 kpl per sivu)</h3>
        <input placeholder="Hae lähtöasema" onChange={ev => setSearchTextDeparture(ev.target.value)}></input>
        <input placeholder="Hae saapumisasema" onChange={ev => setSearchTextReturn(ev.target.value)}></input>
        <ShowJourneys journeys = {filteredJourneys} />  
    </div>
    )
  }