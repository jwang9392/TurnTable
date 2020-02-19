import React from 'react';
import NavDropdown from '../nav_dropdown/nav_dropdown_container';
import {logout} from '../../actions/session_actions'

function toggle() {
  document.getElementsByClassName("nav-dropdown")[0].classList.toggle("hidden");
}

const Greeting = ({ user, openModal }) => {
  const sessionLinks = () => {
    return (
    <nav className="login-signup">
      <button onClick={() => openModal('signup')} className='signup-button'>Sign up</button>
      &nbsp;
      <button onClick={() => openModal('login')} className='login-button'>Sign in</button>
    </nav>
    )
  };
  const personalGreeting = (user) => {
    return (
      <hgroup className="header-group" onClick={() => toggle()}>
        <div className="header-greeting">
          <h4 className="header-name">Hi, {user.fname}!</h4>
          <i id='dropdown' className="fas fa-chevron-down"></i>
        </div>
        <div className="nav-dropdown hidden">
          <NavDropdown />
        </div>
      </hgroup>
    )
  };

  return user ? personalGreeting(user, logout) : sessionLinks()
};

export default Greeting;

