import React from 'react';
import { Link, withRouter} from 'react-router-dom';
import ReservationTimes from '../reservations/reservation_times_container';

const SearchIndexItem = (props) => {
  const { venue } = props

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
        <h1 className="event-subdetail">
          {venue.event_city}
        </h1>
        <div className="timeslots">
          <ReservationTimes venueId={venue.id}/>
        </div>
      </div>
    </li>
  );

}


export default withRouter(SearchIndexItem);