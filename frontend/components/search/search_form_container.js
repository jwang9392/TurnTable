import { connect } from "react-redux";
import { searchVenues } from "../../actions/venue_actions"
import { deleteAllFilters } from "../../actions/filter_actions"
import SearchForm from "./search_form";

const mapStateToProps = ({ entities, session }) => {
  return {
    currentUser: entities.users[session.currentUserId]
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    processSearch: (searchParams) => dispatch(searchVenues(searchParams)),
    clearFilters: () => dispatch(deleteAllFilters())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);