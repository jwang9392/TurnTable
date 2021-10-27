import { connect } from 'react-redux';
import VenueShow from './venue_show';

const mapStateToProps = (state, { match, location}) => {
  console.log(location , 1232131313)
  const venueId = match.params.id
  const venue = state.entities.venues[venueId]

  return {
    venueId,
    venue, 
    date: location.state.date,
    time: location.state.time,
    partySize: location.state.partySize,
    timesBooked: location.state.timesBooked
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchVenue: venueId => dispatch(fetchVenue(venueId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueShow);