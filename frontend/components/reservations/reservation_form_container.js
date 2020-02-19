import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReservationForm from "./reservation_form";
import { createReservation, updateReservation, deleteReservation } from "../../actions/reservation_actions";

const mapStateToProps = (state, ownProps) => {
  const clearErrors = () => {
    return state.errors['reservation'] = [];
  }

  return {
    reservation: state.entities.reservations[state.session.id],
    restaurant: state.entities.restaurants[ownProps.match.params.id],
    userId: state.session.id,
    errors: errors,
    clearErrors: clearErrors()
  }
}

const mapDispatchToProps = dispatch => ({
  create: reservation => dispatch(createReservation(reservation)),
  update: reservation => dispatch(updateReservation(reservation)),
  delete: id => dispatch(deleteReservation(id)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReservationForm))