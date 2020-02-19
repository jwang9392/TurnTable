import React from "react";
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: "",
      date: new Date(),
      time: 21, // ADJUST TIME VALUE 
      partySize: 2
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    debugger
  }

  makeTimeOptions() {
    return Array.from(Array(24).keys()).map(n => {
      if (n === 0) {
        return <option key={n} value={0} >12:00 AM</option>;
      } else if (n < 12) {
        return <option key={n} value={n}>{n}:00 AM</option>
      } else if (n === 12) {
        return <option key={n} value={n}>12:00 PM</option>
      } else {
        return <option key={n} value={n}>{n - 12}:00 PM</option>
      }
    })
  }

  createPartySizeOptions() {
    return Array.from(Array(21).keys()).slice(1).map(n => {
      if (n === 1) {
        return <option key={n} value={n}>{n} person</option>;
      } else {
        return <option key={n} value={n}>{n} people</option>;
      }
    })
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleChange(selectedDate) {
    return this.setState({
      date: selectedDate
    })
  }

  handleSubmit(e) {
    debugger
    e.preventDefault();
    this.props.processSearch(this.state.searchParams).then(() => {
      this.props.history.push({
        pathname: `/search/query`,
        search: `${this.state.searchParams}`,
        state: {
          date: this.state.date,
          time: this.state.time,
          partySize: this.state.partySize
        }
      })
    });
  }

  render() {
    // debugger
    return (
      <div className='search-bar'>
        <form onSubmit={this.handleSubmit}> 
          <label className="reservation-party">
            <select id="party-selector" defaultValue={this.state.partySize}
              onChange={this.update("partySize")}>
              {this.createPartySizeOptions()}
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
                selected={this.state.date}
                onChange={this.handleChange}
              />
            </div>
            <i id='dropdown' className="fas fa-chevron-down"></i>
          </label>
          <label className="reservation-time">
            <select id="time-selector" defaultValue={this.state.time}
              onChange={this.update("time")}>
              {this.makeTimeOptions()}
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