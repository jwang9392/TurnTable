import React from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { makeTimeOptions, createPartySizeOptions } from '../../util/util';

const SearchFields = ({ date, time, partySize, handleChange, update }) => {
  return (
    <>
      <div className="reservation-options custom-select">
        <label className="reservation-date" onClick={e => e.preventDefault()}>
          <i id="date" className="far fa-calendar"></i>
          <DatePicker
            className="datepicker"
            useWeekdaysShort={true}
            onFocus={e => e.target.blur()}
            dateFormat="MMM d, yyyy"
            selected={date}
            minDate={new Date()}
            onChange={handleChange}
          />
          <i id='dropdown' className="fas fa-chevron-down"></i>
        </label>
        <label className="reservation-time">
          <i id="ticker" className="far fa-clock"></i>
          <select id="time-selector" value={time}
            onChange={update("time")}>
            {makeTimeOptions()}
          </select>
          <i id='dropdown' className="fas fa-chevron-down"></i>
        </label>
        <label className="reservation-party">
          <i id="user-icon" className="far fa-user"></i>
          <select id="party-selector" value={partySize}
            onChange={update("partySize")}>
            {createPartySizeOptions()}
          </select>
          <i id='dropdown' className="fas fa-chevron-down"></i>
        </label>
      </div>
      <div className="search-field">
        <i className="fas fa-search"></i>
        <input className="search-input"
          onChange={update("searchQuery")}
          placeholder="Location, Venue, or Rating"
        />
      </div>
    </>
  )
}

export default SearchFields;