import { connect } from "react-redux";
import { searchVenues } from "../../actions/venue_actions"
import { deleteAllFilters } from "../../actions/filter_actions"
import SearchForm from "./search_form";

const mapDispatchToProps = (dispatch) => {
  return {
    processSearch: (searchParams) => dispatch(searchVenues(searchParams)),
    clearFilters: () => dispatch(deleteAllFilters())
  }
}

export default connect(null, mapDispatchToProps)(SearchForm);