import React from 'react';
import Modal from './modal/modal';
import Navbar from './navbar/navbar_container';
import Footer from './footer/footer';
import HomeContainer from './home/home_container';
import UserProfileContainer from './user_profile/user_profile_container';
import VenueShowContainer from './venue/venue_show_container';
import SearchIndexContainer from './search/search_index_container';
import ReservationFormContainer from './reservations/reservation_form_container';
import ReservationShowContainer from './reservations/reservation_show_container';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_utils';


const App = () => (
  <div className='app-body'>
    <Navbar />
    <Modal />

    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <ProtectedRoute exact path="/my/Profile" component={UserProfileContainer} />
      <Route exact path="/venues/:id" component={VenueShowContainer} />
      <Route path="/search/:searchParams" component={SearchIndexContainer} />
      <Route path="/venues/:venue_id/reservations" component={ReservationFormContainer} />
      <Route path="/reservations/:id" component={ReservationShowContainer} />
    </Switch>

    <Footer />
  </div>
);

export default App;