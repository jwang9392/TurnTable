import React from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { makeTimeOptions, createPartySizeOptions } from '../../util/util';

const SearchFields = ({ date, time, partySize, update, handleChange, modify }) => {
  return (
    <>
      <div className={modify ? "reservation-options mod-custom-select" : "reservation-options custom-select"}>
        <label className={modify ? "mod-reservation-date" : "reservation-date"} onClick={e => e.preventDefault()}>
          <i id="date" className="far fa-calendar"></i>
          <DatePicker
            className={modify ? "mod-datepicker" :"datepicker"}
            useWeekdaysShort={true}
            onFocus={e => e.target.blur()}
            dateFormat="MMM d, yyyy"
            selected={date}
            minDate={new Date()}
            onChange={handleChange}
          />
          <i id='dropdown' className="fas fa-chevron-down"></i>
        </label>
        <label className={modify ? "mod-reservation-time" :"reservation-time"}>
          <i id="ticker" className="far fa-clock"></i>
          <select id="time-selector" value={time}
            onChange={update("time")}>
            {makeTimeOptions()}
          </select>
          <i id='dropdown' className="fas fa-chevron-down"></i>
        </label>
        <label className={modify ? "mod-reservation-party" :"reservation-party"}>
          <i id="user-icon" className="far fa-user"></i>
          <select id="party-selector" value={partySize}
            onChange={update("partySize")}>
            {createPartySizeOptions()}
          </select>
          <i id='dropdown' className="fas fa-chevron-down"></i>
        </label>
      </div>
      <div className={modify ? "hidden" : "search-field"}>
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