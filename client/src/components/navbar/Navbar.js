import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <div id='navbar'>
            <Link to='/'><h1>Event Planner</h1></Link>
            <h4>plan your next event below</h4>
        </div>
    )
}

export default Navbar