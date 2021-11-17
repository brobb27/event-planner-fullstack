import React, { useState } from 'react'

const EventContext = React.createContext()

function EventContextProvider({children}) {
    // state handler for event list
    const [eventList, setEventList] = useState([])

    // sorts event list after request
    function sortEvents(list) {
        list.sort((a, b) => a.startTime.replace(':', '') - b.startTime.replace(':', ''))
    }

    return (
        <EventContext.Provider value={{eventList, setEventList, sortEvents}}>
            {children}
        </EventContext.Provider>
    )
}

export {EventContext, EventContextProvider}

// refactored code

// no longer want to sort by name
// list.sort((a, b) => (a.title.toUpperCase() > b.title.toUpperCase()) ? 1 : ((b.title.toUpperCase() > a.title.toUpperCase()) ? -1 : 0))