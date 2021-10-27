import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { formatDate } from '../../util/util';

class ReservationShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      presetDate: new Date(),
      presetTime: "9:00PM",
      presetSize: "2"
    };
  }

  componentDidMount() {
    const {presetDate} = this.state;
    const hour = presetDate.toString().slice(16, 18);
    let today = formatDate(presetDate);
    let tomorrow = new Date(presetDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = formatDate(tomorrow);

    if (parseInt(hour) > 21) {
      this.setState({ presetDate: tomorrow })
    } else {
      this.setState({ presetDate: today })
    }
  }

  timeConversion = time => {
    let analog = time.slice(0, -2);
    let period = time.slice(-2);
    return analog + " " + period
  }

  joinedDate = date => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    date = date.slice(0, 10);
    let dateParts = date.split("-");
    let month = months[parseInt(dateParts[1]) - 1];
    
    return `Joined in ${month} ${dateParts[0]}`;
  }

  dinedDate = date => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let dateParts = date.split("-");
    let month = months[parseInt(dateParts[1]) - 1];
    
    return `Dined ${month} ${dateParts[2]}`
  }

  createHistory(past) {
    const { venues } = this.props;
    const { presetDate, presetTime, presetSize } = this.state;

    if (past.length > 3) past = past.slice(0, 3);

    let historyItems = past.map((res) => {
      let venue = venues[res.venue_id];
      
      return (
        <div key={res.id}>
          <div className="history-item">
            <div className="history-item-image"></div>
            <div className="history-item-details">
              <div>{venue.name}</div>
              <div className="history-item-detail">{venue.genre}</div>
              <div className="history-item-detail">{venue.city}</div>
              <div className="history-item-detail">{this.dinedDate(res.date)}</div>
            </div>
          </div>
          <div className="rebook-custom-btn">
            <Link className="history-rebook-btn" to={{
              pathname: `/venues/${venue.id}`,
              state: {
                date: presetDate,
                time: presetTime,
                partySize: presetSize
              }
            }}>
              Book Again
            </Link>
          </div>
        </div>
      )
    })

    return historyItems;
  }
  
  render() {
    const {res, venues, user, past} = this.props;
    const {presetDate, presetTime, presetSize} = this.state;
    const venue = venues[res.venue_id];
    let dateParts = res.date.split("-");
    let date = new Date(...dateParts, 0, 0, 0);
    date = date.toString().split(" ").slice(0, 3);
    let dateFront = [date.slice(0, -1).join(', ')];
    date = dateFront.concat([date[2]]).join(" ");

    return (
      <div className="res-show-body">
        <div className="res-show-columns">
          <div>
            <div className="res-show-header">
              <div className="res-confirm-success">
                <i className="fas fa-check-circle"></i>
                <div>
                  <p>Thanks {user.fname}! Your reservation is confirmed.</p>
                  <span>Confirmation #10519</span>
                </div>
              </div>
              <div className="res-show-detail">
                <div className="res-venue-detail">
                  <div className="res-venue-image"></div>
                  <div className="res-venue-info">
                    <h2>{venue.name}</h2>
                    <div className="res-show-details">
                      <div>
                        <i id="date" className="far fa-calendar"></i>
                        {date}
                      </div>
                      <div>
                        <i id="ticker" className="far fa-clock"></i>
                        {this.timeConversion(res.time)}
                      </div>
                      <div>
                        <i id="user-icon" className="far fa-user"></i>
                        {res.party_size} {res.party_size != 1 ? "people" : "person"}
                      </div>
                    </div>
                    <div className="res-show-links">
                      <Link to="" className="res-show-link">Modify</Link>
                      <Link to="" className="res-show-link">Cancel</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="res-optionals-container">
              <div className="res-optionals-content">
                <h3 className="res-section-header">Reservation details</h3>
                <select name="profile-occasion" id="profile-occasion" className="profile-occasion profile-input">
                  <option defaultValue="">Select an occasion (optional)</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Date Night">Date Night</option>
                  <option value="Business Meal">Business Meal</option>
                  <option value="Celebration">Celebration</option>
                </select>
                <br />
                <textarea 
                  className="profile-special-request profile-input"
                  id="profile-special-request" 
                  placeholder="Add a special request (optional)"
                  type="text" 
                  rows="5" 
                ></textarea>
              </div>
            </div>

            <div className="res-venue-summary-container">
              <div className="res-venue-container">
                <h2 className="res-section-header">{venue.name}</h2>
                <div className="res-venue-summary">
                  <div>{venue.address}</div>
                  <div>{venue.city}, {venue.state}</div>
                  <div>{venue.phone_number}</div>
                </div>
                <Link className="profile-venue-link" to={{
                  pathname: `/venues/${venue.id}`,
                  state: {
                    date: presetDate,
                    time: presetTime,
                    partySize: presetSize
                  }
                }}>
                  View Hours, Transportation, and Other Details
                </Link>
              </div>
            </div>
          </div>
          <div className="res-show-user-container">
              <div className="res-show-user-detail">
                <div className="res-show-user-name">
                  <i id="user-icon" className="far fa-user"></i>
                  <h2>{user.fname} {user.lname}</h2>
                </div>
                <div className="res-show-created">
                  {this.joinedDate(user.created_at)}
                </div>
              </div>
              <div className="res-show-history-sidebar">
                <div className="res-show-history-container">
                  <div>
                    <h3>Your dining history</h3>
                    {/* link */}
                  </div>
                  <div>
                    {this.createHistory(past)}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(ReservationShow);