import React, { useState, useContext } from 'react'
import './Form.css'
import axios from 'axios'
import { EventContext } from '../eventContext'

function Form(props) {
    // context to set event list after post/put request
    const { setEventList, sortEvents } = useContext(EventContext)

    // init values for inputs to handle updated form
    const initValues = {
        title: props.title || '',
        description: props.description || '',
        location: props.location || '',
        startTime: props.startTime || '',
        endTime: props.endTime || '',
        sponsor: props.sponsor || '',
        sponsorColor: props.sponsorColor || '#000000',
    }

    // state handler for user inputs
    const [eventInfo, setEventInfo] = useState(initValues)
    // destructured state for convenience
    const {title, description, location, startTime, endTime, sponsor, sponsorColor} = eventInfo

    // handle change for input boxes
    function handleChange(e) {
        const {name, value} = e.target
        setEventInfo(prevInfo => {
            return {
                ...prevInfo,
                [name]: value
            }
        })
    }

    // handle addEvent
    function addEvent(e) {
        e.preventDefault()
        axios.post(`/sessionList`, eventInfo)
            .then(res => {
                // console.log(res.data)
                const newEvent = res.data
                setEventList(prevList => {
                    const newList = [...prevList, newEvent]
                    sortEvents(newList)
                    return newList
                })
            })
            .catch(err => {
                console.log(err)
                alert(`Sorry, it looks like we were unable to ADD your event. Please try refreshing the page and try again. If the issue persists please reach out to us.`)
            })
        setEventInfo(initValues)
    }

    // handle updateEvent
    function updateEvent(e) {
        e.preventDefault()
        axios.put(`sessionList/${props.id}`, eventInfo)
            .then(res => {
                // console.log(res.data)
                const updatedEvent = res.data
                setEventList(prevList => {
                    const newList = prevList.map(event => event._id !== props.id ? event : updatedEvent)
                    sortEvents(newList)
                    return newList
                })
            })
            .catch(err => {
                console.log(err)
                alert('Sorry, it looks like we were unable to UPDATE your event. Please try refreshing the page and try again. If the issue persists please reach out to us.')
            })
        props.setEdit(false)
    }

    return (
        <div className={props.theClass}>
            <form 
                onSubmit={props.isEditing === false ? addEvent : updateEvent}
            >
                <input 
                    type= 'text'
                    name= 'title'
                    value= {title}
                    placeholder='Session Title'
                    onChange={handleChange}
                    required
                />
                <input 
                    type= 'text'
                    name= 'description'
                    value= {description}
                    placeholder='Session Description'
                    onChange={handleChange}
                    required
                />
                <input 
                    type='text'
                    name='location'
                    value= {location}
                    placeholder= 'Session Location'
                    onChange={handleChange}
                    required
                />
                <p>Start Time</p>
                <input 
                    type='time'
                    name='startTime'
                    value= {startTime}
                    onChange={handleChange}
                    required
                />
                <p>End Time</p>
                <input 
                    type='time'
                    name='endTime'
                    value= {endTime}
                    onChange={handleChange}
                    required
                />
                <input 
                    type= 'text'
                    name= 'sponsor'
                    value= {sponsor}
                    placeholder='Sponsor Name'
                    onChange={handleChange}
                    required
                />
                <p>Select Sponsor Color</p>
                <input 
                    type='color'
                    name='sponsorColor'
                    value={sponsorColor}
                    onChange={handleChange}
                />
                <button>{props.isEditing === false ? 'Add Session' : 'Update Session'}</button>
            </form>
        </div>
    )
}

export default Form


// Refactored code

    // web safe named colors (good option for any select input)
    // const namedColors = ['black', 'blue', 'lime', 'cyan', 'aqua', 'red', 'magenta', 'yellow', 'maroon', 'purple', 'green', 'olive', 'teal', 'pink', 'orange']
    // const options = namedColors.map(color => <option key={color} value={color}>{color}</option>)