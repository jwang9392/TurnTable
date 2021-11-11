import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteReservation, createReservation, fetchReservation } from "../../actions/reservation_actions";
import { closeModal } from '../../actions/modal_actions';
import ReservationConflict from "./reservation_conflict";

const mapStateToProps = (state, {location}) => {
  const reservations = state.entities.reservations;
  let storedParams;
  if (!location.state) {
    storedParams = JSON.parse(localStorage.getItem(`search-params-${state.session.currentUserId}`));
  }
  const date = location.state ? location.state.date : new Date(storedParams.date)
  const { time, partySize } = location.state ? location.state : storedParams;
  const newVenueId = parseInt(location.pathname.split("/")[2]);

  let oldRes;
  for (let key in reservations) {
    let res = reservations[key];

    if (res.time === time && res.date === date.toISOString().slice(0, 10)) {
      oldRes = res;
    }
  }

  return {
    currentUser: state.entities.users[state.session.currentUserId], 
    reservations: state.entities.reservations,
    newVenue: state.entities.venues[newVenueId],
    oldVenue: state.entities.venues[oldRes.venue_id],
    oldRes: oldRes,
    date: date,
    time: time,
    newPartySize: partySize,
    loggedIn: Boolean(state.session.currentUserId)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchReservation: (resId) => dispatch(fetchReservation(resId)),
    deleteReservation: (resId) => dispatch(deleteReservation(resId)),
    createReservation: reservation => dispatch(createReservation(reservation)), 
    closeModal: () => dispatch(closeModal())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReservationConflict))