import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteReservation, createReservation, fetchReservation } from "../../actions/reservation_actions";
import { closeModal } from '../../actions/modal_actions';
import { parseHash } from '../../util/util';
import ReservationConflict from "./reservation_conflict";

const mapStateToProps = (state, ownProps) => {
  const reservations = state.entities.reservations;
  const resInfo = parseHash(ownProps.location.state.reservationHash);
  const dateParts = resInfo["date"].split("-");
  const resDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
  const newVenueId = parseInt(ownProps.location.pathname.split("/")[2]);

  let oldRes;
  for (let key in reservations) {
    let res = reservations[key];

    if (res.time === resInfo.time && res.date === resInfo.date) {
      oldRes = res;
    }
  }

  return {
    currentUser: state.entities.users[state.session.currentUserId], 
    newVenue: state.entities.venues[newVenueId],
    oldRes: oldRes,
    date: resDate,
    time: resInfo["time"],
    newPartySize: resInfo["partySize"],
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