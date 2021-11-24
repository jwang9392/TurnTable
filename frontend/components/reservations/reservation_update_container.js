import { connect } from "react-redux";
import { fetchReservation } from '../../actions/reservation_actions'
import { fetchVenue } from '../../actions/venue_actions'
import ReservationUpdate from "./reservation_update";

const mapStateToProps = (state, {match}) => {
  return {
    reservations: state.entities.reservations,
    venues: state.entities.venues,
    resId: match.params.id
  }
}

const mapDispatchToProps = dispatch => ({
  fetchReservation: resId => dispatch(fetchReservation(resId)),
  fetchVenue: venueId => dispatch(fetchVenue(venueId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReservationUpdate)