import { RECEIVE_VENUES, RECEIVE_VENUE } from '../actions/venue_actions';

const venuesReducer = (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_VENUES:
      return action.venues;
    case RECEIVE_VENUE:
      const newVenue = { [action.venue.id]: action.venue };
      return Object.assign({}, newVenue);
    default:
      return state;
  }
};

export default venuesReducer;