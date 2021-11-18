import React, { useState } from 'react'
import Form from '../eventForm/Form'
import EventList from './eventList/EventList'
import PreviewList from './agendaPreview/PreviewList'
import { Link, Routes, Route } from 'react-router-dom'
import './Home.css'

function Home() {
    // state to determine which route is selected
    const [selected, setSelected] = useState('planner')

    function agendaSelect() {
        setSelected('agenda')
    }

    function plannerSelect() {
        setSelected('planner')
    }

    return (
        <div id='homeContainer'>
            <Form isEditing= {false} theClass='mainForm'/>
            <div>
                <div id='links'>
                    <Link to='/' onClick={plannerSelect}><p id={selected === 'planner' ? 'selected' : ''}>Session Planner</p></Link>
                    <Link to='/agenda' onClick={agendaSelect}><p id={selected === 'agenda' ? 'selected' : ''}>Agenda Preview</p></Link>
                </div>
                <Routes>
                    <Route path='/' element={<EventList />} />
                    <Route path='/agenda' element={<PreviewList />} />
                </Routes>
            </div>
        </div>
    )
}

export default Home