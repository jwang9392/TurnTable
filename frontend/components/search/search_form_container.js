import { connect } from "react-redux";
import { searchVenues } from "../../actions/venue_actions"
import SearchForm from "./search_form";

const mapDispatchToProps = (dispatch) => {
  return {
    processSearch: (searchParams) => dispatch(searchVenues(searchParams)),
  }
}

export default connect(null, mapDispatchToProps)(SearchForm);