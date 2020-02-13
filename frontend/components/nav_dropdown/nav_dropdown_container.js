import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import NavDropdown from './nav_dropdown';

const mapStateToProps = ({ session }) => {
  // debugger
  return {
    currentUser: session.currentUserId
  }
};

const mapDispatchToProps = dispatch => {
  // debugger
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavDropdown);