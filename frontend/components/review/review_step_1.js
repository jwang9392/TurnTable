import React from 'react';
import ReviewStars from './review_stars';

class ReviewStep1 extends React.Component {
  render() {
    if (this.props.current_step !== 1) {
      return null
    }

    return (
      <div>
        <ReviewStars
          category="Overall Rating"
          categoryVal = "overall_rating"
          handleChange={this.props.handleChange}
        />
        <ReviewStars
          category="Music Rating"
          categoryVal = "music_rating"
          handleChange={this.props.handleChange}
        />
        <ReviewStars
          category="Service Rating"
          categoryVal = "service_rating"
          handleChange={this.props.handleChange}
        />
        <ReviewStars
          category="Ambience Rating"
          categoryVal="ambience_rating"
          handleChange={this.props.handleChange}
        />
      </div>
    )
  }
}

export default ReviewStep1;