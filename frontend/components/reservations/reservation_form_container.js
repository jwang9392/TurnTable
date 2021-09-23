import { connect } from "react-redux";
import { createReservation, fetchReservations } from "../../actions/reservation_actions";
import { logout, signup, updateUser } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import ReservationForm from "./reservation_form";

const mapStateToProps = (state, {match, location}) => {
  const clearErrors = () => {
    return state.errors['reservation'] = [];
  }

  const dateParts = location.state.date.split("-");
  const resDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
  
  return {
    currentUser: state.entities.users[state.session.currentUserId],
    venue: state.entities.venues[match.params.venue_id],
    reservations: state.entities.reservations,
    loggedIn: Boolean(state.session.currentUserId),
    date: resDate,
    time: location.state.time,
    partySize: location.state.partySize,
    errors: state.errors,
    clearErrors: clearErrors()
  }
}

const mapDispatchToProps = dispatch => ({
  createReservation: reservation => dispatch(createReservation(reservation)),
  fetchReservations: userId => dispatch(fetchReservations(userId)),
  openModal: (modal, data) => dispatch(openModal(modal, data)),
  signup: (user) => dispatch(signup(user)),
  logout: () => dispatch(logout()),
  updateUser: (user) => dispatch(updateUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReservationForm)