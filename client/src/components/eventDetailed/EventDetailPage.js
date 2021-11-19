import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import './EventDetail.css'
import {BiTime} from 'react-icons/bi'
import {GrLocation} from 'react-icons/gr'
import { EventContext } from '../eventContext'

function EventDetailPage() {
    // use params to get id
    const {sessionId} = useParams()

    // context
    const {convertTime, duration} = useContext(EventContext)

    // state handler for get request
    const [sessionInfo, setSessionInfo] = useState()
    // state handler for page loading
    const [isLoading, setLoading] = useState(true)
    const [requestFailed, setRequestStatus] = useState(false)

    // get by id request
    function getEventDetails() {
        axios.get(`/sessionList/${sessionId}`)
            .then(res => {
                console.log(res.data)
                setSessionInfo(res.data)
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
            <h1>Session Details</h1>
            <Link to='/'>Back</Link>
            {isLoading === true ?
            <div>
                {requestFailed === true ? 
                <h1>Sorry, we were unable to retrieve the session details. Please return to the home page and try again.</h1> 
                :
                <h1>Retrieving Event...</h1>
                }
            </div>
            :
            <div id='detailsCon'>
                <div id='detailComp'>
                    <p className='detailTime'><BiTime /><span> {convertTime(sessionInfo.startTime)} - {convertTime(sessionInfo.endTime)}</span> ({duration(sessionInfo.startTime, sessionInfo.endTime)} hours)</p>
                    <h2 className='detailTitle'>{sessionInfo.title}</h2>
                    <p><GrLocation /> {sessionInfo.location}</p>
                </div>
                <div id='detailDescription'>
                    <h3>Description</h3>
                    <p>{sessionInfo.description}</p>
                    <h3>Sponsored by:</h3>
                    <p>{sessionInfo.sponsor}</p>
                </div>
            </div>
            }
        </div>
    )
}

export default EventDetailPage