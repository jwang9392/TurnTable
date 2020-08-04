import React from 'react';
import Greeting from '../greeting/greeting_container';
import { Link, withRouter } from "react-router-dom";


class Navbar extends React.Component { 
  
  constructor(props) {
    super(props);
  }

  // componentDidUpdate() {
  //   const { user, currentUserId } = this.props;

  //   if (user.id === currentUserId) { 
  //     this.props.fetchReservations(this.props.currentUserId) 
  //   }
  // }

  render() {
    return (
      <header className="header">
        <Link to={`/`}>
          <div className="logo">
            <div className="logo-image" />
            <div className="logo-text">
              <h3>TurnTable</h3>
              <p>by <span>Jason Wang</span></p>
            </div>
          </div>
        </Link>
        <Greeting />
      </header>
    )
  }


}
export default withRouter(Navbar);

