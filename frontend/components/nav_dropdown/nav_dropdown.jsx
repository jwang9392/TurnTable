import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { logout } from '../../actions/session_actions';

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUserId
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

const NavDropdown = ({ logout }) => {
  return (
    <div className="dropdown-container">
      <div className='arrow-up'></div>
      <Link to="/user/:userId" className="dropdown-item">My Profile</Link>
      <Link to="/user/:userId" className="dropdown-item">My Dining History</Link>

      {/* BONUS FEATURE FOR ABOVE DINING HISTORY - SHOW PAGE BUT AT THE DINING HISTORY*/}
      {/* HOW TO ROUTE TO FAVORITES? THROUGH ASSOCIATION */}

      <Link to="/favorites" className="dropdown-item">My Saved Restaurants</Link> 
      <Link to="/" className="dropdown-item" onClick={logout}>Sign Out</Link>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavDropdown);