import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';
import UserForm from './user_form';

const mapStateToProps = ({ errors }) => {
  debugger
  return {
    errors: errors.session,
    formType: 'signup'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
