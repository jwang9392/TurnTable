import React from 'react';
import Modal from './modal/modal';
import Navbar from './navbar/navbar_container';
import Footer from './footer/footer';
import HomeContainer from './home/home_container';
import UserProfileContainer from './user_profile/user_profile_container';
import ReviewFormContainer from './review/review_form_container';
import VenueShowContainer from './venue/venue_show_container';
import SearchIndexContainer from './search/search_index_container';
import ReservationFormContainer from './reservations/reservation_form_container';
import ReservationShowContainer from './reservations/reservation_show_container';
import ReservationUpdateContainer from './reservations/reservation_update_container';
import ReservationCancel from './reservations/reservation_cancel';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../util/route_utils';


const App = () => (
  <div className='app-body'>
    <Navbar />
    <Modal />

    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <ProtectedRoute exact path="/my/Profile" component={UserProfileContainer} />
      <ProtectedRoute path="/feedback/:venue_id" component={ReviewFormContainer}/> 
      <Route exact path="/venues/:id" component={VenueShowContainer} />
      <Route path="/search/:searchParams" component={SearchIndexContainer} />
      <Route path="/venues/:venue_id/reservations" component={ReservationFormContainer} />
      <ProtectedRoute exact path="/reservations/:id" component={ReservationShowContainer} />
      <ProtectedRoute path="/reservations/modify/:id" component={ReservationUpdateContainer} />
      <ProtectedRoute path="/reservations/cancel/:id" component={ReservationCancel} />
    </Switch>

    <Footer />
  </div>
);

export default App;