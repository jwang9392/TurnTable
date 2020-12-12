import { connect } from 'react-redux';
import { createReservation } from '../../actions/reservation_actions';
import { signup } from '../../actions/session_actions';
import ReservationSignup from './reservation_signup';


const mapStateToProps = (state) => {
  return {
    userInfo: state.ui.modal.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createReservation: reservation => dispatch(createReservation(reservation)),
    signup: (user) => dispatch(signup(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationSignup);