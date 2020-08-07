import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import LoginFormContainer from '../session_form/login_form_container';
import SignupFormContainer from '../session_form/signup_form_container';
import ReservationConflictContainer from '../reservations/reservation_conflict_container';

function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  let modalType;

  switch (modal) {
    case 'login':
      component = <LoginFormContainer />;
      modalType = "modal-session";
      break;
    case 'signup':
      component = <SignupFormContainer />;
      modalType = "modal-session";
      break;
    case 'res':
      component = <ReservationConflictContainer />;
      modalType = "modal-res";
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
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
