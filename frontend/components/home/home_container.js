import { connect } from 'react-redux';
import { fetchVenues } from '../../actions/venue_actions';
import Home from './home';

const mapStateToProps = ({entities}) => {
  return {
    venues: entities.venues
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchVenues: () => dispatch(fetchVenues())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);