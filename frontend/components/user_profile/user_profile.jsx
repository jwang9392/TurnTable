import React from "react";
import { Link } from "react-router-dom";
import ProfileReservation from './profile_reservation';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchReservations(this.props.currentUser.id);
  }

  toggleNav(location) {
    const {reservations} = this.props;

    if (location === "res") {
      return (
        <ProfileReservation 
          reservations={reservations}
        />  
      )
    }
  }

  render() {
    const { currentUser } = this.props;
  
    return (
      <>
        <div className="name-container">
          <h1 className="user-profile-name">
            {currentUser.fname} {currentUser.lname}
          </h1>
        </div>

        <div className="profile-container">
          <section className="profile-details">
            <div className="profile-navbar">
              <button className="profile-navbar-item">Reservations</button>
              <button className="profile-navbar-item">Saved Venues</button>
              <button className="profile-navbar-item">Account Details</button>
            </div>
            <main className="profile-content">
              {this.toggleNav("res")}
            </main>
          </section>
        </div>
      </>
    );
  }
}

export default UserProfile;
