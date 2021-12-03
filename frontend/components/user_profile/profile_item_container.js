import { connect } from "react-redux";
import { deleteReservation } from "../../actions/reservation_actions";
import ProfileItem from "./profile_item";

const mapStateToProps = ({ entities, session }, { venue, reservation, review, type, past }) => {
  return {
    user: entities.users[session.currentUserId],
    venue,
    reservation,
    review,
    type,
    past
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteReservation: (resId) => dispatch(deleteReservation(resId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileItem);
