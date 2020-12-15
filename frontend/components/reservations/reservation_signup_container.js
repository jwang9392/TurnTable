import { connect } from 'react-redux';
import { createReservation } from '../../actions/reservation_actions';
import { signup } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';
import ReservationSignup from './reservation_signup';
import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => {
  debugger
  return {
    reservation: state.ui.modal.data.res,
    user: state.ui.modal.data.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createReservation: reservation => dispatch(createReservation(reservation)),
    signup: (user) => dispatch(signup(user)),
    closeModal: () => dispatch(closeModal())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReservationSignup));