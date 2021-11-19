import React, {useContext} from 'react'
import { EventContext } from '../../eventContext'
import PreviewComp from './PreviewComp'
import './Preview.css'

function PreviewList() {
    // context needed for this component
    const {eventList} = useContext(EventContext)

    // state
    // const [requestFailed, setRequestStatus] = useState(false)
    const requestFailed = false



    // map through eventList and create new event component for each one
    const previewComponents = eventList.map(info => <PreviewComp key={info._id} session={info} />)

    return (
        <div id='previewListContainer'>
            {requestFailed === false ?
            <>
            <h1>Agenda</h1>
            {previewComponents}
            </> :
            <h1>Sorry, It looks like we are having trouble retrieving your event list. Please refresh the page. If the issue persists please reach out to our support team.</h1>
            }
        </div>
    )
}

export default PreviewList