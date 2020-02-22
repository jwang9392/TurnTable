import React from 'react';
import Modal from './modal/modal';
import GreetingContainer from './greeting/greeting_container';
import Footer from './greeting/footer'
import Home from './home/home';
import VenueShowContainer from './venue/venue_show_container';
import SearchIndexContainer from './search/search_index_container';
import ReservationFormContainer from './reservations/reservation_form_container';
import ReservationShowContainer from './reservations/reservation_show_container';
import {
  Route,
  Switch
} from 'react-router-dom';
import ReservationShow from './reservations/reservation_show';


const App = () => (
  <div className='app-body'>
    <Modal />
    <header className="header">
      <GreetingContainer />
    </header>

    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/venues/:id" component={VenueShowContainer} />
      <Route path="/search/:searchParams" component={SearchIndexContainer} />
      <Route path="/venues/:venue_id/reservations" component={ReservationFormContainer} />
      <Route path="/reservations/:id" component={ReservationShowContainer} />
    </Switch>

    <footer>
      <Footer />
    </footer>
  </div>
);

export default App;