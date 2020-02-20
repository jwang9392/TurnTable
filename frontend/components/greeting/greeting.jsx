import React from 'react';
import NavDropdown from '../nav_dropdown/nav_dropdown_container';
import {logout} from '../../actions/session_actions'
import { Link, withRouter } from "react-router-dom";


class Greeting extends React.Component { 
  
  constructor(props) {
    super(props);
  }

  // componentDidUpdate() {
  //   const { user, currentUserId } = this.props;

  //   if (user.id === currentUserId) { 
  //     this.props.fetchReservations(this.props.currentUserId) 
  //   }
  // }
  
  toggle() {
    document.getElementsByClassName("nav-dropdown")[0].classList.toggle("hidden");
  }

  sessionLinks() {
    return (
      <>
      <Link to={`/`}>
        <div className="logo">
          <div className="logo-image"></div>
          <div className="logo-text">
            <h3>TurnTable</h3>
            <p>by <span>Jason Wang</span></p>
          </div>
        </div>
      </Link>
      <nav className="login-signup">
      <button onClick={() => this.props.openModal('signup')} className='signup-button'>Sign up</button>
      &nbsp;
      <button onClick={() => this.props.openModal('login')} className='login-button'>Sign in</button>
    </nav>
    </>
    )
  };

  personalGreeting() {
    return (
      <>
      <Link to={`/`}>
        <div className="logo">
          <div className="logo-image" />
          <div className="logo-text">
            <h3>TurnTable</h3>
            <p>by <span>Jason Wang</span></p>
          </div>
        </div>
      </Link>
      <hgroup className="header-group" onClick={() => this.toggle()}>
        <div className="header-greeting">
          <h4 className="header-name">Hi, {this.props.user.fname}!</h4>
          <i id='dropdown' className="fas fa-chevron-down"></i>
        </div>
        <div className="nav-dropdown hidden">
          <NavDropdown />
        </div>
      </hgroup>
      </>
    )
  };

  render() {
    return (
      this.props.user ? this.personalGreeting(logout) : this.sessionLinks()
    )
  }


}
export default withRouter(Greeting);

