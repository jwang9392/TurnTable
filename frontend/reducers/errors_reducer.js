
import { combineReducers } from 'redux';

import session from './session_errors_reducer';
import venue from './venue_errors_reducer';
import reservation from './reservation_errors_reducer';
import review from './review_errors_reducer';

const errorsReducer = combineReducers({
  session,
  venue,
  reservation,
  review
});

export default errorsReducer;