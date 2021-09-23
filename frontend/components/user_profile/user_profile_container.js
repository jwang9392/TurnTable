import { connect } from "react-redux";
import { fetchReservations } from "../../actions/reservation_actions";
import { fetchVenues } from '../../actions/venue_actions';
import UserProfile from "./user_profile";

const mapStateToProps = ({entities, session}, {location}) => {
  return {
    currentUser: entities.users[session.currentUserId],
    venues: entities.venues,
    reservations: entities.reservations, 
    scroll: !!location.scroll
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReservations: userId => dispatch(fetchReservations(userId)), 
    fetchVenues: () => dispatch(fetchVenues())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
