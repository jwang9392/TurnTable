import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class VenueShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {

    return (
      <div>
        yo
        <button onClick={() => this.props.history.push(`/venues/${this.props.venueId}/reservations`)}>RESERVATION TEST</button>
        <br />
        <span>{this.props.venue.price}</span>
        <br />
        <span>{this.props.venue.genre}</span>
        <br />
        <span>{this.props.venue.city}</span>
      </div>
    )
  }
}

export default VenueShow;