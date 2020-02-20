import React from 'react';

export const makeTimeOptions = () => {
  return Array.from(Array(24).keys()).map(n => {
    if (n === 0) {
      return <option key={n} value={"12:00AM"} >12:00 AM</option>;
    } else if (n < 12) {
      return <option key={n} value={`${n}:00AM`}>{n}:00 AM</option>
    } else if (n === 12) {
      return <option key={n} value={"12:00PM"}>12:00 PM</option>
    } else {
      return <option key={n} value={`${n - 12}:00PM`}>{n - 12}:00 PM</option>
    }
  })
}

export const createPartySizeOptions = () => {
  return Array.from(Array(21).keys()).slice(1).map(n => {
    if (n === 1) {
      return <option key={n} value={n}>{n} person</option>;
    } else {
      return <option key={n} value={n}>{n} people</option>;
    }
  })
}