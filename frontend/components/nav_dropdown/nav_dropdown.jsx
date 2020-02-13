import React from 'react';
import { Link } from 'react-router-dom';

class NavDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidden: true };
  }

  render() {
    return (
      <div className="dropdown-container">
        <div className='arrow-up'></div>
        <Link to="/user/:userId" className="dropdown-item">My Profile</Link>
        <Link to="/user/:userId" className="dropdown-item">My Dining History</Link>

        {/* BONUS FEATURE FOR ABOVE DINING HISTORY - SHOW PAGE BUT AT THE DINING HISTORY*/}
        {/* HOW TO ROUTE TO FAVORITES? THROUGH ASSOCIATION */}

        <Link to="/favorites" className="dropdown-item">My Saved Restaurants</Link> 
        <Link to="/" className="dropdown-item" onClick={this.props.logout}>Sign Out</Link>
      </div>
    )
  }
}

export default NavDropdown;
