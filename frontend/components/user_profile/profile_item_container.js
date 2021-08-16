import { connect } from "react-redux";
import { deleteReservation } from "../../actions/reservation_actions";
import ProfileItem from "./profile_item";

const mapStateToProps = ({entities}, {reservation, type}) => {
  return {
    venue: entities.venues[reservation.venue_id],
    reservation,
    type
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteReservation: reservationId => dispatch(deleteReservation(reservationId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileItem);
