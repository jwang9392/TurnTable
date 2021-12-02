import React from "react";
import { withRouter } from 'react-router-dom';


const ReservationTimes = (props) => {
  const { venueId, date, time, res, partySize, modify, size } = props

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

  return (
    <ul>
      {timeslots.map(timeslot => {
        let isAvailable = "";

        if (modify) {
          const resDate = new Date(res.date + " 00:00");

          if (date.toString().slice(0, 15) === resDate.toString().slice(0, 15)) {
            isAvailable = timeslot != res.time;
          } else {
            isAvailable = true;
          }
        }

        const handleClick = () => {
          if (!modify || isAvailable) {
            props.history.replace({
              pathname: `/venues/${venueId}/reservations`,
              state: {
                date,
                time: timeslot,
                partySize,
                modify: modify ? modify : false, 
                res: res
              }
            })
          } else {
            return
          }
        };

        const buttonType = () => {
          if (modify) {
            if (isAvailable) {
              return `modify-timeslot-${size} time-available`
            } else {
              return `modify-timeslot-${size} time-unavailable`
            }
          }
        }
        
        return (
          <li key={timeslot}>
            <button 
              className={buttonType()}
              onClick={handleClick}
            >
              {timeslot.slice(0, -2)} {timeslot.slice(-2)}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default withRouter(ReservationTimes);
