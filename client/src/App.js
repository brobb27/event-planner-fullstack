import React from 'react'
import {Route, Routes} from 'react-router-dom'
import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import EventDetailPage from './components/eventDetailed/EventDetailPage';

function App() {
  return (
    <div id="webPage">
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/event/:eventId' element={<EventDetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
