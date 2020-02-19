import React from 'react';
import { Link } from 'react-router-dom';

const SearchIndexItem = (props) => {
  const { venue } = props

  return (
    <li className="search-item" key={venue.id}>
      <Link to={`/venues/${venue.id}`}>
        <div className='changetovenueimage'></div>
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
          {event.event_city}
        </p>
        <ul className="timeslots">
          {/* RESERVATION COMPONENT GOES HERE */}
        </ul>
      </div>
    </li>
  );

}


export default SearchIndexItem;