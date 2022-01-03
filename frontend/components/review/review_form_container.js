import { connect } from "react-redux";
import { openModal } from '../../actions/modal_actions';
import { createReview, updateReview } from '../../actions/review_actions';
import { fetchUser } from '../../actions/session_actions';
import ReviewForm from "./review_form";

const mapStateToProps = ({entities, session}, ownProps) => {
  const resId = ownProps.match.params.venue_id.split("&")[1].split("=")[1];
  const revKey = "revKey-" + resId + "-" + session.currentUserId;
  let venue;
  let res;
  let review;
  
  if (ownProps.location.state && !localStorage.getItem(revKey)) {
    localStorage.setItem(revKey, JSON.stringify(ownProps.location.state));
    venue = ownProps.location.state.venue;
    res = ownProps.location.state.res;
    review = ownProps.location.state.review;
  } else if (!ownProps.location.state) {
    let storedRes = JSON.parse(localStorage.getItem(revKey));
    venue = storedRes.venue;
    res = storedRes.res;
    review = storedRes.review
  } else {
    venue = ownProps.location.state.venue;
    res = ownProps.location.state.res;
    review = ownProps.location.state.review;
  }
  
  return {
    user: entities.users[session.currentUserId],
    venue, 
    res, 
    review, 
    revKey
  }
}

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal)), 
  createReview: review => dispatch(createReview(review)),
  updateReview: review => dispatch(updateReview(review)),
  fetchUser: userId => dispatch(fetchUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)