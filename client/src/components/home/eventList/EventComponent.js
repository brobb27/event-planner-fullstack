import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { EventContext } from '../../eventContext'
import Form from '../../eventForm/Form'
import './Event.css'

function EventComponent({event, handleCheck}) {
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
        axios.delete(`sessionList/${event._id}`)
        .then(res => {
            // console.log(res)
            setEventList(prevList => prevList.filter(savedEvent => savedEvent.id !== event.id))
            alert(`You have removed ${event.name} from the event line up.`)
        })
        .catch((err) => {
            console.log(err);
            alert(
              "Sorry, we are not able to delete this event at this time. Please try again later. If the issue persists, please reach out to our support team."
            );
        });
    }

    return (
        <div className='componentContainer'>
            {isEditing === false ?
            <>
                <div>
                    <Link style={{color: `${event.color}`}} to={`/event/${event.id}`}><h2>{event.name}</h2></Link>
                    <div className='eventDetails'>
                        <h4>Description</h4>
                        <p>{event.description}</p>
                        <h4>Company</h4>
                        <p>{event.company}</p>
                    </div>
                </div>
                <button onClick={toggleEdit}>Update</button>
                <button onClick={deleteEvent}>Delete</button>
                <input type='checkbox' value={event.id} className='checkbox' onChange={handleCheck}/>
            </>
            :
            <>
                <h2>{event.name}</h2>
                <Form 
                    title= {event.title}
                    description= {event.description}
                    location= {event.location}
                    startTime= {event.startTime}
                    endTime= {event.endTime}
                    sponsor= {event.sponsor}
                    sponsorColor= {event.sponsorColor}
                    id= {event._id}
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