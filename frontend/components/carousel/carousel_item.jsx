import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const CarouselItem = (props) => {
  const { venue, key } = props;

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

  return (
    <li className="carousel-item" key={key}>
      <div className="carousel-item-container">
        <div className='carousel-item-image'></div>
        <div className="carousel-item-body">
          <div className="carousel-item-name">{venue.name}</div>
          <div className="carousel-item-reviews">
            Reviews
          </div>
          <div className="carousel-item-desc">
            {venue.genre} <span> &#183; </span> {createDollars(venue)} <span> &#183; </span> {venue.city}
          </div>
          {todaysReservations()}
        </div>
      </div>
    </li>
  )
}

export default withRouter(CarouselItem);