import React from 'react';
import { withRouter } from 'react-router-dom';

class ReservationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false,
      visited: false,
      userExists: false,
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
      past: [],
      minutes: 5,
      seconds: 0, 
      inputErrors: {
        fname: false,
        lname: false,
        email: false,
        phone_number: false
      }
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.errorMessage = this.errorMessage.bind(this);
    this.inputVisited = this.inputVisited.bind(this);
    this.modalTrigger = this.modalTrigger.bind(this);
  }

  componentDidMount() {
    const { venue, currentUser, fetchVenues, fetchReservations, clearErrors } = this.props;
    
    if (!this.props.venue) {
      fetchVenues();
    } else {
      this.myInterval = setInterval( () => {
        const { seconds, minutes } = this.state
  
        if (seconds > 0) {
          this.setState(({ seconds }) => ({
            seconds: seconds - 1
          }))
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(this.myInterval)
          } else {
            this.setState(({ minutes }) => ({
              minutes: minutes - 1,
              seconds: 59
            }))
          }
        }
      }, 1000)
  
      clearErrors;
  
      this.setState({
        venue_id: venue.id,
      })
  
      if (this.props.loggedIn) {
        this.setState({
          fname: currentUser.fname,
          lname: currentUser.lname,
          email: currentUser.email,
          phone_number: currentUser.phone_number,
          user_id: currentUser.id
        })
        fetchReservations(currentUser.id);
      };
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.loggedIn === false && nextProps.currentUser != undefined) {
      nextProps.fetchReservations(nextProps.currentUser.id);

      return ({ 
        "loggedIn": true,
        "fname": nextProps.currentUser.fname,
        "lname": nextProps.currentUser.lname,
        "email": nextProps.currentUser.email,
        "phone_number": nextProps.currentUser.phone_number,
        "user_id": nextProps.currentUser.id
      })
    }
    return null
  }
  
  modalTrigger(action) {
    return () => {
      this.props.openModal(action);
    }
  }

  checkInputError() {
    let errorStateKeys = Object.keys(this.state.inputErrors)
    const newErrorsState = {};
    const newStateVals = [];

    if (this.props.loggedIn) {
      errorStateKeys = [errorStateKeys.pop()]
    }

    errorStateKeys.forEach(type => {
      if (this.state[type] === "") {
        newErrorsState[type] = true;
        newStateVals.push(true);
      } else if (type === "email" && !this.validateEmail(this.state[type])) {
        newErrorsState[type] = true;
        newStateVals.push(true);
      } else {
        newStateVals.push(false);
      }
    });

    if (newStateVals.includes(true)) {
      this.setState({ inputErrors: newErrorsState });        
    } 
    return newStateVals;
  }

  errorMessage(type) {
    const val = {
      "fname": "First name",
      "lname": "Last name",
      "phone_number": "Phone number",
      "email": "Email"
    }

    if (this.state[type] === "") {
      return val[type].concat(" is required.");
    } else if (type === "email" && !this.validateEmail(this.state[type])) {
      return "Please enter a valid email address."
    }
  }

  validateEmail(inputText) {
    var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (inputText.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  }

  inputVisited(e) {
    this.setState({ visited: true })
  }

  past(reservations) {
    const {loggedIn} = this.state;
    let past = [];

    if (loggedIn) {
      for (let resId in reservations) {
        let res = reservations[resId];
        let hours = res.time.slice(0, -5);
        let period = res.time.slice(-2);
        if (res.time === "12:00AM") {
          hours = 0;
        } else if (period === "PM") {
          hours = 12 + parseInt(hours);
        } else {
          hours = parseInt(hours);
        }

        let currDate = new Date();
  
        if (res.date < currDate) {
          past.push(res);
        }
      };
  
      past.sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        } else {
          return -1;
        }
      });
    }

    return past;
  }

  update(e) {
    const field = e.target.name;
    this.setState({
      [field]: e.target.value, 
      "changed": true,
      "userExists": false
    });
  
    if (e.target.value.length === 0) {
      this.setState({
        inputErrors: {
          ...this.state.inputErrors,
          [field]: true
        }
      });
    } else if (e.target.name === "email" && !this.validateEmail(e.target.value) && this.state.visited) {
      this.setState({
        inputErrors: {
          ...this.state.inputErrors,
          [field]: true
        }
      });
    } else {
      this.setState({
        inputErrors: {
          ...this.state.inputErrors,
          [field]: false
        }
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const errorVals = this.checkInputError();
    if (errorVals.includes(true)) {
      return
    }

    const { time, date, partySize, reservations, currentUser, loggedIn, modify, modifyRes, createReservation, updateReservation, updateUser } = this.props
    const reservation = {
      time: time,
      date: date,
      party_size: partySize,
      occasion: this.state.occasion,
      special_request: this.state.special_request,
      venue_id: this.state.venue_id
    }
    const past = this.past(reservations);

    this.setState({ res: reservation });

    if (loggedIn) {
      reservation.user_id = this.state.user_id
    }

    if (modify) {
      let modified = Object.assign({}, modifyRes, reservation)

      updateReservation(modified).then(data => {
        localStorage.removeItem(`search-params`);
        const resId = data.reservation.id;
        const user = {
          ...currentUser,
          "phone_number": this.state.phone_number
        }

        if (this.state.changed) {
          updateUser(user)
        }

        this.props.history.replace({
          pathname: `/reservations/${resId}`,
          state: {
            past: past
          }
        })
      }, err => {
        this.handleSubmitErrors(err);
      }
      );;
    } else {
      createReservation(reservation).then(data => {
        localStorage.removeItem(`search-params`);
        const resId = data.reservation.id;
        const user = {
          ...currentUser, 
          "phone_number": this.state.phone_number
        }
  
        if (this.state.changed) {
          updateUser(user)
        }
  
        this.props.history.replace({
          pathname: `/reservations/${resId}`,
          state: {
            past: past
          }
        })
      }, err => {
          this.handleSubmitErrors(err);
        }
      );
    }
  }

  handleSubmitErrors(err) {
    const user = {
      username: `${[this.state.fname]} ${[this.state.lname]}`,
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      phone_number: this.state.phone_number
    };
    const data = {
      res: this.state.res, 
      user: user
    };

    switch (err.errors[0]) {
      case "User has already been taken":
        const currentUser = {
          ...this.props.currentUser, 
          ...user
        };
        this.props.updateUser(currentUser);
        this.props.fetchReservations(currentUser.id).then(() => {
          this.props.openModal("res");
        })
        break;
        case "User must exist":
          this.props.signup(user).then( (data) => {
          
          }, errors => {
            if (errors.errors[0] === "Email has already been taken") {
              this.setState({
                userExists: true
              })
            } else if (errors.errors[0] === "Password digest can't be blank") {
              this.props.openModal("res-signup", data);
            }
          })
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
              this.state.inputErrors.phone_number ? "input-error":""
            }`}>
              <input 
                name="phone_number"
                className="res-input-field" 
                type="text" 
                placeholder="Phone Number" 
                onChange={this.update} 
                defaultValue={this.state.phone_number} 
              />
              <div className={`input-error-message ${
                this.state.inputErrors.phone_number ? "" : "hidden"
              }`}>{this.errorMessage("phone_number")}</div>
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
              this.state.inputErrors.fname ? "input-error" : ""
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
                this.state.inputErrors.fname ? "" : "hidden"
              }`}>{this.errorMessage("fname")}</div>
            </div>
            <div className={`input-field ${
              this.state.inputErrors.lname ? "input-error" : ""
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
                this.state.inputErrors.lname ? "" : "hidden"
              }`}>{this.errorMessage("lname")}</div>
            </div>
          </div><br/>
          <div className="res-input-row">
            <div className={`input-field ${
              this.state.inputErrors.phone_number ? "input-error" : ""
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
                this.state.inputErrors.phone_number ? "" : "hidden"
              }`}>{this.errorMessage("phone_number")}</div>
            </div>
            <div className={`input-field ${
              this.state.inputErrors.email ? "input-error" : ""
            }`}>
              <input 
                name="email"
                className="res-input-field" 
                type="email" 
                placeholder="Email" 
                onChange={this.update}
                onBlur={this.inputVisited}
                defaultValue=""
              />
              <div className={`input-error-message ${
                this.state.inputErrors.email ? "" : "hidden"
              }`}>{this.errorMessage("email")}</div>
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
    const { minutes, seconds, userExists } = this.state;
    const { time, partySize, venue, loggedIn, modify } = this.props;

    if (!venue) {
      return <div></div>
    } else {
      let date = this.props.date.toString().split(" ").slice(0, 3);
      let dateFront = [date.slice(0, -1).join(', ')];
      date = dateFront.concat([date[2]]).join(" ");
      
      return (
        <div>
          <section className="res-create-container">
            <div className="res-form-container">
              <span>{modify ? "Modify your reservation" : "You're almost done!"}</span>
              <div className="res-left-header">
                <div className='res-img'></div>
                <div>
                  <p className="res-venue-name">{venue.name}</p>
                  <div className="res-details">
                    <div>
                      <i id="date" className="far fa-calendar"></i>
                      &nbsp;&nbsp;{date}
                    </div>
                    <div>
                      <i id="ticker" className="far fa-clock"></i>
                      &nbsp;&nbsp;{time.slice(0, -2)} {time.slice(-2)}
                    </div>
                    <div>
                      <i id="user-icon" className="far fa-user"></i>
                      &nbsp;&nbsp;{partySize}
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
  
              <div className={`res-user-exists ${userExists ? "" : "hidden"}`}>This email address is already registered. Please sign in to complete your reservation.</div>
              
              <form className="res-form" onSubmit={this.handleSubmit} noValidate>
                <>{loggedIn ? this.loggedInComponent() : this.loggedOutComponent()}</>
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
              <div>A note from {venue.name}</div>
              <p>Thank you for making your reservation at {venue.name}. Please note that we try our best to accommodate all reservations as received; however we cannot guarantee seating in any specific room unless specified and agreed upon. Kindly call if you are delayed 30 minutes after your reservation time. Furthermore, if you do not see your preferred time slot, please call us at {this.props.venue.phone_number}; we will try our best to accommodate you!</p>
            </div>
          </section>
        </div>
      );
    }
  }
}

export default withRouter(ReservationForm);