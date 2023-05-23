
import axios from 'axios';

export const getAllJourneys = (page) => {
  const request = axios.get(`http://localhost:3001/api/journeys?page=${page}`);
  return request.then((response) => ({
    items: Object.values(response.data.items),
    totalPages: response.data.totalPages,
    currentPage: response.data.currentPage,
    uniqueDepartureStations: response.data.uniqueDepartureStations,
    uniqueReturnStations: response.data.uniqueReturnStations,
  }));
}

const getJourneysStations = (page) => {
  const request = axios.get(`http://localhost:3001/api/journeys/stations?page=${page}`)
  return request.then((response) => ({
      allJourneysStations: response.data.allJourneysStations,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage
    }));
};

const getStationinfo = () => {
  const request = axios.get('http://localhost:3001/api/stations');
  return request.then((response) => response.data);
};

const getJourneyCountsDepartureStation = () => {
  const request = axios.get('http://localhost:3001/api/journeys/count');
  return request.then((response) => response.data.counts);
};

const getJourneyCountsReturnStation = () => {
  const request = axios.get('http://localhost:3001/api/journeys/count/returnstation');
  return request.then((response) => response.data.counts);
};

const journeyService = {
  getAllJourneys: getAllJourneys,
  getStationinfo: getStationinfo,
  getJourneyCountsDepartureStation: getJourneyCountsDepartureStation,
  getJourneyCountsReturnStation: getJourneyCountsReturnStation,
  getJourneysStations: getJourneysStations
};

export default journeyService;
