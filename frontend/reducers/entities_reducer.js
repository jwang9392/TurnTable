import { combineReducers } from 'redux';

import users from './users_reducer';
import venues from './venues_reducer';
import reservations from './reservations_reducer';
import reviews from './reviews_reducer';

export default combineReducers({
  users,
  venues,
  reservations, 
  reviews
});
