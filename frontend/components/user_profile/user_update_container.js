import { connect } from "react-redux";
import { updateUser } from "../../actions/session_actions";
import UserUpdate from "./user_update";

const mapStateToProps = ({entities, session}) => {
  return {
    user: entities.users[session.currentUserId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate);
