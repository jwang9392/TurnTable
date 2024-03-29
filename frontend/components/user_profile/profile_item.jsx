import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ReviewItem from '../review/review_item';

const ProfileItem = (props) => {
  const { venue, reservation, review, type, past } = props
  
  const dateConversion = date => {
    let dateParts = date.split("-");
    let convertedParts = [dateParts[1], dateParts[2], dateParts[0]];
    let converted = convertedParts.join("/");
    return converted;
  }

  const timeConversion = time => {
    let analog = time.slice(0, -2);
    let period = time.slice(-2);
    return analog + " " + period
  }

  const createItemByType = (res, type) => {
    switch (type) {
      case "upcoming":
        return (
          <>
            <div className="profile-item-desc">
              <div>{dateConversion(res.date)} at {timeConversion(res.time)}.</div>
              <div>Table for {res.party_size} {res.party_size != 1 ? "people" : "person"}.</div>
              <div>
                <Link className="profile-res-link" to={{
                  pathname: `/reservations/${res.id}`,
                  state: {
                    past: past
                  }
                }}>
                  View
                </Link>
                <Link to={`/reservations/modify/${res.id}`} className="profile-res-link">Modify</Link>
                <Link to={`/reservations/cancel/${res.id}`} className="profile-res-link">Cancel</Link>
              </div>
            </div>
          </>
        );
      case "past":
        return (
          <>
            <div className="profile-item-date">{dateConversion(res.date)}</div>
            <div className="profile-item-desc">
              <div>Table for {res.party_size} {res.party_size != 1 ? "people" : "person"}.</div>
            </div>
            <div className="review-link-container">
              <Link className="review-link" to={{
                pathname: `/feedback/vi=${venue.id}&rk=${res.id}`,
                state: {
                  venue: venue,
                  res: res, 
                  review
                }
              }}>
                <i className="far fa-comment-alt"></i> {review ? "Edit Review" : "Write Review"}
              </Link>
            </div>
            <div className={review ? "review-item-container" : "hidden"}>
              <ReviewItem
                review={review}
              />
            </div>
          </>
        )
      case "saved":
        break;
    }
  };

  return (
    <li>
      <div className="profile-item-container">
        <div className="profile-item-image"></div>
        <div className="profile-item-content">
          <div className="profile-item-name">{venue.name}</div>
          {createItemByType(reservation, type)}
        </div>
      </div>
    </li>
  );

}


export default withRouter(ProfileItem);