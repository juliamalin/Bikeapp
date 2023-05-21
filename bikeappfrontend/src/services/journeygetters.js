import axios from 'axios'

const getAll = () => {
  const request = axios.get('http://localhost:3001/api/journeys')
  return request.then(response => response.data)
}


const getStations= () => {
    const request = axios.get('http://localhost:3001/api/journeys')
    return request.then(response => response.data)
}

const getStationinfo= () => {
  const request = axios.get('http://localhost:3001/api/stations')
  return request.then(response => response.data)
}
const journeyService = {
    getAll: getAll,
    getStations: getStations,
    getStationinfo: getStationinfo
  };
  
export default journeyService;