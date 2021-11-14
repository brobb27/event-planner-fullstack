import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import './EventDetail.css'

function EventDetailPage(props) {
    // use params to get id
    const {eventId} = useParams()

    // state handler for get request
    const [eventInfo, setEventInfo] = useState()
    // state handler for page loading
    const [isLoading, setLoading] = useState(true)
    const [requestFailed, setRequestStatus] = useState(false)

    // get by id request
    function getEventDetails() {
        axios.get(`https://rf-json-server.herokuapp.com/events/${eventId}`)
            .then(res => {
                // console.log(res.data)
                setEventInfo(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setRequestStatus(true)
            })
    }

    // get request on mount
    useEffect(() => {
        getEventDetails()
        // eslint-disable-next-line
    }, [])

    return (
        <div id='eventDetailContainer'>
            {isLoading === true ?
            <div>
                {requestFailed === true ? 
                <h1>Sorry, we were unable to retrieve this event details. Please return to the home page and try again.</h1> 
                :
                <h1>Retrieving Event...</h1>
                }
            </div>
            :
            <div id='detailsCon'>
                <h1>{eventInfo.name}</h1>
                <div>
                    <h3>Description</h3>
                    <p>{eventInfo.description}</p>
                    <h3>Company</h3>
                    <p>{eventInfo.company}</p>
                </div>
            </div>
            }
            <Link to='/'>Return To Home</Link>
        </div>
    )
}

export default EventDetailPage