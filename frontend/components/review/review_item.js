import React from "react";

const ReviewItem = (props) => {
  const { review } = props;
  const date = new Date(review.created_at)
  const formattedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

  const createStars = (category) => {
    let rating = review[category];

    return (
      [...Array(5)].map((star, index) => {
        return (
          <span key={"star" + index} className={index < rating ? "star checked" : "star unchecked"}>&#9733;</span>
        );
      })
    )
  }
  
  return (
    <div className="review-item">
      <span>On {formattedDate} you wrote</span>
      <p>{review.review_body}</p>
      <div className="review-item-stars-container">
        <div>
          <label>OVERALL</label>
          <div className="stars">{createStars("overall_rating")}</div>
        </div>
        <div>
          <label>MUSIC</label>
          <div className="stars">{createStars("music_rating")}</div>
        </div>
        <div>
          <label>SERVICE</label>
          <div className="stars">{createStars("service_rating")}</div>
        </div>
        <div>
          <label>AMBIENCE</label>
          <div className="stars">{createStars("ambience_rating")}</div>
        </div>
      </div>
    </div>
  )
}

export default ReviewItem;