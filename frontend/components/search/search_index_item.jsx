import React from 'react';
import { Link, withRouter} from 'react-router-dom';
import ReservationTimes from '../reservations/reservation_times_container';

const SearchIndexItem = (props) => {
  const { venue, reservations, hash } = props
  const time = hash.split("#")[2];

  let numBooked = 0;
  if (reservations) {
    Object.values(reservations).forEach(reservation => {
      if (reservation.venue_id === venue.id) {
        numBooked++;
      }
    });
  }

  const timesBooked = () => {
    if (numBooked > 0) {
      return (
        <div className="times-booked">
          <i className="fas fa-chart-line"></i>
          {numBooked > 0 ? ` Booked ${numBooked} times today` : ""}
          {/* PLACEHOLDER */}
        </div>
      )
    }
  }

  return (
    <li className="search-item" key={venue.id}>
      <Link to={`/venues/${venue.id}`}>
        <div className='venue-search-image'></div>
      </Link>
      <div className="search-venue-details">
        <Link className="venue-name" to={{
            pathname: `/venues/${venue.id}`, 
            state: {
              timesBooked: numBooked,
              hash
            }
          }}>
          {venue.name}
        </Link>
        <div className="venue-rating">
          {/* <div>
            **RATINGS STARTS**
          </div>
          <div className="rating-count">
            <Link to={`/venues/${venue.id}`}>({venue.reviews_count})</Link>
          </div> */}
          {/* IMPORTANT ADD AFTER CREATING RATINGS ^ */}
        </div>
        <p className="event-subdetail">
          {venue.city}
        </p>
        {timesBooked()}
        <div className="timeslots">
          <ReservationTimes 
            venueId={venue.id} 
            time={time}
            hash={hash}
          />
        </div>
      </div>
    </li>
  );

}


export default withRouter(SearchIndexItem);