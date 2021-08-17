import { connect } from 'react-redux';
import { updateReservation, deleteReservation, fetchReservation } from '../../actions/reservation_actions';
import ReservationShow from './reservation_show';


const mapStateToProps = ({entities, session}, {match, location}) => {
  return {
    res: entities.reservations[match.params.id],
    venues: entities.venues,
    user: entities.users[session.currentUserId],
    past: location.state.past
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReservation: (resId) => dispatch(fetchReservation(resId)),
    deleteReservation: (resId) => dispatch(deleteReservation(resId)),
    updateReservation: (reservation) => dispatch(updateReservation(reservation))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationShow);