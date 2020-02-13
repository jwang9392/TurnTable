import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import UserForm from './user_form';

const mapStateToProps = ({ errors }) => {
  const clearErrors = () => {
    return errors['session'] = [];
  }

  return {
    errors: errors.session,
    formType: 'signup', 
    clearErrors: clearErrors()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    closeModal: () => dispatch(closeModal()),
    openModal: () => dispatch(openModal('login')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
