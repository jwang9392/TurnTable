import { RECEIVE_VENUES, RECEIVE_VENUE, RECEIVE_VENUE_SEARCH } from '../actions/venue_actions';

const venuesReducer = (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_VENUES:
      return action.venues;
    case RECEIVE_VENUE:
      const newVenue = { [action.venue.id]: action.venue };
      return Object.assign({}, newVenue);
    case RECEIVE_VENUE_SEARCH:
      return Object.assign({}, action.venues);
    default:
      return state;
  }
};

export default venuesReducer;