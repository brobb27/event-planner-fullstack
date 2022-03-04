import React, { useContext, useEffect, useState } from 'react'
import { EventContext } from '../eventContext'
import axios from 'axios'
import EventComponent from '../eventComponent/EventComponent'

function EventList() {
    // context values needed for EventList components
    const {eventList, setEventList, sortEvents} = useContext(EventContext)
    const [requestFailed, setRequestStatus] = useState(false)

    // state to control whether or not the even has been selected
    const [checkedList, setChecked] = useState([])

    // get request function for reusability if needed
    function getEventList() {
        axios.get(`/sessionList`)
            .then(res => {
                const eventList = res.data
                sortEvents(eventList)
                setEventList(eventList)
            })
            .catch(err => {
                console.log(err)
                setRequestStatus(true)
            })
    }

    // use effect to retreive list on mount (was an infinite loop, sorry!)
    useEffect(() => {
        getEventList()
        // eslint-disable-next-line
    }, [])

    // Adds or removes events from the checklist
    function handleCheck(e) {
        console.log(checkedList)
        const eventId = e.target.value
        setChecked(prevList => prevList.includes(eventId) ? prevList.filter(item => item !== eventId) : [...prevList, eventId])
    }

    // // Delete promise
    // function deletePromise(id) {
    //     return new Promise((resolve, reject) => {
    //         axios.delete(`sessionList/${item}`)
    //             .then(res => {
    //                 console.log(res)
    //                 setEventList(prevList => prevList.filter(event => event.id !== id))
    //                 resolve(id)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     })
    // }

    // // Handle delete selected
    // async function handleDelteSelected() {
    //     for await (const item of checkedList) {
    //         await deletePromise(item)
    //     }
    //     getEventList()
    //     setChecked([])
    // }

    // OR
    
    // Handle delete selected
    async function handleDelteSelected() {
        for await (const item of checkedList) {
            await axios.delete(`sessionList/${item}`)
            .then(res => {
                console.log(res)
                setEventList(prevList => prevList.filter(event => event._id !== item))
            })
            .catch(err => {
                console.log(err)
            })
        }
        getEventList()
        setChecked([])
    }

    // map through eventList and create new event component for each one
    const eventComponents = eventList.map(info => <EventComponent key={info._id} session={info} handleCheck={handleCheck}/>)

    return (
        <div id='eventListContainer'>
            {requestFailed === false ?
            <>
            {eventComponents}
            <button onClick={handleDelteSelected} id='deleteSelected'>Delete Selected Sessions</button>
            </> :
            <h1>Sorry, It looks like we are having trouble retrieving your event list. Please refresh the page. If the issue persists please reach out to our support team.</h1>
            }
        </div>
    )
}

export default EventList