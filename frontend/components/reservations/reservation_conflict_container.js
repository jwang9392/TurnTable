import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteReservation, createReservation, fetchReservation } from "../../actions/reservation_actions";
import { closeModal } from '../../actions/modal_actions';
import { parseHash } from '../../util/util';
import ReservationConflict from "./reservation_conflict";

const mapStateToProps = (state, {location}) => {
  const reservations = state.entities.reservations;
  const {date, time, partySize} = location.state
  const dateParts = date.split("-");
  const resDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
  const newVenueId = parseInt(location.pathname.split("/")[2]);

  let oldRes;
  for (let key in reservations) {
    let res = reservations[key];

    if (res.time === time && res.date === date) {
      oldRes = res;
    }
  }

  return {
    currentUser: state.entities.users[state.session.currentUserId], 
    newVenue: state.entities.venues[newVenueId],
    oldVenue: state.entities.venues[oldRes.venue_id],
    oldRes: oldRes,
    date: resDate,
    time,
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