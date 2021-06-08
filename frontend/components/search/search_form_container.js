import { connect } from "react-redux";
import { searchVenues } from "../../actions/venue_actions"
import { updateFilter } from "../../actions/filter_actions"
import SearchForm from "./search_form";

const mapDispatchToProps = (dispatch) => {
  return {
    processSearch: (searchParams) => dispatch(searchVenues(searchParams)),
    // updateFilter: (filter, value) => dispatch(updateFilter(filter, value))
  }
}

export default connect(null, mapDispatchToProps)(SearchForm);