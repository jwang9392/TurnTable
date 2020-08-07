import { connect } from "react-redux";
import { fetchReservation, deleteReservation, createReservation } from "../../actions/reservation_actions";
import openModal from "../../actions/modal_actions";
import ReservationConflict from "./reservation_conflict";

// const mapStateToProps = (state) => {
//   return {
    
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => dispatch(openModal('res')),
    fetchReservation: (resId) => dispatch(fetchReservation(resId)),
    deleteReservation: (resId) => dispatch(deleteReservation(resId)),
    createReservation: reservation => dispatch(createReservation(reservation))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationConflict)