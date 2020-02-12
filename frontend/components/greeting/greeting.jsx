import React from 'react';
import NavDropdown from '../nav_dropdown/nav_dropdown';


const Greeting = ({ currentUser, logout, openModal }) => {
debugger
  const sessionLinks = () => (
    <nav className="login-signup">
      <button onClick={() => openModal('signup')} className='signup-button'>Sign up</button>
      &nbsp;
      <button onClick={() => openModal('login')} className='login-button'>Sign in</button>
    </nav>
  );
  const personalGreeting = (currentUser) => (
    <hgroup className="header-group">
      <h4 className="header-name">Hi, {currentUser}!</h4>
      <button onClick={() => logout()} className='login-button'>Log out</button>
      {/* <NavDropdown /> */}
    </hgroup>
  );

  debugger
  return currentUser ? personalGreeting(currentUser, logout) : sessionLinks()
};

export default Greeting;

