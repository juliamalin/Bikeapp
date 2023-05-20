import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Journeys } from './journeys';
import { Stations } from './stations';
import { Link } from 'react-router-dom'
import './content.css';

export function Navbar() {
    return <nav className="navbar">
    <h1 className='header'>HSL BIKEAPP</h1>
    <div>
        <Link id='nav-btn-journeys' to="/journeys" className='navbar__button'>Matkat</Link>
        <Link id='nav-btn-journeys' to="/station" className='navbar__button'>Asemat</Link>
    </div>
    </nav>
}

export function Main() {
  
    return <main>
      <Routes>
        <Route path="/journeys" element={<Journeys />} />
        <Route path="/station" element={<Stations />} />
      </Routes>
    </main>
  }


  export default Navbar();