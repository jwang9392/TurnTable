import React from 'react';
import Modal from './modal/modal';
import GreetingContainer from './greeting/greeting_container';
import Home from './home/home';
import VenueShowContainer from './venue/venue_show_container';
import SearchIndexContainer from './search/search_index_container';
import ReservationFormContainer from './reservations/reservation_form_container';
import {
  Route,
  Switch
} from 'react-router-dom';


const App = () => (
  <div className='app-body'>
    <Modal />
    <header className="header">
      <span>
        <div className="logo-image"/>
        <div className="logo-text">
          <h3>TurnTable</h3>
          <p>by <span>Jason Wang</span></p>
        </div>
      </span>
      <GreetingContainer />
    </header>

    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/venues/:id" component={VenueShowContainer} />
      <Route path="/search/:searchParams" component={SearchIndexContainer} />
      <Route path="/api/venues/:venue_id/reservations" component={ReservationFormContainer} />
    </Switch>

  </div>
);

export default App;