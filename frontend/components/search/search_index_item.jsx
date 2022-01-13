import React from 'react';
import { Link, withRouter} from 'react-router-dom';
import ReservationTimes from '../reservations/reservation_times_container';

const SearchIndexItem = (props) => {
  const { venue, reservationsToday, date, time, partySize } = props
  const hasReviews = venue.review_average.length != 0;
  const rating = venue.review_average.length === 0 ? 0 : parseFloat(venue.review_average[0].avg);
  const count = venue.review_average.length === 0 ? 0 : parseFloat(venue.review_average[0].count);

  let numBooked = reservationsToday;

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

  const createPercent = () => {
    return hasReviews ? rating / 5 * 100 : 0
  }

  const createLabel = () => {
    switch (Math.ceil(rating)) {
      case 5:
        return <>Exceptional ({count})</>
      case 4: 
        return <>Excellent ({count})</>
      case 3:
        return <>Good ({count})</>
      case 2:
        return <>Fair ({count})</>
      case 1:
        return <>Poor ({count})</>
      default:
        break;
    }
  }

  const createDollars = (venue) => {
    let price = venue.price

    switch (price) {
      case "$100 and under":
        return (
          <span>
            <span>$$</span><span className="cost-light">$$</span>
          </span>
        )
      case "$101 to $400":
        return (
          <span>
            <span>$$$</span><span className="cost-light">$</span>
          </span>
        )
      case "$401 and over":
        return <span>$$$$</span>
      default:
        break;
    }
  }

  return (
    <li className="search-item" key={venue.id}>
      <Link className="venue-name" to={{
        pathname: `/venues/${venue.id}`,
        state: {
          date,
          time,
          partySize
        }
      }}>
        <div className='venue-search-image'></div>
      </Link>
      <div className="search-venue-details">
        <Link className="venue-name" to={{
            pathname: `/venues/${venue.id}`, 
            state: {
              date, 
              time, 
              partySize
            }
          }}>
          {venue.name}
        </Link>
        <div className="venue-rating">
          <span className="review-score"><span style={{ width: `${createPercent()}%` }}></span></span>
          <span className="review-label">{hasReviews ? createLabel() : "(0)"}</span>
        </div>
        <p className="event-subdetail">
          {createDollars(venue)} <span> &#183; </span> {venue.city}
        </p>
        {timesBooked()}
        <div className="timeslots">
          <ReservationTimes 
            venueId={venue.id} 
            date={date}
            time={time}
            partySize={partySize}
          />
        </div>
      </div>
    </li>
  );

}


export default withRouter(SearchIndexItem);