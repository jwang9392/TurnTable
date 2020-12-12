import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createReservation, fetchReservations } from "../../actions/reservation_actions";
import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import { parseHash } from '../../util/util';
import ReservationForm from "./reservation_form";

const mapStateToProps = (state, ownProps) => {
  const clearErrors = () => {
    return state.errors['reservation'] = [];
  }

  const reservationInfo = parseHash(ownProps.location.state.reservationHash);
  const dateParts = reservationInfo["date"].split("-");
  const resDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
  
  return {
    currentUser: state.entities.users[state.session.currentUserId],
    venue: state.entities.venues[ownProps.match.params.venue_id],
    loggedIn: Boolean(state.session.currentUserId),
    reservationInfo: reservationInfo,
    date: resDate,
    errors: state.errors.reservation,
    clearErrors: clearErrors()
  }
}

const mapDispatchToProps = dispatch => ({
  createReservation: reservation => dispatch(createReservation(reservation)),
  fetchReservations: userId => dispatch(fetchReservations(userId)),
  openModal: (modal, data) => dispatch(openModal(modal, data)),
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(ReservationForm)