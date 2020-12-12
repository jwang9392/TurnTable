import React from 'react';
import { withRouter } from 'react-router-dom';

class ReservationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn,
      res: {},
      fname: "",
      lname: "",
      email: "",
      phone_number: "",
      occasion: "",
      special_request: "",
      venue_id: "",
      user_id: "",
      minutes: 5,
      seconds: 0, 
      errors: {
        fname: false,
        lname: false,
        email: false,
        phone_number: false
      }
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
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

  // checkInputError(name, field) {
  //   // CHANGE LOGIC TO ACCEPT OBJECT THEN ITERATE THROUGH KEYS AND CHECK VALUES?
  //   if (field.length === 0) {
  //     debugger
  //     this.setState({
  //       errors: {
  //         ...this.state.errors,
  //         [name]: true
  //       }
  //     });
  //   } else {
  //     this.setState({
  //       errors: {
  //         ...this.state.errors,
  //         [name]: false
  //       }
  //     });
  //   };
  // }

  update(e) {
    const field = e.target.name;
    this.setState({
      [field]: e.target.value
    });

    // this.checkInputError(e.target.name, e.target.value)
    
    if (e.target.value.length === 0) {

      this.setState({
        errors: {
          ...this.state.errors,
          [field]: true
        }
      });
    } else {
      this.setState({
        errors: {
          ...this.state.errors,
          [field]: false
        }
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    // TRY MAKING FUNC THAT SETS STATE THEN RETURNS TRUE AND MAKING IT THE CONDITIONAL IN IF STATEMENT
    // OR TRY ONCLICK WITH NEW FUNC


    // if (!this.props.loggedIn) {
    //     this.checkInputError("fname", this.state.fname);
    //     this.checkInputError("lname", this.state.lname);
    //   return
    // }
    debugger

    if (Object.values(this.state.errors).includes(true)) {
      return
    }
debugger
    const reservation = {
      time: this.props.reservationInfo["time"],
      date: this.props.date,
      party_size: this.props.reservationInfo["partySize"],
      occasion: this.state.occasion,
      special_request: this.state.special_request,
      venue_id: this.state.venue_id
    }

    this.setState({ res: reservation });

    if (this.props.loggedIn) {
      reservation.user_id = this.state.user_id
    }
    
    this.props.createReservation(reservation).then(data => {
      const resId = data.reservation.id;

      this.props.history.push(
        `/reservations/${resId}`
      )
    }, err => {
        this.handleSubmitErrors(err.errors[0]);
      }
    );
  }

  handleSubmitErrors(err) {
    const user = {
      username: `${[this.state.fname]} ${[this.state.lname]}`,
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      phone_number: this.state.fname
    };
    const data = {
      res: this.state.res, 
      user: user
    };

    switch (err) {
      case "User has already been taken":
        this.props.openModal("res");
        break;
      case "User must exist":
        this.props.openModal("res-signup", data);
        break;
    };
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
            <div className={`input-field ${
              this.state.errors.phone_number ? "input-error":""
            }`}>
              <input 
                name="phone_number"
                className="res-input-field" 
                type="text" 
                placeholder="Phone Number" 
                onChange={this.update} 
                defaultValue={this.props.currentUser.phone_number} 
              />
              <div className={`input-error-message ${
                this.state.errors.phone_number ? "" : "hidden"
              }`}>Phone number is required.</div>
            </div>
            <input 
              name="email"
              className="res-input-field input-read-only" 
              defaultValue={this.props.currentUser.email} 
              readOnly 
            />
          </div><br/>
          <div className="res-input-row">
            <input 
              name="occasion"
              className="res-input-field" 
              type="text" 
              placeholder="Select an occasion (optional)" 
              onChange={this.update} 
              defaultValue=""
            />
            <input 
              name="special_request"
              className="res-input-field" 
              type="textarea" 
              placeholder="Add a special request (optional)" 
              onChange={this.update} 
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
            <div className={`input-field ${
              this.state.errors.fname ? "input-error" : ""
            }`}>
              <input 
                name="fname"
                className="res-input-field" 
                type="text" 
                placeholder="First name" 
                onChange={this.update} 
                defaultValue=""
              />
              <div className={`input-error-message ${
                this.state.errors.fname ? "" : "hidden"
              }`}>First name is required.</div>
            </div>
            <div className={`input-field ${
              this.state.errors.lname ? "input-error" : ""
            }`}>
              <input 
                name="lname"
                className="res-input-field" 
                type="text" 
                placeholder="Last name" 
                onChange={this.update}
                defaultValue=""
              />
              <div className={`input-error-message ${
                this.state.errors.lname ? "" : "hidden"
              }`}>Last name is required.</div>
            </div>
          </div><br/>
          <div className="res-input-row">
            <div className={`input-field ${
              this.state.errors.phone_number ? "input-error" : ""
            }`}>
              <input 
                name="phone_number"
                className="res-input-field" 
                type="text" 
                placeholder="Phone number" 
                onChange={this.update}
                defaultValue=""
              />
              <div className={`input-error-message ${
                this.state.errors.phone_number ? "" : "hidden"
              }`}>Phone number is required.</div>
            </div>
            <div className={`input-field ${
              this.state.errors.email ? "input-error" : ""
            }`}>
              <input 
                name="email"
                className="res-input-field" 
                type="email" 
                placeholder="Email" 
                onChange={this.update}
                defaultValue=""
              />
              <div className={`input-error-message ${
                this.state.errors.email ? "" : "hidden"
              }`}>Email is required.</div>
            </div>
          </div><br/>
          <div className="res-input-row">
            <input 
              name="occasion"
              className="res-input-field" 
              type="text" 
              placeholder="Select an occasion (optional)" 
              onChange={this.update}
              defaultValue=""
            />
            <input 
              name="special_request"
              className="res-input-field" 
              type="textarea" 
              placeholder="Add a special request (optional)" 
              onChange={this.update}
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