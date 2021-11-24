import { connect } from "react-redux";
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

export default connect(mapStateToProps, null)(ProfileItem);
