import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createReservation } from "../../actions/reservation_actions";
import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import CreateReservationForm from "./create_reservation_form";

const mapStateToProps = (state, ownProps) => {
  const clearErrors = () => {
    return state.errors['reservation'] = [];
  }

  return {
    venue: state.entities.venues[ownProps.match.params.venue_id],
    loggedIn: Boolean(state.session.currentUserId),
    errors: state.session.errors,
    clearErrors: clearErrors()
  }
}

const mapDispatchToProps = dispatch => ({
  createReservation: reservation => dispatch(createReservation(reservation)),
  closeModal: () => dispatch(closeModal()),
  openSignupModal: () => dispatch(openModal('signup')),
  openLoginModal: () => dispatch(openModal('login')),
  logout: () => dispatch(logout())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateReservationForm))