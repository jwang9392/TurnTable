import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ProfileItemContainer from './profile_item_container';

const ProfileReservation = (props) => {
  const { reservations, venues, reviews } = props
  const upcoming = [];
  const past = [];

  for (let resId in reservations) {
    let res = reservations[resId];
    let dateParts = res.date.split("-");
    let hours = res.time.slice(0, -5);
    let period = res.time.slice(-2);
    if (res.time === "12:00AM") {
      hours = 0;
    } else if (period === "PM") {
      hours = 12 + parseInt(hours);
    } else {
      hours = parseInt(hours);
    }
    let resDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hours + 1, 0, 0);
    let currDate = new Date();

    if (resDate >= currDate) {
      upcoming.push(res);
    } else {
      past.push(res);
    }
  };

  upcoming.sort((a, b) => {
    let timeA = a.time.slice(-2) === "PM" ? parseInt(a.time.split(":")[0]) + 12 : a.time.split(":")[0];
    let timeB = b.time.slice(-2) === "PM" ? parseInt(b.time.split(":")[0]) + 12 : b.time.split(":")[0];
    let datePartsA = a.date.split("-");
    let datePartsB = b.date.split("-")
    let dateA = new Date(datePartsA[0], parseInt(datePartsA[1]) - 1, datePartsA[2], timeA)
    let dateB = new Date(datePartsB[0], parseInt(datePartsB[1]) - 1, datePartsB[2], timeB)
    
    if (dateA < dateB) {
      return -1;
    } else {
      return 1;
    }
  });
  
  past.sort((a, b) => {
    let timeA = a.time.slice(-2) === "PM" ? parseInt(a.time.split(":")[0]) + 12 : a.time.split(":")[0];
    let timeB = b.time.slice(-2) === "PM" ? parseInt(b.time.split(":")[0]) + 12 : b.time.split(":")[0];
    let datePartsA = a.date.split("-");
    let datePartsB = b.date.split("-")
    let dateA = new Date(datePartsA[0], parseInt(datePartsA[1]) - 1, datePartsA[2], timeA)
    let dateB = new Date(datePartsB[0], parseInt(datePartsB[1]) - 1, datePartsB[2], timeB)

    if (dateA < dateB) {
      return 1;
    } else {
      return -1;
    }
  });

  const createItemList = (resList, type, reviews, historyList) => {
    let resItems;
    let reviewsObj = {};

    reviews.forEach(review => {
      reviewsObj[review.venue_id] = review; 
    });

    if (type === "upcoming") {
      resItems = resList.map(res => {
        return (
          <ProfileItemContainer 
            key={res.id}
            type="upcoming"
            reservation={res}
            past={historyList}
            venue={venues[res.venue_id]}
          />
        );
      })
    } else {
      resItems = resList.map(res => {
        return (
          <ProfileItemContainer
            key={res.id}
            type="past"
            reservation={res}
            venue={venues[res.venue_id]}
            review={reviewsObj[res.venue_id] ? reviewsObj[res.venue_id] : ""}
          />
        );
      })
    }

    return resItems;
  };

  const emptyRes = type => {
    return (
      <div className="empty-res"> 
        <span>No {type} Reservations </span>
        <Link className="empty-res-link" to="/" >Book a Table.</Link>
      </div>
    )
  }
  
  return (
    <>
      <ul className="upcoming-res">
        <h1>Upcoming Reservations</h1>
        {upcoming.length ? createItemList(upcoming, "upcoming", reviews, past) : emptyRes("Upcoming")}
      </ul>
      <ul id="past"className="past-res">
        <h1>Past Reservations</h1>
        {past.length ? createItemList(past, "past", reviews) : emptyRes("Past")}
      </ul>
    </>
  );

}


export default withRouter(ProfileReservation);