import React from 'react';
import { withRouter } from 'react-router-dom';
import ProfileItemContainer from './profile_item_container';

const ProfileReservation = (props) => {
  const { reservations } = props
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
    res["dateTime"] = resDate;

    if (resDate >= currDate) {
      upcoming.push(res);
    } else {
      past.push(res);
    }
  };

  upcoming.sort((a, b) => {
    if (a.dateTime < b.dateTime) {
      return -1;
    } else {
      return 1;
    }
  });
  
  past.sort((a, b) => {
    if (a.dateTime < b.dateTime) {
      return 1;
    } else {
      return -1;
    }
  });
  
  const createItemList = (resList, type) => {
    let resItems;

    if (type === "upcoming") {
      resItems = resList.map(res => {
        return (
          <ProfileItemContainer 
            key={res.id}
            type="upcoming"
            reservation={res}
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
          />
        );
      })
    }

    return resItems;
  };

  return (
    <>
      <ul className="upcoming-res">
        <h1>Upcoming Reservations</h1>
        {upcoming.length ? createItemList(upcoming, "upcoming") : ""}
      </ul>
      <ul className="past-res">
        <h1>Past Reservations</h1>
        {past.length ? createItemList(past, "past") : ""}
      </ul>
    </>
  );

}


export default withRouter(ProfileReservation);