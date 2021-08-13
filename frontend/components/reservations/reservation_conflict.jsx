import React from 'react';

class ReservationConflict extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn
    }

    this.handleKeep = this.handleKeep.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleKeep(e) {
    e.preventDefault();

    this.props.closeModal();
    this.props.history.goBack();
  }

  handleChange(e) {
    e.preventDefault();

    const reservation = {
      time: this.props.time,
      date: this.props.date,
      party_size: this.props.newPartySize,
      venue_id: this.props.newVenue.id,
    };

    if (this.props.loggedIn) {
      reservation.user_id = this.props.currentUser.id
    }
    
    this.props.closeModal();
    this.props.deleteReservation(this.props.oldRes.id);
    
    setTimeout(() => { 
      this.props.createReservation(reservation).then(data => {
        const resId = data.reservation.id;

        this.props.history.push(
          `/reservations/${resId}`
        )
      });
    }, 50);
  }

  render() {
    const dateObj = new Date(this.props.date).toString().split(" ");
    const dateStr = dateObj[0].concat(", " + dateObj[1] + " " + dateObj[2]);

    return (
      <div className="conflict-modal">
        <h3>You already have a reservation at this time</h3>
        <p>Looks like you have a reservation at {this.props.oldVenue.name} at {this.props.time}.</p>
        <p>Do you want to keep this reservation or book a new reservation instead?</p>
        <div className="conflict-res">
          <div className="old-res">
            <h3>{this.props.oldVenue.name}</h3>
            <div className="res-conflict-detail">
              <div>
                <i id="date" className="far fa-calendar"></i>
                    &nbsp;&nbsp;{dateStr}
              </div>
              <div>
                <i id="ticker" className="far fa-clock"></i>
                    &nbsp;&nbsp;{this.props.time}
              </div>
              <div>
                <i id="user-icon" className="far fa-user"></i>
                    &nbsp;&nbsp;{this.props.oldRes.party_size}
              </div>  
            </div>
            <button onClick={this.handleKeep}>Keep</button>
          </div>
          <div className="new-res">
            <h3>{this.props.newVenue.name}</h3>
            <div className="res-conflict-detail">
              <div>
                <i id="date" className="far fa-calendar"></i>
                    &nbsp;&nbsp;{dateStr}
              </div>
              <div>
                <i id="ticker" className="far fa-clock"></i>
                    &nbsp;&nbsp;{this.props.time}
              </div>
              <div>
                <i id="user-icon" className="far fa-user"></i>
                    &nbsp;&nbsp;{this.props.newPartySize}
              </div>  
            </div>
            <button onClick={this.handleChange}>Continue</button>
          </div>
        </div>
      </div>
    )
  }
};

export default ReservationConflict;