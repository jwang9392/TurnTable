import React from "react";
import { withRouter } from 'react-router-dom';


const ReservationTimes = (props) => {
  const times = Array.from(Array(24).keys()).map(n => {
    if (n === 0) {
      return "12:00AM";
    } else if (n < 12) {
      return `${n}:00AM`;
    } else if (n === 12) {
      return "12:00PM";
    } else {3
      return `${n - 12}:00PM`;
    }
  })
  const time = props.location.hash.split("#")[2]
  const currentTimeIdx = times.indexOf(time)
  let timeslots = [];

  if (currentTimeIdx > 1 && currentTimeIdx < 22) {
    timeslots = times.slice(currentTimeIdx - 2, currentTimeIdx + 3);
  } else if (currentTimeIdx >= 0 && currentTimeIdx < 2) {
    let timesBefore = times.slice(24 + currentTimeIdx - 2);
    let timesAfter = times.slice(0, currentTimeIdx + 3);
    timeslots = timesBefore.concat(timesAfter);
  } else if (currentTimeIdx > 21 && currentTimeIdx < 24) {
    let timesBefore = times.slice(currentTimeIdx - 2);
    let timesAfter = times.slice(0, ((currentTimeIdx - 24) + 3));
    timeslots = timesBefore.concat(timesAfter);
  }
debugger
  return (
    <ul>
      {timeslots.map(time => <li key={time}><button onClick={() => props.history.push(`/api/venues/${props.venueId}/reservations`)}>{time}</button></li>)}
    </ul>
  )
}

export default withRouter(ReservationTimes);
