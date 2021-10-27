import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import LoginFormContainer from '../session_form/login_form_container';
import SignupFormContainer from '../session_form/signup_form_container';
import ReservationConflictContainer from '../reservations/reservation_conflict_container';
import ReservationSignupContainer from '../reservations/reservation_signup_container';
import ReviewGetHelp from '../review/review_get_help';

function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }

  let component;
  let modalType;
  let clickAction;

  switch (modal.type) {
    case 'login':
      component = <LoginFormContainer />;
      modalType = "modal-session";
      clickAction = closeModal;
      break;
    case 'signup':
      component = <SignupFormContainer />;
      modalType = "modal-session";
      clickAction = closeModal;
      break;
    case 'res':
      component = <ReservationConflictContainer />;
      modalType = "modal-res";
      clickAction = null;
      break;
    case 'res-signup':
      component = <ReservationSignupContainer />;
      modalType = "modal-res-signup";
      clickAction = null;
      break;
    case 'rev-get-help':
      component = <ReviewGetHelp />;
      modalType = "modal-get-help";
      clickAction = null;
      break;
    default:
      return null;
  }
  
  return (
    <div className="modal-background" onClick={clickAction}>
      <div className={modalType} onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
