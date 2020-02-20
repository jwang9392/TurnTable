import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class CreateReservationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors;
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
    const reservation = Object.assign({}, this.props.reservation, this.state, {
      date: this.state.date,
      venue_id: this.props.venue.id,
      user_id: this.props.userId
    })

    if (!this.props.reserved) {
      return this.props.create(reservation)
    } else {
      return this.props.edit(reservation)
    }
  }

  loggedInComponent() {
    return (
      <div className="logged-in-res-create">
        
      </div>
    )
  }

  loggedOutComponent() {
    return (
      <div className="logged-out-res-create">
        <div>
          <span>
            <button onClick={this.modalTrigger("login")}>
              Sign in
            </button>{" "}
            or{" "}
            <button onClick={this.modalTrigger("signup")}>
              Sign up
            </button>{" "}
            to make this reservation
          </span>
        </div>
        <div className="res-create-input-fields">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
          <input type="text" placeholder="Phone number" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Select an occasion (optional)" />
          <input type="textarea" placeholder="Add a special request (optional)" />
        </div>
      </div>
    )
  }

  render() {
    return (
      <section className="res-create-container">
        <h1>You're almost done!</h1>
        <div>
          <div id="RESERVATION IMAGE"></div>
          {/* <h4 className="res-venue-name">{this.props.venue.name}</h4> */}
        </div>
        <form>
          <>{this.props.loggedIn ? this.loggedInComponent() : this.loggedOutComponent()}</>
          <div>
            
              <div>Sign me up to receive offers and news from this venue by email</div>
            
            
              <div>Yes, I want to get text updates and reminders about my reservations</div>
            
          </div>
          <button className="submit-res-btn" onClick={this.handleSubmit}>
            Complete reservation
          </button>          
        </form>
      </section>
    );
  }
}

export default CreateReservationForm;