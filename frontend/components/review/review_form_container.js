import { connect } from "react-redux";
import { openModal } from '../../actions/modal_actions';
import { createReview } from '../../actions/review_actions';
import ReviewForm from "./review_form";

const mapStateToProps = ({entities, session}, ownProps) => {
  const resId = ownProps.match.params.venue_id.split("&")[1].split("=")[1];
  const revKey = "revKey-" + resId + "-" + session.currentUserId;
  let venue;
  let res;
  
  if (ownProps.location.state && !localStorage.getItem(revKey)) {
    localStorage.setItem(revKey, JSON.stringify(ownProps.location.state));
    venue = ownProps.location.state.venue;
    res = ownProps.location.state.res;
  } else if (!ownProps.location.state) {
    let storedRes = JSON.parse(localStorage.getItem(revKey));
    venue = storedRes.venue;
    res = storedRes.res;
  } else {
    venue = ownProps.location.state.venue;
    res = ownProps.location.state.res;
  }
  
  return {
    user: entities.users[session.currentUserId],
    venue: venue, 
    res: res
  }
}

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal)), 
  createReview: review => dispatch(createReview(review))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)