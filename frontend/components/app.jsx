import React from 'react';
import Modal from './modal/modal';
import GreetingContainer from './greeting/greeting_container'
import VenueShowContainer from './venue/venue_show_container'
import {
  Route,
  Switch
} from 'react-router-dom';


const App = () => (
  <div className='app-body'>
    <Modal />
    <header>
      <h1>TurnTable</h1>
      <GreetingContainer />
    </header>
    <div className='changetosearch'>
      <p>Where will you be tonight?</p>
    </div>

    <Switch>
      <Route path="/venues/:id" component={VenueShowContainer} />
    </Switch>

  </div>
);

export default App;