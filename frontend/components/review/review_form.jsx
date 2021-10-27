import React from 'react';
import { withRouter } from 'react-router-dom';
import ReviewPage from './review_page'

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_step: 1, 
      overall_rating: 0,
      music_rating: 0, 
      service_rating: 0, 
      ambience_rating: 0, 
      review_body: "", 
      username: props.user.username ? props.user.fname + props.user.lname[0] : ""
    };

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    localStorage.clear();
  }

  next() {
    let current_step = this.state.current_step;
    current_step = current_step >= 2 ? 3 : current_step + 1
    this.setState({
      current_step: current_step
    })
  }

  prev() {
    let current_step = this.state.current_step;
    current_step = current_step <= 1 ? 1 : current_step - 1
    this.setState({
      current_step: current_step
    })
  }

  nextButton() {
    let current_step = this.state.current_step;
    let nextCheck = false;

    const { 
      overall_rating,
      music_rating,
      service_rating,
      ambience_rating, 
      review_body, 
      username
    } = this.state

    switch (current_step) {
      case 1:
        if (overall_rating != 0 && music_rating != 0 && service_rating != 0 && ambience_rating != 0) {
          nextCheck = true;
        }
        break;
      case 2: 
        if (review_body.length >= 50) nextCheck = true;
        break;
      case 3: 
        if (username.length > 3) nextCheck = true;
        break;
    }

    if (current_step === 3) {
      return (
        <button
          className={nextCheck ? "btn btn-review-next" : "btn-review-shaded"}
          type="button"
          onClick={this.handleSubmit}>
          Submit
        </button>
      )
    } else if (current_step < 3) {
      return (
        <button
          className={nextCheck ? "btn btn-review-next" : "btn-review-shaded"}
          type="button"
          onClick={nextCheck ? this.next : null}>
          Next
        </button>
      )
    }

    return null;
  }

  previousButton() {
    let current_step = this.state.current_step;

    if (current_step !== 1) {
      return (
        <button
          className="btn btn-review-prev"
          type="button"
          onClick={this.prev}>
          Back
        </button>
      )
    }
    
    return null;
  }

  handleChange(e) {
    e.preventDefault();
    
    const { name, value, type } = e.currentTarget;
    this.setState({
      [name]: type === 'button' ? parseInt(value) : value
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const { 
      overall_rating,
      music_rating,
      service_rating,
      ambience_rating,
      review_body, 
    } = this.state;
    const { createReview, user, venue } = this.props;

    const review = {
      overall_rating: overall_rating, 
      music_rating: music_rating,
      service_rating: service_rating, 
      ambience_rating: ambience_rating, 
      review_body: review_body, 
      user_id: user.id,
      venue_id: venue.id
    }

    createReview(review).then(data => {
      this.props.history.replace({
        pathname: `/my/Profile`,
        state: {
          past: []
        }
      })
    })
  }

  render() {
    const { 
      current_step, 
      overall_rating, 
      music_rating, 
      service_rating, 
      ambience_rating, 
      review_body, 
      username
    } = this.state;
    const { user, venue, res, openModal } = this.props;
  
    return (
      <form className="review-form" onSubmit={this.handleSubmit}>
        <div className="review-page-indicator">
          {[...Array(3)].map((dot, index) => {
            index += 1;
            return (
              <span key={index} className={index === current_step ? "selected-page dot" : "unselected-page dot"}>&#8226;</span>
            );
          })}
        </div>

        <ReviewPage
          current_step={current_step}
          overall_rating={overall_rating}
          music_rating={music_rating}
          service_rating={service_rating}
          ambience_rating={ambience_rating}
          review_body={review_body}
          username={username}
          handleChange={this.handleChange}
          user={user}
          venue={venue}
          res={res}
          openModal={openModal}
        />
        <div className="review-nav-btn">
          {this.previousButton()}
          {this.nextButton()}
        </div>
      </form>
    );
  }
}

export default withRouter(ReviewForm);