import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ReservationTimes from '../reservations/reservation_times_container';
import { makeTimeOptions } from '../../util/util';
import { fetchVenues } from '../../actions/venue_actions';

class VenueShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false,
      date: props.date,
      time: props.time,
      partySize: props.partySize
    }
    this.scroll = this.scroll.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  partySizeOptions = () => {
    return Array.from(Array(21).keys()).slice(1).map(n => {
      return <option key={n} value={n}>For {n}</option>;
    })
  }

  update(field) {
    return e => this.setState({
      [field]: e.target.value
    });
  }

  handleDateChange(date) {
    return this.setState({
      "date": date
    })
  }

  createPercent = () => {
    const { venue } = this.props; 
    return venue.review_average.length === 0 ? 0 : parseFloat(venue.review_average[0].avg) / 5 * 100
  }

  scroll(e) {
    e.preventDefault()
    
    if (e.target.value === "Overview") {
      window.scrollTo({
        top: 544,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: 600,
        left: 0,
        behavior: 'auto'
      });
      let el = document.getElementById(e.target.value);
      let scrollHeight = el.getBoundingClientRect().top + window.pageYOffset - 50;
      window.scrollTo({
        top: scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  handleScroll() {
    let mounted = true;

    if (mounted) {
      let y = window.scrollY;
  
      setTimeout(() => {
        if (y > 543) {
          this.setState({ scrolled: true });
        } else {
          this.setState({ scrolled: false });
        }
      }, 1000)
    }

    return () => mounted = false;
  }

  handleClick() {
    this.setState({scrolled: false})
  }

  componentDidMount() {
    const { venueId, venue, fetchVenue } = this.props;

    if (!venue) {
      fetchVenue(venueId);
    }

    scrollTo(0, 0);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  dateDisplay = date => {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = date.getDay();
    let month = date.getMonth() + 1;
    let dayNum = date.getDate()
    
    return days[day] + ", " + month + "/" + dayNum
  } 

  render() {
    const { venueId, venue, time } = this.props;


    if (!venue) {
      return <div></div>
    } else {
      const hasReviews = venue.review_average.length != 0;
      const rating = venue.review_average.length === 0 ? 0 : venue.review_average[0].avg;
      const count = venue.review_average.length === 0 ? 0 : venue.review_average[0].count;

      return (
        <div>
          <div id="splash" className="venue-splash">
            {/* favorite button here pos abs */}
          </div>
          <div className="venue-info">
            <div className="venue-info-columns">
              <div className="venue-info-main">
                <div className="venue-main-header">
                  <div className="venue-header-info">
                    <input type="button" onClick={this.scroll} value="Overview" />
                    <input type="button" onClick={this.scroll} value="Photos" />
                    <input type="button" onClick={this.scroll} value="Reviews" />
                  </div>
                </div>
                <div className="venue-main-body">
                  <div className="spacer-top"></div>
                  <div id="Overview" className="venue-overview">
                    <div className="venue-overview-name">
                      <h2>{venue.name}</h2>
                    </div>
                    <div className="venue-overview-desc">
                      <div>
                        {rating > 0 ? <span className="score"><span style={{ width: `${this.createPercent()}%` }}></span></span> : <div/>}
                        <span>{rating > 0 ? rating : ""}</span>
                        <i className="filter-icon far fa-comment-alt"></i>
                        <span>{count > 0 ? count : "No"} Reviews</span>
                      </div>
                      <div>
                        <i className="filter-icon fas fa-money-bill-alt"></i>
                        <span>{venue.price}</span>
                      </div>
                      <div>
                        <i className="filter-icon fas fa-headphones"></i>
                        <span>{venue.genre}</span>
                      </div>
                    </div>
                  </div>
                  <p id="Description">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                  <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                  <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                  <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                  <div id="Photos">
                    PHOTOS
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                  </div>
                  <div id="Reviews">
                    REVIEWS
                  </div>
                </div>
              </div>
              <div className="venue-info-sidebar">
                <div className="sidebar-header">
                  <h4>Make a reservation</h4>
                  <div className={this.state.scrolled ? "hidden" : "sidebar-long"}>
                    <div>
                      <div className="sidebar-selector sidebar-top">
                        <div>Party Size</div>
                        <div>
                          <select id="party-selector" defaultValue={this.state.partySize}
                            onChange={this.update("partySize")}>
                            {this.partySizeOptions()}
                          </select>
                          <i className="fas fa-chevron-down"></i>
                        </div>
                      </div>
                      <div className="sidebar-bot">
                        <div className="sidebar-selector">
                          <div>Date</div>
                          <div>
                            <DatePicker
                              className="sidebar-datepicker datepicker"
                              useWeekdaysShort={true}
                              onFocus={e => e.target.blur()}
                              dateFormat="MMM d, yyyy"
                              selected={this.state.date}
                              minDate={new Date()}
                              onChange={this.handleDateChange}
                            />
                            <i className="fas fa-chevron-down"></i>
                          </div>
                        </div>
                        <div className="sidebar-selector">
                          <div>Time</div>
                          <div>
                            <select id="time-selector" defaultValue={this.state.time === "" ? time : this.state.time}
                              onChange={this.update("time")}>
                              {makeTimeOptions()}
                            </select>
                            <i className="fas fa-chevron-down"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div onClick={this.handleClick} className={this.state.scrolled ? "sidebar-short" : "hidden"}>
                    <div>For {this.state.partySize} people on {this.dateDisplay(this.state.date)}</div>
                    <i className="fas fa-edit"></i>
                  </div>
                  <div className="sidebar-times">
                    <span>Select a time:</span>
                    <ReservationTimes 
                      venueId={venueId} 
                      date={this.state.date}
                      time={this.state.time}
                      partySize={this.state.partySize}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="spacer-bot"></div>
        </div>
      )
    }
  }
}

export default VenueShow;