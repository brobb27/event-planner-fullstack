import React, { useContext } from 'react'
import {EventContext} from '../eventContext'
import { Link } from 'react-router-dom'
import './Preview.css'
import {BiTime} from 'react-icons/bi'
import {GrLocation} from 'react-icons/gr'

function PreviewComp({session}) {
    // import functions for time
    const {duration, convertTime} = useContext(EventContext)

    // destructuring
    const {startTime, endTime, title, location, sponsor, sponsorColor, _id} = session

    return (
        <div className='previewComp'>
            <p className='time'><BiTime /><span> {convertTime(startTime)} - {convertTime(endTime)}</span> ({duration(startTime, endTime)} hours)</p>
            <Link to={`/details/${_id}`} className='title'><h2 className='title'>{title}</h2></Link>
            <p><GrLocation /> {location}</p>
            <p>Presented By:</p>
            <p style={{border: `solid .3rem ${sponsorColor}`}} className='sponsor'>{sponsor}</p>
        </div>
    )
}

export default PreviewComp