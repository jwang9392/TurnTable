import { connect } from "react-redux";
import { searchVenues } from "../../actions/venue_actions"
import Search from "./search";

const mapStateToProps = ({ errors }) => ({
  errors: errors.venue
})

const mapDispatchToProps = (dispatch) => {
  // debugger
  return {
  processSearch: (searchParams) => dispatch(searchVenues(searchParams)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);