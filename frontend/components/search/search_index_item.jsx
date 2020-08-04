import React from 'react';
import { Link, withRouter} from 'react-router-dom';
import ReservationTimes from '../reservations/reservation_times_container';

const SearchIndexItem = (props) => {
  const { venue } = props
  const numBooked = Math.ceil(Math.random() * 100);

  return (
    <li className="search-item" key={venue.id}>
      <Link to={`/venues/${venue.id}`}>
        <div className='venue-search-image'></div>
      </Link>
      <div className="search-venue-details">
        <Link className="venue-name" to={`/venues/${venue.id}`}>
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
        <div className="times-booked">
          <i className="fas fa-chart-line"></i>
          {` Booked ${numBooked} times today`}
          {/* PLACEHOLDER */}
        </div>
        <div className="timeslots">
          <ReservationTimes venueId={venue.id}/>
        </div>
      </div>
    </li>
  );

}


export default withRouter(SearchIndexItem);