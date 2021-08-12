import { connect } from 'react-redux';
import VenueShow from './venue_show';
import { parseHash } from '../../util/util';

const mapStateToProps = (state, { match, location}) => {
  const venueId = match.params.id
  const venue = state.entities.venues[venueId]
  const resInfo = parseHash(location.state.hash);

  return {
    venueId,
    venue, 
    resInfo,
    timesBooked: location.state.timesBooked
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchVenue: venueId => dispatch(fetchVenue(venueId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueShow);