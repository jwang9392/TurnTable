import { RECEIVE_VENUE_ERRORS, RECEIVE_VENUE } from '../actions/venue_actions';

const venueErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VENUE_ERRORS:
      return action.errors;
    case RECEIVE_VENUE:
      return [];
    default:
      return state;
  }
} 

export default venueErrorsReducer;