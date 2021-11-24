import React from 'react';
import SearchFields from '../search/search_fields';
import ReservationTimes from '../reservations/reservation_times_container'

class ReservationUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      time: "",
      partySize: "",
      newParams: {}, 
      show: false
    };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { reservations, resId, fetchReservation, fetchVenue } = this.props;

    if (!reservations[resId]) {
      fetchReservation(resId).then(data => {
        let res = data.reservation;
        fetchVenue(res.venue_id);
        this.setState({
          date: new Date(res.date + " 00:00"),
          time: res.time,
          partySize: res.party_size
        })
      });
    } else {
      let res = reservations[resId];
      this.setState({
        date: new Date(res.date + " 00:00"),
        time: res.time,
        partySize: res.party_size
      });
    }
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
    const { date, time, partySize } = this.state;
    let newParams = {
      date, time, partySize
    };
    this.setState({
      newParams, 
      show: true
    });
  }

  render() {
    const { reservations, venues, resId } = this.props;

    if (!reservations[resId] || !venues[reservations[resId].venue_id]) {
      return <div></div>
    } else {
      const { date, time, partySize, newParams } = this.state;
      const res = reservations[resId];
      const venue = venues[res.venue_id];
      const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      
      let dateObj = new Date(res.date + " 00:00");
      let dateParts = dateObj.toString().split(" ").slice(0, 3);
      let dateFront = [dateParts.slice(0, -1).join(', ')];
      let dateStr = dateFront.concat(parseInt(dateParts[2])).join(" ");

      let tomorrow = new Date(date);
      tomorrow.setDate(tomorrow.getDate() + 1);
      let twoDays = new Date(tomorrow);
      twoDays.setDate(tomorrow.getDate() + 1);

      return (
        <div className="res-modify">
          <div className="res-modify-container">
            <div className="res-modify-body">
              <h4 className="res-modify-header">Your current reservation</h4>
              <div className="res-modify-info">
                <div className="res-modify-image"></div>
                <div>
                  <h2 className="res-modify-venue-name">{venue.name}</h2>
                  <div className="res-details">
                    <div>
                      <i id="date" className="far fa-calendar"></i>
                      &nbsp;&nbsp;{dateStr}
                    </div>
                    <div>
                      <i id="ticker" className="far fa-clock"></i>
                      &nbsp;&nbsp;{res.time.slice(0, -2)} {res.time.slice(-2)}
                    </div>
                    <div>
                      <i id="user-icon" className="far fa-user"></i>
                      &nbsp;&nbsp;{res.party_size}
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="res-modify-header">Modify your reservation</h4>
              <div>
                <form className="res-modify-form" onSubmit={this.handleSubmit}>
                  <SearchFields
                    date={date}
                    time={time}
                    partySize={partySize}
                    update={this.update}
                    handleChange={this.handleChange}
                    modify={true}
                  />
                  <button className="search-submit">Find a new table</button>
                </form>
              </div>
              {
                this.state.show && 
                <>
                  <div className="modify-times">
                    <ReservationTimes 
                      venueId={res.venue_id}
                      date={newParams.date}
                      time={newParams.time}
                      res={res}
                      partySize={newParams.partySize}
                      modify={true}
                      size={"large"}
                    />
                  </div>
                  <h4 className="res-modify-header">Similar times based on your original reservation</h4>
                  <div className="res-modify-future">
                    <p>{dayOfWeek[tomorrow.getDay()] + ", " + tomorrow.toString().slice(4, 7) + " " + tomorrow.getDate()}</p>
                    <div className="res-modify-future-timeslots">
                      <ReservationTimes
                        venueId={res.venue_id}
                        date={tomorrow}
                        time={newParams.time}
                        res={res}
                        partySize={newParams.partySize}
                        modify={true}
                        size={"small"}
                      />
                    </div>
                  </div>
                  <div className="res-modify-future">
                    <p>{dayOfWeek[twoDays.getDay()] + ", " + twoDays.toString().slice(4, 7) + " " + twoDays.getDate()}</p>
                    <div className="res-modify-future-timeslots">
                      <ReservationTimes
                        venueId={res.venue_id}
                        date={twoDays}
                        time={newParams.time}
                        res={res}
                        partySize={newParams.partySize}
                        modify={true}
                        size={"small"}
                      />
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      )
    }
  }
}

export default ReservationUpdate;