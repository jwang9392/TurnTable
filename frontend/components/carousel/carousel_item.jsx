import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const CarouselItem = (props) => {
  const { venue, key } = props;

  return (
    <li className="carousel-item" key={key}>
      <div className="carousel-item-container">
        <div className='carousel-item-image'></div>
        <div>{venue.name}</div>
        <div>{venue.id}</div>
      </div>
    </li>
  )
}

export default withRouter(CarouselItem);