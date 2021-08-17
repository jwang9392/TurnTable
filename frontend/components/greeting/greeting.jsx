import React from 'react';
import { Link, withRouter } from "react-router-dom";

class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }

  toggle() {
    document.getElementsByClassName("nav-dropdown")[0].classList.toggle("hidden");
  }

  sessionLinks() {
    return (
      <>
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
        <div className="header-group" onClick={() => this.toggle()}>
          <div className="header-greeting">
            <h4 className="header-name">Hi, {this.props.user.fname}!</h4>
            <i id='dropdown' className="fas fa-chevron-down"></i>
          </div>
          <div className="nav-dropdown hidden">
            <div className='dropdown-background'>
              <div className="dropdown-container">
                <div className='arrow-up'></div>
                <Link to="/my/Profile" className="dropdown-item">My Profile</Link>
                <Link to={{ pathname: "/my/Profile", scroll: "past"}} className="dropdown-item">My Dining History</Link>
                {/* to="/my/Profile" className="dropdown-item"> */}

                {/* BONUS FEATURE FOR ABOVE DINING HISTORY - SHOW PAGE BUT AT THE DINING HISTORY*/}
                {/* HOW TO ROUTE TO FAVORITES? THROUGH ASSOCIATION */}

                <Link to="" className="dropdown-item">My Saved Venues</Link>
                <Link to="/" className="dropdown-item" onClick={this.props.logout}>Sign Out</Link>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  };

  render() {
    return (
      this.props.user ? this.personalGreeting() : this.sessionLinks()
    )
  }
}

export default withRouter(Greeting);
