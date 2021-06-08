import * as ApiUtil from '../util/venue_api_util';

export const RECEIVE_VENUES = "RECEIVE_VENUES";
export const RECEIVE_VENUE = "RECEIVE_VENUE";
export const RECEIVE_VENUE_SEARCH = 'RECEIVE_VENUE_SEARCH';
export const RECEIVE_VENUE_ERRORS = 'RECEIVE_VENUE_ERRORS';

const receiveVenues = venues => ({
  type: RECEIVE_VENUES,
  venues
})

const receiveVenue = venue => ({
  type: RECEIVE_RESTAURANT,
  venue
})

const receiveVenueErrors = errors => ({
  type: RECEIVE_VENUE_ERRORS,
  errors
});

const receiveVenueSearch = venues => ({
  type: RECEIVE_VENUE_SEARCH,
  venues
})

export const fetchVenues = filters => dispatch => (
  ApiUtil.fetchVenues(filters).then(
    venues => dispatch(receiveVenues(venues)),
    err => (dispatch(receiveVenueErrors(err.responseJSON)))
  )
)

export const fetchVenue = venueId => dispatch => (
  ApiUtil.fetchVenue(venueId).then(
    venue => dispatch(receiveVenue(venue)),
    err => (dispatch(receiveVenueErrors(err.responseJSON)))
  )
);

export const searchVenues = searchParams => dispatch => (
  ApiUtil.searchVenues(searchParams).then(
    venues => dispatch(receiveVenueSearch(venues))
    // err => (dispatch(receiveVenueErrors(err.responseJSON)))
  )
);
