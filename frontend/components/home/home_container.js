import { connect } from 'react-redux';
import { fetchVenues } from '../../actions/venue_actions';
import { fetchVenue } from '../../util/venues_util';
import Home from './home';


// const mapStateToProps = state => {
//   return {
    
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    fetchVenues: () => dispatch(fetchVenues()),
    fetchVenue: (venueId) => dispatch(fetchVenue(venueId))
  };
};

export default connect(null, mapDispatchToProps)(Home);