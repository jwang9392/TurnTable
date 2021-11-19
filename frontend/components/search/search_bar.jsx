import React from "react";
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { makeTimeOptions, createPartySizeOptions, formatDate } from '../../util/util';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchParam: props.searchParam,
      date: props.date,
      time: props.time,
      partySize: props.partySize
    };
    
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  update(field) {
    return e => this.setState({ 
      [field]: e.target.value 
    });
  }

  handleChange(selectedDate) {
    return this.setState({
      "date": selectedDate
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.clearFilters();
    this.props.processSearch(this.state.searchParam).then(() => {
      this.props.history.push(
        `/search/query?${this.state.searchParam}#${formatDate(this.state.date)}#${this.state.time}#${this.state.partySize}`
      )
    });
  }

  render() {
    return (
      <div className='search-bar'>
        <form onSubmit={this.handleSubmit}> 
          <div className="reservation-options custom-select">
            <label className="reservation-date" onClick={e => e.preventDefault()}>
              <i id="date" className="far fa-calendar"></i>
              <DatePicker
                className="datepicker"
                useWeekdaysShort={true}
                onFocus={e => e.target.blur()}
                dateFormat="MMM d, yyyy"
                selected={this.state.date === "" ? this.props.date : this.state.date}
                onChange={this.handleChange}
              />
              <i id='dropdown' className="fas fa-chevron-down"></i>
            </label>
            <label className="reservation-time">
              <i id="ticker" className="far fa-clock"></i>
              <select id="time-selector" defaultValue={this.state.time === "" ? this.props.time : this.state.time}
                onChange={this.update("time")}>
                {makeTimeOptions()}
              </select>
              <i id='dropdown' className="fas fa-chevron-down"></i>
            </label>
            <label className="reservation-party">
              <i id="user-icon" className="far fa-user"></i>
              <select id="party-selector" defaultValue={this.state.partySize}
                onChange={this.update("partySize")}>
                {createPartySizeOptions()}
              </select>
              <i id='dropdown' className="fas fa-chevron-down"></i>
            </label>
          </div>
          <div className="search-field">
            <i className="fas fa-search"></i>
            <input className="search-input"
              value={this.state.searchParam}
              onChange={this.update("searchParam")}
              placeholder="Location, Venue, or Rating"
            />
          </div>
          <button className="search-submit">Find a Table</button>
        </form>
      </div>
    )
  }
}

export default withRouter(SearchBar);