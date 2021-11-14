import React, { useState, useContext } from 'react'
import './Form.css'
import axios from 'axios'
import { EventContext } from '../eventContext'

function Form(props) {
    // context to set event list after post/put request
    const { setEventList, sortEvents } = useContext(EventContext)

    // init values for inputs to handle updated form
    const initValues = {
        name: props.name || '',
        description: props.description || '',
        company: props.company || '',
        color: props.color || 'black',
    }

    // web safe named colors
    const namedColors = ['black', 'blue', 'lime', 'cyan', 'aqua', 'red', 'magenta', 'yellow', 'maroon', 'purple', 'green', 'olive', 'teal', 'pink', 'orange']
    const options = namedColors.map(color => <option key={color} value={color}>{color}</option>)

    // state handler for user inputs
    const [eventInfo, setEventInfo] = useState(initValues)
    // destructured state for convenience
    const {name, description, company, color} = eventInfo

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
        axios.post(`https://rf-json-server.herokuapp.com/events/`, eventInfo)
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
        axios.put(`https://rf-json-server.herokuapp.com/events/${props.id}`, eventInfo)
            .then(res => {
                // console.log(res.data)
                const updatedEvent = res.data
                setEventList(prevList => {
                    const newList = prevList.map(event => event.id !== props.id ? event : updatedEvent)
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
                    name= 'name'
                    value= {name}
                    placeholder='Event Name'
                    onChange={handleChange}
                    required
                />
                <input 
                    type= 'text'
                    name= 'description'
                    value= {description}
                    placeholder='Event Description'
                    onChange={handleChange}
                    required
                />
                <input 
                    type= 'text'
                    name= 'company'
                    value= {company}
                    placeholder='Company Name'
                    onChange={handleChange}
                    required
                />
                <p>Select Color</p>
                <select 
                    style={{border: `solid ${color} .15rem`}} 
                    name= 'color' value= {color} 
                    onChange={handleChange}
                    data-testid='colorSelector'
                    required 
                >
                    {options}
                </select>
                <button>{props.isEditing === false ? 'Add Event' : 'Update Event'}</button>
            </form>
        </div>
    )
}

export default Form