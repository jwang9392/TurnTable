
import { combineReducers } from 'redux';

import session from './session_errors_reducer';
import venue from './venue_errors_reducer';
import reservation from './reservation_errors_reducer';

const errorsReducer = combineReducers({
  session,
  venue,
  reservation
});

export default errorsReducer;