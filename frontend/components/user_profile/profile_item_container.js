import { connect } from "react-redux";
import { deleteReservation } from "../../actions/reservation_actions";
import ProfileItem from "./profile_item";

const mapStateToProps = ({entities, session}, {reservation, type, past, venue}) => {
  return {
    user: entities.users[session.currentUserId],
    venue,
    reservation,
    type,
    past
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteReservation: reservationId => dispatch(deleteReservation(reservationId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileItem);
