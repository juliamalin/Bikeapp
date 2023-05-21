import React from "react"
import { useState, useEffect } from 'react'
import journeyService from '../services/journeygetters'


const ShowJourneys = ({journeys}) => {
   /*console.log(journeys)
    if (!journeys) {
      return null
    }*/
  
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
    const [searchTextDeparture, setSearchTextDeparture] = React.useState('')
    const [searchTextReturn, setSearchTextReturn] = React.useState('')
    const [durationRange, setDurationRange] = React.useState('all')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
      const fetchJourneys = async (page) => {
        try {
          const response = await journeyService.getAll(page);
          const { items, totalPages, currentPage } = response;
          setJourneys(items);
          setTotalPages(totalPages);
          setCurrentPage(currentPage);
        } catch (error) {
          console.error('Error fetching journeys:', error);
        }
      };
    
      fetchJourneys(currentPage);
    }, [currentPage]);

    console.log(allJourneys)


    //filteröi matkat tekstihaun perusteella
    let filteredJourneys = [...allJourneys];

    if (searchTextDeparture) {
      const lowercaseSearchText = searchTextDeparture.toLowerCase()
      filteredJourneys = filteredJourneys.filter(journey => {
        const departureStationName = journey["Departure station name"].toLowerCase()
        return departureStationName.includes(lowercaseSearchText);
      });
    }

    if (searchTextReturn) {
      const lowercaseSearchText = searchTextReturn.toLowerCase()
      filteredJourneys = filteredJourneys.filter(journey => {
        const returnStationName = journey["Return station name"].toLowerCase()
        return returnStationName.includes(lowercaseSearchText);
      });
    }

    //filteröi matkan keston mukaan

    if (durationRange === 'short') 
      filteredJourneys = filteredJourneys.filter(journey => {
      const journeyDuration = journey["Duration (sec"][")"]
      const durationMinutes = Math.floor(journeyDuration / 60)
      console.log(filteredJourneys)
      return durationMinutes <= 5
    })
    
    if (durationRange === 'medium') 
      filteredJourneys = filteredJourneys.filter(journey => {
      const journeyDuration = journey["Duration (sec"][")"]
      const durationMinutes = Math.floor(journeyDuration / 60)
      console.log(filteredJourneys)
      return durationMinutes > 5 && durationMinutes <= 10
    })

    if (durationRange === 'long') 
    filteredJourneys = filteredJourneys.filter(journey => {
    const journeyDuration = journey["Duration (sec"][")"]
    const durationMinutes = Math.floor(journeyDuration / 60)
    console.log(filteredJourneys)
    return durationMinutes > 10
  })



  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => {
      if (prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };
  
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };


    return(
    <div>
        <h2>Kaikki matkat</h2>
        <input placeholder="Hae lähtöasema" onChange={ev => setSearchTextDeparture(ev.target.value)}></input>
        <input placeholder="Hae saapumisasema" onChange={ev => setSearchTextReturn(ev.target.value)}></input>
        <select className="" aria-label="Default select example" onChange={ev => setDurationRange(ev.target.value)}>
                        <option value="all">Kaikki</option>
                        <option value="short">0-5 min</option>
                        <option value="medium">5-10 min</option>
                        <option value="long">+10 min</option>
                    </select>
        <ShowJourneys journeys = {filteredJourneys} />
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