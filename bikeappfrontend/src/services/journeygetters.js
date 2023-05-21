import axios from 'axios'

const getAll = () => {
  const request = axios.get('http://localhost:3001/api/journeys')
  return request.then(response => response.data)
}

const getStationinfo= () => {
  const request = axios.get('http://localhost:3001/api/stations')
  return request.then(response => response.data)
}

const getJourneyCountsDepartureStation = () => {
  const request = axios.get('http://localhost:3001/api/journeys/count');
  return request.then((response) => response.data.counts);
  };

  const getJourneyCountsReturnStation = () => {
    const request = axios.get('http://localhost:3001/api/journeys/count/returnstation');
    return request.then((response) => response.data.counts);
    };

const journeyService = {
    getAll: getAll,
    getStationinfo: getStationinfo,
    getJourneyCountsDepartureStation : getJourneyCountsDepartureStation,
    getJourneyCountsReturnStation: getJourneyCountsReturnStation
  };


  
export default journeyService;