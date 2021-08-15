import React from "react";
import { Link } from "react-router-dom";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    this.props.fetchReservations(this.props.currentUser.id);
  }

  render() {
    const { currentUser } = this.props;

    debugger
    return (
      <>
        <div className="name-container">
          <h1 className="user-profile-name">
            {currentUser.fname} {currentUser.lname}
          </h1>
        </div>
        <section className="profile-container">
          <div className="profile-navbar">
            <button className="profile-navbar-item">Reservations</button>
            <button className="profile-navbar-item">Saved Venues</button>
            <button className="profile-navbar-item">Account Details</button>
          </div>
          <main className="profile-content">
            <ul className="upcoming-res">
              <h1>Upcoming Reservations</h1>
            </ul>
            <ul className="past-res">
              <h1>Past Reservations</h1>
            </ul>
          </main>
        </section>
      </>
    );
  }
}

export default UserProfile;
