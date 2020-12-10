import React from 'react';
import { withRouter } from 'react-router-dom';

class ReservationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn,
      fname: "",
      lname: "",
      email: "",
      phone_number: "",
      occasion: "",
      special_request: "",
      venue_id: "",
      user_id: "",
      minutes: 5,
      seconds: 0
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.modalTrigger = this.modalTrigger.bind(this);
  }

  componentDidMount() {
    // this.myInterval = setInterval( () => {
    //   const { seconds, minutes } = this.state

    //   if (seconds > 0) {
    //     this.setState(({ seconds }) => ({
    //       seconds: seconds - 1
    //     }))
    //   }
    //   if (seconds === 0) {
    //     if (minutes === 0) {
    //       clearInterval(this.myInterval)
    //     } else {
    //       this.setState(({ minutes }) => ({
    //         minutes: minutes - 1,
    //         seconds: 59
    //       }))
    //     }
    //   }
    // }, 1000)

    this.props.clearErrors;
    const {venue, currentUser} = this.props

    this.setState({
      venue_id: venue.id,
    })

    if (this.props.loggedIn) {
      this.setState({
        fname: currentUser.fname,
        lname: currentUser.lname,
        email: currentUser.email,
        phone_number: currentUser.phone_number,
        venue_id: venue.id,
        user_id: currentUser.id
      })

      this.props.fetchReservations(currentUser.id);
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }

  modalTrigger(action) {
    return () => {
      this.props.openModal(action);
    }
  }

  update(field) {
    return e => this.setState({ 
      [field]: e.target.value 
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const reservation = {
      time: this.props.reservationInfo["time"],
      date: this.props.date,
      party_size: this.props.reservationInfo["partySize"],
      venue_id: this.state.venue_id
    }

    if (this.props.loggedIn) {
      reservation.user_id = this.state.user_id
    }
    
    this.props.createReservation(reservation).then(data => {
      const resId = data.reservation.id;

      this.props.history.push(
        `/reservations/${resId}`
      )
    }, err => {
        this.props.openModal("res");
      }
    );
  }

  renderErrors() {
    // debugger
    // this.props.errors.forEach(err => {
    //   switch (err) {
    //     case "User must exist":
    //       return <li>{err}</li>;
    //   }
    // });

    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  loggedInComponent() {
    return (
      <div className="logged-in-res-create">
        <div className="res-links">
          <span>
            {this.props.currentUser.fname} {this.props.currentUser.lname} (
              <span className="res-trigger-links" onClick={this.props.logout}>
                Not {this.props.currentUser.fname}?
              </span>
            )
          </span>
        </div>
        <div className="res-create-input-fields">
          <div className="res-input-row">
            <input 
              className="res-input-field" 
              type="text" 
              placeholder="Phone Number" 
              onChange={this.update("phone_number")} 
              defaultValue={this.props.currentUser.phone_number} 
            />
            <input 
              className="res-input-field" 
              defaultValue={this.props.currentUser.email} 
              readOnly 
            />
          </div><br/>
          <div className="res-input-row">
            <input 
              className="res-input-field" 
              type="text" 
              placeholder="Select an occasion (optional)" 
              onChange={this.update("occasion")} 
              defaultValue=""
            />
            <input 
              className="res-input-field" 
              type="textarea" 
              placeholder="Add a special request (optional)" 
              onChange={this.update("special_request")} 
              defaultValue=""
            />
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
            <span 
              className="res-trigger-links" 
              onClick={this.modalTrigger("login")}
            >
              Sign in
            </span>{" "}
            or{" "}
            <span 
              className="res-trigger-links" 
              onClick={this.modalTrigger("signup")}
            >
              Sign up
            </span>{" "}
            to collect points for this reservation
          </span>
        </div>
        <div className="res-create-input-fields">
          <div className="res-input-row">
            <input 
              className="res-input-field" 
              type="text" 
              placeholder="First name" 
              onChange={this.update("fname")} 
              defaultValue=""
            />
            <input 
              className="res-input-field" 
              type="text" 
              placeholder="Last name" 
              onChange={this.update("lname")}
              defaultValue=""
            />
          </div><br/>
          <div className="res-input-row">
            <input 
              className="res-input-field" 
              type="text" 
              placeholder="Phone number" 
              onChange={this.update("phone_number")}
              defaultValue=""
            />
            <input 
              className="res-input-field" 
              type="email" 
              placeholder="Email" 
              onChange={this.update("email")}
              defaultValue=""
            />
          </div><br/>
          <div className="res-input-row">
            <input 
              className="res-input-field" 
              type="text" 
              placeholder="Select an occasion (optional)" 
              onChange={this.update("occasion")}
              defaultValue=""
            />
            <input 
              className="res-input-field" 
              type="textarea" 
              placeholder="Add a special request (optional)" 
              onChange={this.update("special_request")}
              defaultValue=""
            />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { minutes, seconds } = this.state
    let date = this.props.date.toString().split(" ").slice(0, 3);
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
                  <div>
                    <i id="date" className="far fa-calendar"></i>
                    &nbsp;&nbsp;{date}
                  </div>
                  <div>
                    <i id="ticker" className="far fa-clock"></i>
                    &nbsp;&nbsp;{this.props.reservationInfo["time"]}
                  </div>
                  <div>
                    <i id="user-icon" className="far fa-user"></i>
                    &nbsp;&nbsp;{this.props.reservationInfo["partySize"]}
                  </div>  
                </div>
              </div>
            </div>

            { minutes === 0 && seconds === 0 ? 
              <div className="countdown-over">
                <span className="res-timer">You can still try to complete your reservation, but this table may no longer be available.</span>
              </div> :
              <div className="countdown">
                <span className="res-timer">We're holding this table for you for </span>
                <span> {minutes}:{seconds < 10 ? `0${seconds}` : seconds} minutes</span> 
              </div> 
            }

            {this.renderErrors()}
            
            <form className="res-form" onSubmit={this.handleSubmit}>
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
              <p>By clicking “Complete reservation” you agree to the TurnTable Terms of Use and Privacy Policy. Standard text message rates may apply. You may opt out of receiving text messages at any time. </p>
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

export default withRouter(ReservationForm);