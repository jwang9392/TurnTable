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
        <button onClick={() => this.props.history.push(`/api/venues/${this.props.venueId}/reservations`)}>RESERVATION TEST</button>
      </div>
    )
  }
}

export default VenueShow;