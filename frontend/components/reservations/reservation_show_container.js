import { connect } from 'react-redux';
import { fetchReservations, fetchReservation } from '../../actions/reservation_actions';
import { fetchVenues } from '../../actions/venue_actions';
import ReservationShow from './reservation_show';


const mapStateToProps = ({entities, session}, {match, location}) => {
  const locState = location.state || {};

  return {
    res: entities.reservations[match.params.id],
    reservations: entities.reservations,
    venues: entities.venues,
    user: entities.users[session.currentUserId],
    past: locState.past
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchVenues: () => dispatch(fetchVenues()),
    fetchReservations: (userId) => dispatch(fetchReservations(userId)),
    fetchReservation: (resId) => dispatch(fetchReservation(resId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationShow);