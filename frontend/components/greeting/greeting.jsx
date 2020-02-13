import React from 'react';
import NavDropdown from '../nav_dropdown/nav_dropdown';


const Greeting = ({ user, openModal }) => {
debugger
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
    debugger
    return (
      <hgroup className="header-group">
        <h4 className="header-name">Hi, {user.fname}!</h4>
        <NavDropdown />
      </hgroup>
    )
  };

  debugger
  return user ? personalGreeting(user, logout) : sessionLinks()
};

export default Greeting;

