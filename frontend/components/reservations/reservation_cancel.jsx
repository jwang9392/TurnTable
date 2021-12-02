import React from "react";
import { connect } from 'react-redux';
import { fetchReservation, deleteReservation } from '../../actions/reservation_actions'
import { fetchVenue } from '../../actions/venue_actions'

const ReservationCancel = (props) => {
  const { resId, reservations, venues, fetchReservation, fetchVenue, deleteReservation } = props;

  if (!reservations[resId]) {
    fetchReservation(resId).then(data => {
      let reservation = data.reservation;

      if (!venues[reservation.venue_id]) {
        fetchVenue(reservation.venue_id);
      }
    })
  }

  const convertDate = (date) => {
    let dateText = new Date(date + " 00:00");
    dateText = dateText.toString().slice(0, 15);
    const dateParts = dateText.split(" ");
    return dateParts[0] + ", " + dateParts[1] + " " + dateParts[2] + ", " + dateParts[3];
  }

  const handleClick = () => {
    deleteReservation(resId).then(() => {
      props.history.push("/my/Profile")
    })
  }

  if (!reservations[resId] || !venues[reservations[resId].venue_id]) {
    return <div>yo</div>
  } else {
    let res = reservations[resId];
    let venue = venues[res.venue_id];
    
    return (
      <div className="res-cancel">
        <div className="res-cancel-header">
          <h1>Cancel Your Reservation</h1>
        </div>
        <div className="res-cancel-container">
          <div className="res-cancel-body">
            <div className="res-cancel-venue">
              <div className="res-cancel-image" />
              <div className="res-cancel-venue-desc">
                <h5>GUESTS</h5>
                <h3>{res.party_size} {res.party_size === 1 ? "person" : "people"}</h3>
              </div>
              <div className="res-cancel-venue-desc">
                <h5>DATE</h5>
                <h3>{convertDate(res.date)}</h3>
              </div>
              <div className="res-cancel-venue-desc">
                <h5>TIME</h5>
                <h3>{res.time.slice(0, -2)} {res.time.slice(-2)}</h3>
              </div>
              <div className="res-cancel-venue-desc">
                <h5>RESTAURANT</h5>
                <h3>{venue.name}</h3>
              </div>
            </div>
            <button className="res-cancel-button" onClick={handleClick}>Cancel Reservation</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({entities}, ownProps) => {
  return {
    resId: ownProps.match.params.id,
    reservations: entities.reservations, 
    venues: entities.venues
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchReservation: resId => dispatch(fetchReservation(resId)),
    fetchVenue: venueId => dispatch(fetchVenue(venueId)),
    deleteReservation: (resId) => dispatch(deleteReservation(resId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservationCancel);
