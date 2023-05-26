// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'
import { Journeys } from './journeys'
import { Stations } from './stations'
import { JourneyForm } from './addJourney'
import { Link } from 'react-router-dom'
import './content.css'

export function Navbar() {
    return <nav className="navbar">
        <h1 className='header'>HSL BIKEAPP</h1>
        <div>
            <Link id='nav-btn-journeys' to="/journeys" className='navbar__button'>Matkat</Link>
            <Link id='nav-btn-stations' to="/station" className='navbar__button'>Asemat</Link>
            <Link id='nav-btn-journeysform' to="/journeyform" className='navbar__button'>Lisää matka</Link>
        </div>
    </nav>
}

export function Main() {

    return <main>
        <h1>Helsinki city bike app (Dev Academyn ennakkotehtävä)</h1>
        <h3>Myös yläreunasta löytyy valikko jonka kautta pääsee matka- ja asemalistauksiin</h3>
        <p>
            <Link to="/journeys" className="link">Matkat</Link>
            <br />
            <Link to="/station" className="link">Asemat</Link>
            <br />
            <Link to="/journeyform" className='link'>Lisää matka</Link>
        </p>
        <Routes>
            <Route path="/" element={null} />
            <Route path="/journeys" element={<Journeys />} />
            <Route path="/station" element={<Stations />} />
            <Route path="/journeyform" element={<JourneyForm />} />
        </Routes>
    </main>
}


export default Navbar()