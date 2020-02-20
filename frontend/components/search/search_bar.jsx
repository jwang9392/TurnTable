import React from "react";
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { makeTimeOptions, createPartySizeOptions, formatDate ,parseHash } from '../../util/util';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchParams: "",
      date: "",
      time: "",
      partySize: ""
    };
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
      date: selectedDate
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processSearch(this.state.searchParams).then(() => {
      this.props.history.push(
        `/search/query?${this.state.searchParams}#${formatDate(this.state.date)}#${this.state.time}#${this.state.partySize}`
      )
    });
  }

  render() {
    const parsedHash = parseHash(this.props.location.hash)
    return (
      <div className='search-bar'>
        <form onSubmit={this.handleSubmit}> 
          <label className="reservation-party">
            <select id="party-selector" defaultValue={this.state.partySize === "" ? parsedHash[3] : this.state.partySize}
              onChange={this.update("partySize")}>
              {createPartySizeOptions()}
              <option value="larger">Larger party</option>
            </select>
            <i id='dropdown' className="fas fa-chevron-down"></i>
          </label>
          <label className="reservation-date">
            <div>
              <DatePicker
                className="datepicker"
                useWeekdaysShort={true}
                onFocus={e => e.target.blur()}
                dateFormat="MMM d, yyyy"
                selected={new Date(this.state.date === "" ? parsedHash[1] : this.state.date)}
                onChange={this.handleChange}
              />
            </div>
            <i id='dropdown' className="fas fa-chevron-down"></i>
          </label>
          <label className="reservation-time">
            <select id="time-selector" defaultValue={this.state.time === "" ? parsedHash[2] : this.state.time}
              onChange={this.update("time")}>
              {makeTimeOptions()}
            </select>
            <i id='dropdown' className="fas fa-chevron-down"></i>
          </label>
          <div className="search-field">
            <i className="fas fa-search"></i>
            <input className="search-input"
              value={this.state.searchParams}
              onChange={this.update("searchParams")}
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