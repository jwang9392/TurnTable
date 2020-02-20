import React from 'react';
import Modal from './modal/modal';
import GreetingContainer from './greeting/greeting_container';
import Home from './home/home';
import VenueShowContainer from './venue/venue_show_container';
import SearchIndexContainer from './search/search_index_container';
import CreateReservationFormContainer from './reservations/create_reservation_container_form';
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

    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/venues/:id" component={VenueShowContainer} />
      <Route path="/search/:searchParams" component={SearchIndexContainer} />
      <Route path="/api/venues/:venue_id/reservations" component={CreateReservationFormContainer} />
    </Switch>

  </div>
);

export default App;