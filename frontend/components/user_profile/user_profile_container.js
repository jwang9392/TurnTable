import { connect } from "react-redux";
import { fetchReservations } from "../../actions/reservation_actions";
import UserProfile from "./user_profile";

const mapStateToProps = ({entities, session}) => {

  return {
    currentUser: entities.users[session.currentUserId],
    venues: entities.venues,
    reservations: entities.reservations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReservations: userId => dispatch(fetchReservations(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
