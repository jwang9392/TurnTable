import { connect } from 'react-redux';
import { fetchVenue } from '../../actions/venue_actions';
import VenueShow from './venue_show';

const mapStateToProps = (state, { match, location}) => {
  const venueId = match.params.id
  const venue = state.entities.venues[venueId]
  let storedParams = JSON.parse(localStorage.getItem(`search-params`));

  return {
    venueId,
    venue, 
    date: location.state ? location.state.date : (storedParams ? new Date(storedParams.date) : new Date()),
    time: location.state ? location.state.time : (storedParams ? storedParams.time : "9:00PM"),
    partySize: location.state ? location.state.partySize : (storedParams ? storedParams.partySize : 2)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchVenue: venueId => dispatch(fetchVenue(venueId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueShow);