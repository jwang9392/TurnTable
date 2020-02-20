import React from 'react';
import NavDropdown from '../nav_dropdown/nav_dropdown_container';
import {logout} from '../../actions/session_actions'


class Greeting extends React.Component { 
  
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    const { user, currentUserId } = this.props;

    if (user.id === currentUserId) { 
      this.props.fetchReservations(this.props.currentUserId) 
    }
  }
  
  toggle() {
    document.getElementsByClassName("nav-dropdown")[0].classList.toggle("hidden");
  }

  sessionLinks() {
    return (
      <nav className="login-signup">
      <button onClick={() => this.props.openModal('signup')} className='signup-button'>Sign up</button>
      &nbsp;
      <button onClick={() => this.props.openModal('login')} className='login-button'>Sign in</button>
    </nav>
    )
  };

  personalGreeting() {
    return (
      <hgroup className="header-group" onClick={() => this.toggle()}>
        <div className="header-greeting">
          <h4 className="header-name">Hi, {this.props.user.fname}!</h4>
          <i id='dropdown' className="fas fa-chevron-down"></i>
        </div>
        <div className="nav-dropdown hidden">
          <NavDropdown />
        </div>
      </hgroup>
    )
  };

  render() {
    return (
      this.props.user ? this.personalGreeting(logout) : this.sessionLinks()
    )
  }


}
export default Greeting;

