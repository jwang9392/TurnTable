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

export const formatDate = (date) => {
  const mdy = date.toDateString().slice(4).split(" ");
  const months = {
    "Jan": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12"
  };
  const formattedMonth = months[mdy[0]];

  return `${mdy[2]}-${formattedMonth}-${mdy[1]}`
}