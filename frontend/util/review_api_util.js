export const fetchReviews = venueId => {
  return $.ajax({
    method: "GET",
    url: `/api/venues/${venueId}/reviews`,
    data: { venueId }
  })
}

export const createReview = review => {
  return $.ajax({
    method: "POST",
    url: `/api/venues/${review.venue_id}/reviews`,
    data: { review }
  })
}