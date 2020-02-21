import React from 'react';
import { parseHash } from '../../util/util';

class ReservationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      phone_number: "",
      occasion: "",
      special_request: "",
      venue_id: "",
      user_id: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors;

    const {venue, currentUser} = this.props
    this.setState({
      venue_id: venue.id,
    })

    if (this.props.loggedIn) {
      // debugger
      
      this.setState({
        fname: currentUser.fname,
        lname: currentUser.lname,
        email: currentUser.email,
        phone_number: currentUser.phone_number,
        venue_id: venue.id,
        user_id: currentUser.id
      })
    }
  }

  modalTrigger(action) {
    return () => this.props.openModal(action)
  }

  update(field) {
    return e => this.setState({ 
      [field]: e.target.value 
    })
  }

  handleSubmit(e) {

    e.preventDefault();

    const reservationHash = this.props.location.state.reservationHash;
    const reservationInfo = parseHash(reservationHash);
    // if (!this.props.loggedIn) {
    //   this.props.openModal('reservation-signup')
    // }
      
    if (this.props.loggedIn) {
      const reservation = {
        time: reservationInfo["time"],
        date: new Date(reservationInfo["date"]),
        party_size: +reservationInfo["partySize"],
        venue_id: this.state.venue_id,
        user_id: this.state.user_id
      }

      this.props.createReservation(reservation);
    }
  }

  loggedInComponent() {
    return (
      <div className="logged-in-res-create">
        <div className="res-links">
          <span>
            {this.state.fname} {this.state.lname} (<span className="res-trigger-links" onClick={this.props.logout}>Not {this.state.fname}?</span>)
          </span>
        </div>
        <div className="res-create-input-fields">
          <div className="res-input-row">
            <input className="res-input-field" type="text" placeholder="Phone Number" onChange={this.update("phone_number")} defaultValue={this.state.phone_number} />
            <input className="res-input-field" value={this.state.email} readOnly />
          </div><br/>
          <div className="res-input-row">
            <input className="res-input-field" type="text" placeholder="Select an occasion (optional)" onChange={this.update("occasion")} />
            <input className="res-input-field" type="textarea" placeholder="Add a special request (optional)" onChange={this.update("special_request")} />
          </div>
        </div>
      </div>
    )
  }

  loggedOutComponent() {
    return (
      <div className="logged-out-res-create">
        <div className="res-links">
          <span>
            <span className="res-trigger-links" onClick={this.modalTrigger("login")}>
              Sign in
            </span>{" "}
            or{" "}
            <span className="res-trigger-links" onClick={this.modalTrigger("signup")}>
              Sign up
            </span>{" "}
            to make this reservation
          </span>
        </div>
        <div className="res-create-input-fields">
          <div className="res-input-row">
            <input className="res-input-field" type="text" placeholder="First name" onChange={this.update("fname")} />
            <input className="res-input-field" type="text" placeholder="Last name" onChange={this.update("lname")}/>
          </div><br/>
          <div className="res-input-row">
            <input className="res-input-field" type="text" placeholder="Phone number" onChange={this.update("phone_number")}/>
            <input className="res-input-field" type="email" placeholder="Email" onChange={this.update("email")}/>
          </div><br/>
          <div className="res-input-row">
            <input className="res-input-field" type="text" placeholder="Select an occasion (optional)" onChange={this.update("occasion")}/>
            <input className="res-input-field" type="textarea" placeholder="Add a special request (optional)" onChange={this.update("special_request")}/>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const reservationHash = this.props.location.state.reservationHash;
    const reservationInfo = parseHash(reservationHash);
    let date = new Date(reservationInfo["date"]);
    date = date.toString().split(" ").slice(0, 3);
    let dateFront = [date.slice(0, -1).join(', ')];
    date = dateFront.concat([date[2]]).join(" ");

    
    return (
      <div>
        <section className="res-create-container">
          <div className="res-form-container">
            <span>You're almost done!</span>
            <div className="res-left-header">
              <div className='res-img'></div>
              <div>
                <p className="res-venue-name">{this.props.venue.name}</p>
                <div className="res-details">
                  <div><i id="date" className="far fa-calendar"></i>&nbsp;&nbsp;{date}</div>
                  <div><i id="ticker" className="far fa-clock"></i>&nbsp;&nbsp;{reservationInfo["time"]}</div>
                  <div><i id="user-icon" className="far fa-user"></i>&nbsp;&nbsp;{reservationInfo["partySize"]}</div>  
                </div>
              </div>
            </div>
            <div className="res-timer">
              <i id="ticker" className="far fa-clock"></i>&nbsp;&nbsp;&nbsp;
              <span>We're holding this table for you for 5:00 minutes</span>
              {/* ADD TIMER ABOVE */}
            </div>
            <form onSubmit={this.handleSubmit} noValidate>
              <>{this.props.loggedIn ? this.loggedInComponent() : this.loggedOutComponent()}</>
              <div className="res-contact-options">
                  <div>
                    <input className="res-checkbox" type="checkbox" />&nbsp;
                    Sign me up to receive offers and news from this venue by email
                  </div>
                  <div>
                    <input className="res-checkbox" type="checkbox" />&nbsp;
                    Yes, I want to get text updates and reminders about my reservations
                  </div>
              </div>
              <button className="submit-res-btn">
                Complete reservation
              </button>          
            </form>
          </div>
          <div className="res-message">
            <span>What to know before you go</span>
            <div>Important reservation information</div>
            <p>We have a 30 minute grace period. Please call us if you are running later than 30 minutes after your reservation time.</p>
            <br /><br />
            <p>We may contact you about this reservation, so please ensure your email and phone number are up to date.</p>
            <br /><br />
            <p>Your table will be reserved for 1 hour 30 minutes for parties of up to 2; 2 hours for parties of up to 4; and 2 hours 30 minutes for parties of 5+.</p>
            <div>A note from {this.props.venue.name}</div>
            <p>Thank you for making your reservation at {this.props.venue.name}. Please note that we try our best to accommodate all reservations as received; however we cannot guarantee seating in any specific room unless specified and agreed upon. Kindly call if you are delayed 30 minutes after your reservation time. Furthermore, if you do not see your preferred time slot, please call us at {this.props.venue.phone_number}; we will try our best to accommodate you!</p>
          </div>
        </section>
      </div>
    );
  }
}

export default ReservationForm;