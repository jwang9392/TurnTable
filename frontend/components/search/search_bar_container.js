import { connect } from "react-redux";
import { searchVenues } from "../../actions/venue_actions"
import SearchBar from "./search_bar";

const mapDispatchToProps = (dispatch) => {
  return {
    processSearch: (searchParams) => dispatch(searchVenues(searchParams)),
  }
}

export default connect(null, mapDispatchToProps)(SearchBar);