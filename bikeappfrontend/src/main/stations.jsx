import React from "react";
import { useState, useEffect } from 'react'
import journeyService from '../services/journeygetters'
import DraggableDialog from './viewstation'
import './content.css';


export const Stations = () => {
  const [departureStations, setDepartureStations] = useState([]);
  const [returnStations, setReturnStations] = useState([]);
  const [stationData, setStationData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [loading, setLoading] = useState(true);



  console.log(stationData)


  useEffect(() => {
    journeyService
      .getStations()
      .then((stationData) => {
        setDepartureStations(stationData.uniqueDepartureStations);
        setReturnStations(stationData.uniqueReturnStations);
        console.log(stationData);
      })
      .catch((error) => {
        console.error('Error fetching stations:', error);
      });

    journeyService
      .getStationinfo()
      .then((stationInformation) => {
        setStationData(stationInformation)
        setLoading(false)
        console.log(stationInformation);
      })
      .catch((error) => {
        console.error('Error fetching station data:', error);
      });
  }, []);


  if (loading) {
    return <div>Loading...</div>
  }

  if (!departureStations && !returnStations) {
    return null;
  }

  const mergedSet = new Set([...departureStations, ...returnStations]);

  return (
    <div>
      <h2>Kaikki asemat</h2>
      <h4>Klikkamalla asemaa saat näkyville tarkemmat tiedot</h4>
      {Array.from(mergedSet).map((station) => (
        <article 
        key={station} 
        className="station-excerpt" 
        onClick={() => { 
          if (!open){
            setOpen(true) 
            setSelectedStation(station)
          }
          }}>
          {station}
          {open && (
            <DraggableDialog station={selectedStation} open={open} setOpen={setOpen} stationInfo={stationData} />
          )}
        </article>
      ))}
    </div> 
  );
}

//siirrä stationinfon haku