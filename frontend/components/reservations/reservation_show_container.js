import { connect } from 'react-redux';
import { updateReservation, deleteReservation, fetchReservation } from '../../actions/reservation_actions';
import ReservationShow from './reservation_show';


const mapStateToProps = (state, ownProps) => {
  return {
    state: state,
    resId: ownProps.match.params.id,
    user: state.entities.users[state.session.currentUserId]
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