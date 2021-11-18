import React, { useContext } from 'react'
import {EventContext} from '../../eventContext'
import './Preview.css'
import {BiTime} from 'react-icons/bi'
import {GrLocation} from 'react-icons/gr'

function PreviewComp({session}) {
    // import functions for time
    const {duration, convertTime} = useContext(EventContext)

    // destructuring
    const {startTime, endTime, title, location, sponsor, sponsorColor} = session

    return (
        <div className='previewComp'>
            <p className='time'><BiTime /><span> {convertTime(startTime)} - {convertTime(endTime)}</span> ({duration(startTime, endTime)} hours)</p>
            <h2>{title}</h2>
            <p><GrLocation /> {location}</p>
            <p>Presented By:</p>
            <p style={{border: `solid .35rem ${sponsorColor}`}} className='sponsor'>{sponsor}</p>
        </div>
    )
}

export default PreviewComp