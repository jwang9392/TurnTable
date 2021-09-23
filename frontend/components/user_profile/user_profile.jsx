import React from "react";
import { Link } from "react-router-dom";
import ProfileReservation from './profile_reservation';
import UserUpdateContainer from "./user_update_container";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "res"
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchReservations(this.props.currentUser.id);
    this.props.fetchVenues();
    const {scroll} = this.props;
    if (scroll) document.getElementById('past').scrollIntoView();
  }

  handleClick(display) {
    this.setState({display: display});
  }

  toggleNav(location) {
    if (this.props.venues && Object.values(this.props.venues).length > 0) {
      const {reservations, venues} = this.props;
  
      switch (location) {
        case "res":
          return (
            <ProfileReservation
              reservations={reservations}
              venues={venues}
            />
          );
        case "det":
          return (
            <UserUpdateContainer />
          );
        case "save":
          return "";
  
      }
    } else {
      return <div />;
    }

  }

  render() {
    const { currentUser } = this.props;
    const { display } = this.state;

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
              <button className="profile-navbar-item" onClick={() => this.handleClick("res")}>Reservations</button>
              <button className="profile-navbar-item" onClick={() => this.handleClick("save")}>Saved Venues</button>
              <button className="profile-navbar-item" onClick={() => this.handleClick("det")}>Account Details</button>
            </div>
            <main className="profile-content">
              {this.toggleNav(display)}
            </main>
          </section>
        </div>
      </>
    );
  }
}

export default UserProfile;
