import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <div id='navbar'>
            <Link to='/'><h1>VisionIngen</h1></Link>
            <h4>The best events start here</h4>
        </div>
    )
}

export default Navbar