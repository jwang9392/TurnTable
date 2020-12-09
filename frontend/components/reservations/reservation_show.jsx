import React from 'react';

class ReservationShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    
    return (
      <div className="res-show-body">

        <div className="res-show-header">
          <div className="res-confirm-success">
            <i className="fas fa-check-circle"></i>
            <div>
              <p>Thanks! Your reservation is confirmed.</p>
              <span>Confirmation #10519</span>
            </div>
          </div>
          <div className="res-show-detail-container">
            <div className="res-show-detail">
              <div className="res-show-rest-img"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default ReservationShow;