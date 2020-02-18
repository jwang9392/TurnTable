import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
  const clearErrors = () => {
    return errors['session'] = [];
  }

  return {
    errors: errors.session,
    formType: 'login',
    clearErrors: clearErrors()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    closeModal: () => dispatch(closeModal()),
    openModal: () => dispatch(openModal('signup'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);