import React from "react";
import { useState, useEffect } from 'react'
import journeyService from '../services/journeygetters'
import DraggableDialog from './viewstation'
import './content.css';

export const Stations = () => {

    const [departureStations, setDepartureStations] = useState([])
    const [returnStations, setReturnStations] = useState([])

    const [open, setOpen] = React.useState(false)


    useEffect(()=> {

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

    //console.log(departureStations)
    //console.log(returnStations)
    if (!departureStations && returnStations) {
      return null
    }
  
    const mergedSet = new Set([...departureStations, ...returnStations])
    console.log(mergedSet)
  
    return (
        <div>
          <h2>Kaikki asemat</h2>
          <h4>Klikkamalla asemaa saat näkyville tarkemmat tiedot</h4>
          {Array.from(mergedSet).map((station) => (
            <article key={station} className="station-excerpt" onClick={() => { if (!open) setOpen(true) }}>
              {station}
              {open && (
                <DraggableDialog station={station} open={open} setOpen={setOpen} />
              )}
            </article>
          ))}
        </div>
      );
  }
  