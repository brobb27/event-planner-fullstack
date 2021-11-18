import React, { useState } from 'react'

const EventContext = React.createContext()

function EventContextProvider({children}) {
    // state handler for event list
    const [eventList, setEventList] = useState([])

    // sorts event list after request
    function sortEvents(list) {
        list.sort((a, b) => a.startTime.replace(':', '') - b.startTime.replace(':', ''))
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
        <EventContext.Provider value={{eventList, setEventList, sortEvents, convertTime, duration}}>
            {children}
        </EventContext.Provider>
    )
}

export {EventContext, EventContextProvider}

// refactored code

// no longer want to sort by name
// list.sort((a, b) => (a.title.toUpperCase() > b.title.toUpperCase()) ? 1 : ((b.title.toUpperCase() > a.title.toUpperCase()) ? -1 : 0))