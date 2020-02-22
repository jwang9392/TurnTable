import { connect } from 'react-redux';
import { updateReservation, deleteReservation, fetchReservation } from '../../actions/reservation_actions';
import ReservationShow from './reservation_show';


const mapStateToProps = (state, ownProps) => {
  debugger
  const { reservationId } = ownProps.match.params
  const reservation = state.entities.reservations[reservationId]
  const venue = (reservation) ? state.entities.venues[reservation.venue_id] : {}
  return {
    reservation,
    venue,
    user: state.session.currentUser,
    reservationInfo: state.session.reservationInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReservation: (reservationId) => dispatch(fetchReservation(reservationId)),
    deleteReservation: (reservationId) => dispatch(deleteReservation(reservationId)),
    updateReservation: (reservationId) => dispatch(updateReservation(reservationId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationShow);