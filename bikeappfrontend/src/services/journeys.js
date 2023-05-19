import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/journeys'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const getStations= () => {
    const request = axios.get('http://localhost:3001/api/journeys')
    return request.then(response => response.data)
}
const journeyService = {
    getAll: getAll,
    getStations: getStations
  };
  
export default journeyService;