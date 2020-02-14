import * as ApiUtil from '../util/restaurant_api_util';

export const RECEIVE_VENUES = "RECEIVE_VENUES";
export const RECEIVE_VENUE = "RECEIVE_VENUE";
export const RECEIVE_VENUE_ERRORS = 'RECEIVE_VENUE_ERRORS';

const receiveVenues = ({ venues }) => ({
  type: RECEIVE_VENUES,
  venues
})

const receiveVenue = () => ({
  type: RECEIVE_RESTAURANT,

})

const receiveVenueErrors = errors => {
  return ({
    type: RECEIVE_VENUE_ERRORS,
    errors
  });
};

export const fetchVenue = id => dispatch => (
  ApiUtil.fetchVenue(id).then(
    venue => dispatch(receiveVenue(venue)),
    err => (dispatch(receiveVenueErrors(err.responseJSON)))
  )
);

export const fetchVenues = searchParams => dispatch => (
  ApiUtil.fetchVenues(searchParams).then(
    venues => dispatch(receiveVenues(venues)),
    err => (dispatch(receiveVenueErrors(err.responseJSON)))
  )
)
