export const fetchReviews = venueId => {
  return $.ajax({
    method: "GET",
    url: `/api/venues/${venueId}/reviews`,
    data: { venueId }
  })
}

export const fetchUserReviews = userId => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId}/reviews`,
    data: { userId }
  })
}

export const createReview = review => {
  return $.ajax({
    method: "POST",
    url: `/api/venues/${review.venue_id}/reviews`,
    data: { review }
  })
}

export const updateReview = review => {
  return $.ajax({
    method: "PATCH",
    url: `/api/reviews/${review.id}`,
    data: { review }
  })
}
