import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { logout } from '../../actions/session_actions';
import { fetchReservations } from '../../actions/reservation_actions'
import Greeting from './greeting';

const mapStateToProps = ({ session, entities: { users } }) => {
  return {
    user: users[session.currentUserId],
    currentUserId: session.currentUserId
  }  
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    openModal: modal => dispatch(openModal(modal)),
    fetchReservations: userId => dispatch(fetchReservations(userId))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeting);
