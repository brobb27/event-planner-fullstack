import React, { useState } from 'react'

const EventContext = React.createContext()

function EventContextProvider({children}) {
    // state handler for event list
    const [eventList, setEventList] = useState([])

    // sorts event list after request
    function sortEvents(list) {
        list.sort((a, b) => (a.sponsor.toUpperCase() > b.sponsor.toUpperCase()) ? 1 : ((b.sponsor.toUpperCase() > a.sponsor.toUpperCase()) ? -1 : 0))
    }

    return (
        <EventContext.Provider value={{eventList, setEventList, sortEvents}}>
            {children}
        </EventContext.Provider>
    )
}

export {EventContext, EventContextProvider}