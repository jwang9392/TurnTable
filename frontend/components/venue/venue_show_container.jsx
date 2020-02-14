import { connect } from 'react-redux';
import VenueShow from './venue_show';

const mapStateToProps = (state, { match }) => {
  const venueId = match.params.id
  const venue = state.entities.venues[venueId]
  debugger
  return {
    venueId,
    venue
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchVenue: venueId => dispatch(fetchVenue(venueId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueShow);