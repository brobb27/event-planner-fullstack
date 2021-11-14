import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { EventContextProvider } from './components/eventContext';
import {BrowserRouter as Router} from 'react-router-dom'


ReactDOM.render(
  <Router>
    <EventContextProvider>
      <App />
    </EventContextProvider>
  </Router>
 ,
  document.getElementById('root')
);


