import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { EventContext } from '../../eventContext'
import Form from '../../eventForm/Form'
import './Event.css'

function EventComponent({session, handleCheck}) {
    // import context variabls needed
    const { setEventList } = useContext(EventContext)

    // state to determine if component is being edited
    const [isEditing, setEdit] = useState(false)
    // toggle Edit
    function toggleEdit() {
        setEdit(prevState => !prevState)
    }

    // delete request
    function deleteEvent() {
        axios.delete(`sessionList/${session._id}`)
        .then(res => {
            // console.log(res)
            setEventList(prevList => prevList.filter(savedEvent => savedEvent._id !== session.id))
            alert(`You have removed ${session.title} from the session line up.`)
        })
        .catch((err) => {
            console.log(err);
            alert(
              "Sorry, we are not able to delete this session at this time. Please try again later. If the issue persists, please reach out to our support team."
            );
        });
    }

    // Time converter (from military to standard)
    function convertTime(time) {
    // console.log(time)
    const newStringTime = time.replace(':', '')
    const newTime = Number(newStringTime)
    // console.log(newTime)
    if (newTime < 1300 && newTime >= 1200) {
        const stringTime = newTime.toString()
        const finalTime = stringTime.slice(0, 2) + ':' + stringTime.slice(2) + 'pm'
        return finalTime
    } else if (newTime < 1200 && newTime >= 1000) {
        const stringTime = newTime.toString()
        const finalTime = stringTime.slice(0, 2) + ':' + stringTime.slice(2) + 'am'
        return finalTime
    } else if (newTime >= 1300) {
        const convertTime = newTime - 1200
        const stringTime = convertTime.toString()
        const finalTime = stringTime.length > 3 ? (stringTime.slice(0, 2) + `:` + stringTime.slice(2)) + `pm` : (stringTime.slice(0, 1) + `:` + stringTime.slice(1) + `pm`)
        return finalTime
    } else {
        const finalTime = time.slice(1) + 'am'
        return finalTime
    }
    }

    // Time to number for duration
    function duration(startTime, endTime) {
        const startString = startTime.replace(':', '')
        const endString = endTime.replace(':', '')
        const newStartTime = Number(startString)
        const newEndTime = Number(endString)
        const duration = Math.ceil((newEndTime - newStartTime) / 100)
        return duration
    }

    return (
        <div className='componentContainer'>
            {isEditing === false ?
            <>
                <div>
                    <h4>Session Hours:</h4>
                    <p>{convertTime(session.startTime)} - {convertTime(session.endTime)} <span>({duration(session.startTime, session.endTime)} hours)</span></p>
                    <h4>Session Title:</h4>
                    <Link to={`/details/${session._id}`}><h2>{session.title}</h2></Link>
                    <h4>Session Location:</h4>
                    <p>{session.location}</p>
                    <h4>Sponsor:</h4>
                    <p>{session.sponsor}</p>
                </div>
                <button onClick={toggleEdit}>Update</button>
                <button onClick={deleteEvent}>Delete</button>
                <input type='checkbox' value={session._id} className='checkbox' onChange={handleCheck}/>
            </>
            :
            <>
                <h2>Editing {session.title}</h2>
                <Form 
                    title= {session.title}
                    description= {session.description}
                    location= {session.location}
                    startTime= {session.startTime}
                    endTime= {session.endTime}
                    sponsor= {session.sponsor}
                    sponsorColor= {session.sponsorColor}
                    id= {session._id}
                    isEditing = {isEditing}
                    setEdit = {setEdit}
                    theClass= 'updateForm'
                />
                <button onClick={toggleEdit} className='cancleButton'>Cancel</button>
            </>
            }
        </div>
    )
}

export default EventComponent