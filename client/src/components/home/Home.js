import React, { useState, useEffect } from 'react'
import Form from '../eventForm/Form'
import EventList from '../eventList/EventList'
import PreviewList from '../agendaPreview/PreviewList'
import { Link, Routes, Route } from 'react-router-dom'
import './Home.css'
import Modal from '../modal/Modal'

function Home() {
    // state to determine which route is selected
    const [selected, setSelected] = useState('planner')
    // state handler to for modal
    const [isOpen, setIsOpen] = useState(false)
    // state handler for screen size
    const [isScreenSmall, setIsScreenSmall] = useState(false)

    // functions to change page view
    function agendaSelect() {
        setSelected('agenda')
    }
    function plannerSelect() {
        setSelected('planner')
    }

    // function to toggle the form into a button
    function changeScreenSize() {
        if (window.innerWidth <= 910) {
            setIsScreenSmall(true)
        } else {
            setIsScreenSmall(false)
            setIsOpen(false)
        }
    }
    // use Effect to make sure the right styles are applied
    useEffect(() => {
        changeScreenSize()
    }, [])

    // function to toggle modal
    function toggleModal() {
        setIsOpen(prevState => !prevState)
    }

    // event listener for page size
    window.addEventListener('resize', changeScreenSize)

    return (
        <div className={ isScreenSmall ? 'smallHomeContainer' : 'homeContainer'}>
            {isScreenSmall ? <button className='modalButton' onClick={toggleModal}>+ Add Session</button> 
            :
            <Form isEditing= {false} theClass='mainForm'/>
            }
            <Modal open={isOpen} toggle={toggleModal} >
                <Form isEditing= {false} theClass='modalForm' toggle={toggleModal}/>
            </Modal>
            <div>
                <div className='links'>
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