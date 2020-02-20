import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createReservation } from '../../actions/reservation_actions'
import ReservationTimes from "./reservation_times";

const mapStateToProps = (state) => {
  // debugger
  return {
    currentUserId: state.session.currentUserId,
    venues: state.entities.venues
  }
}

const mapDispatchToProps = dispatch => ({
  createReservation: (res) => dispatch(createReservation(res))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReservationTimes))