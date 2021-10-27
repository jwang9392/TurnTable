import React from 'react';
import ReviewStars from './review_stars';

class ReviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.createRatingTitles = this.createRatingTitles.bind(this)
  }

  createRatingTitles(stars) {
    switch (stars) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3: 
        return "Good";
      case 4: 
        return "Very Good";
      case 5: 
        return "Outstanding";
      default: 
        return ".";
      }
  }

  render() {
    const { 
      handleChange, 
      current_step, 
      overall_rating, 
      music_rating, 
      service_rating, 
      ambience_rating,
      review_body,
      username, 
      user, 
      venue, 
      res,
      openModal
    } = this.props;
    const dateParts = res.date.split("-");
    let date = [dateParts[1], dateParts[2], dateParts[0]].join("/");

    switch (current_step) {
      case 1:
        return (
          <div className="review-page-body">
            <h2>{user.fname}, how was your experience at {venue.name}</h2>
            <p>Rate your dining experience (required)</p>
            <p>Reservation made on {date}</p>
            <div className="review-stars-container">
              <div className="review-stars-titles">
                <div>Overall Rating</div>
                <div>Music Rating</div>
                <div>Service Rating</div>
                <div>Ambience Rating</div>
              </div>
              <div>
                <ReviewStars
                  category="Overall Rating"
                  categoryVal="overall_rating"
                  rating={overall_rating}
                  handleChange={handleChange}
                />
                <ReviewStars
                  category="Music Rating"
                  categoryVal="music_rating"
                  rating={music_rating}
                  handleChange={handleChange}
                />
                <ReviewStars
                  category="Service Rating"
                  categoryVal="service_rating"
                  rating={service_rating}
                  handleChange={handleChange}
                />
                <ReviewStars
                  category="Ambience Rating"
                  categoryVal="ambience_rating"
                  rating={ambience_rating}
                  handleChange={handleChange}
                />
              </div>
              <div className="review-stars-labels">
                <div className={overall_rating === 0 ? "label-hidden" : ""}>{this.createRatingTitles(overall_rating)}</div>
                <div className={music_rating === 0 ? "label-hidden" : ""}>{this.createRatingTitles(music_rating)}</div>
                <div className={service_rating === 0 ? "label-hidden" : ""}>{this.createRatingTitles(service_rating)}</div>
                <div className={ambience_rating === 0 ? "label-hidden" : ""}>{this.createRatingTitles(ambience_rating)}</div>
              </div>
            </div>
          </div>
        );
      case 2: 
        return (
          <div className="review-page-body">
            <h2>Write a review</h2>
            <p>Help diners decide where to eat. Remember to keep it short, simple and specific.</p>
            <div className="review-get-help-container">
              <div className="review-get-help" onClick={() => openModal('rev-get-help')}>
                <i className="far fa-question-circle"></i>
                <div> Need help?</div>
              </div>
            </div>
            <textarea 
              className={review_body.length < 50 ? "review-body input-invalid" : "review-body input-valid"}
              name="review_body" 
              placeholder="Your review must be at least 50 characters" 
              onInput={handleChange}
              maxLength="2000"
              defaultValue={review_body}
            ></textarea>
            <div className="review-characters">
              <div className="review-counter counter-valid">Minimum 50 characters</div>
              <div className="review-counter-container">
                <div className="review-counter counter-valid">
                  <span className={review_body.length < 50 ? "review-counter counter-invalid" : "review-counter counter-valid"}>{review_body.length}</span>
                  <span className="review-counter counter-valid"> / 2000 characters</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="review-page-body">
            <h2>What is your reviews nickname?</h2>
            <p>Your nickname will be published on OpenTable alongside any reviews you create and publish. For privacy reasons, don’t use your full name or email address.</p>
            <div className="custom-input-container">
              <input 
                type="text" 
                name="username" 
                className={username.length < 4 ? "user-invalid" : "user-valid"}
                required spellCheck="false"
                onChange={handleChange}
                defaultValue={username}
                maxLength="24"
              />
              <span className ="placeholder">
              Nickname
              </span>
            </div>
            <div className="review-characters">
              <div className="review-counter-container">
                <span className={username.length < 4 ? "review-counter counter-invalid" : "review-counter counter-valid"}>{username.length}</span>
                <span className="review-counter counter-valid"> / 24 characters</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }
}

export default ReviewPage;