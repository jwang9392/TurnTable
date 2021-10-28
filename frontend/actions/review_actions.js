import * as ApiUtil from '../util/review_api_util';
export const RECEIVE_REVIEWS = "RECEIVE_REVIEWS";
export const RECEIVE_REVIEW_ERRORS = "RECEIVE_REVIEW_ERRORS";

const receiveReviews = reviews => ({
  type: RECEIVE_REVIEWS,
  reviews
})

const receiveErrors = errors => ({
  type: RECEIVE_REVIEW_ERRORS,
  errors
})


export const fetchReviews = venueId => dispatch => (
  ApiUtil.fetchReviews(venueId).then(
    reviews => dispatch(receiveReviews(reviews)),
    err => (dispatch(receiveErrors(err.responseJSON)))
  )
)

export const fetchUserReviews = userId => dispatch => (
  ApiUtil.fetchUserReviews(userId).then(
    reviews => dispatch(receiveReviews(reviews)),
    err => (dispatch(receiveErrors(err.responseJSON)))
  )
)

export const createReview = review => dispatch => (
  ApiUtil.createReview(review).then(
    review => dispatch(receiveReviews(review.user_id)),
    err => (dispatch(receiveErrors(err.responseJSON)))
  )
)

export const updateReview = review => dispatch => (
  ApiUtil.updateReview(review).then(
    review => dispatch(receiveReviews(review.user_id)),
    err => (dispatch(receiveErrors(err.responseJSON)))
  )
)