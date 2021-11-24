import { connect } from "react-redux";
import { createReservation, fetchReservations, updateReservation } from "../../actions/reservation_actions";
import { logout, signup, updateUser } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import ReservationForm from "./reservation_form";

const mapStateToProps = (state, {match, location}) => {
  const clearErrors = () => {
    return state.errors['reservation'] = [];
  }

  let storedParams; 
  if (!location.state) {
    storedParams = JSON.parse(localStorage.getItem(`search-params`));
  }

  return {
    currentUser: state.entities.users[state.session.currentUserId],
    venue: state.entities.venues[match.params.venue_id],
    reservations: state.entities.reservations,
    loggedIn: Boolean(state.session.currentUserId),
    date: location.state ? location.state.date : new Date(storedParams.date),
    time: location.state ? location.state.time : storedParams.time,
    partySize: location.state ? location.state.partySize : storedParams.partySize,
    errors: state.errors,
    clearErrors: clearErrors(),
    modify: location.state.modify, 
    modifyRes: location.state.res
  }
}

const mapDispatchToProps = dispatch => ({
  createReservation: reservation => dispatch(createReservation(reservation)),
  fetchReservations: userId => dispatch(fetchReservations(userId)),
  updateReservation: (resId) => dispatch(updateReservation(resId)),
  openModal: (modal, data) => dispatch(openModal(modal, data)),
  signup: (user) => dispatch(signup(user)),
  logout: () => dispatch(logout()),
  updateUser: (user) => dispatch(updateUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReservationForm)