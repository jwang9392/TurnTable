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
    <div>logged in!!!</div>
  }

  loggedOutComponent() {
    <div>logged out!!!</div>
  }

  render() {
debugger
    return (
      <section className="create-reservation-container">
        <h1>You're almost done!</h1>
        <div>
          <div id="RESERVATION IMAGE"></div>
          <h4 className="res-venue-name">{this.props.venue.name}</h4>
        </div>
        <form>
          {this.loggedInComponent()}
          <div className="mail-options">
            
              <div>Sign me up to receive offers and news from this venue by email</div>
            
            
              <div>Yes, I want to get text updates and reminders about my reservations</div>
            
          </div>
        </form>
      </section>
    );
  }
}

export default CreateReservationForm;