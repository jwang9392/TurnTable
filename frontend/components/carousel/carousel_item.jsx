import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const CarouselItem = (props) => {
  const { venue, key, idx, type } = props;
  const id = `${type}-carousel-${idx}`;

  const createDate = () => {
    const date = new Date();
    const hour = date.toString().slice(16, 18);
    let tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (parseInt(hour) > 21) {
      return tomorrow;
    } else {
      return date;
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

  const todaysReservations = () => {
    if (venue.reservationsToday > 0) {
      return (
        <div>
          <i className="fas fa-chart-line"></i>
          <span> Booked {venue.reservationsToday} time{venue.reservationsToday > 1 ? "s" : ""} today</span>
        </div>
      )
    }
  }

  const createPercent = () => {
    return venue.review_average.length === 0 ? 0 : parseFloat(venue.review_average[0].avg) / 5 * 100
  }

  return (
    <li id={id} className="carousel-item" key={key}>
      <Link 
        className="carousel-link" 
        to={{
          pathname: `/venues/${venue.id}`,
          state: {
            date: createDate(),
            time: "9:00PM",
            partySize: "2" }
        }}
      >
        <div className="carousel-item-container">
          <div className='carousel-item-image'></div>
          <div className="carousel-item-body">
            <div className="carousel-item-name">{venue.name}</div>
            <div className="carousel-item-reviews">
                <span className="score"><span style={{width: `${createPercent()}%`}}></span></span>
                <span>{venue.review_average[0] ? venue.review_average[0].count : "0"} review{venue.review_average[0] && venue.review_average[0].count === 1 ? "" : "s"}</span>
            </div>
            <div className="carousel-item-desc">
              {venue.genre} <span> &#183; </span> {createDollars(venue)} <span> &#183; </span> {venue.city}
            </div>
            {todaysReservations()}
          </div>
        </div>
      </Link>
    </li>
  )
}

export default withRouter(CarouselItem);