import { RECEIVE_REVIEW_ERRORS, RECEIVE_REVIEWS } from '../actions/review_actions';

const reviewErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_REVIEW_ERRORS:
      return action.errors;
    case RECEIVE_REVIEWS:
      return [];
    default:
      return state;
  }
}

export default reviewErrorsReducer;