import { connect } from "react-redux";
import { searchVenues } from "../../actions/venue_actions"
import { deleteAllFilters } from "../../actions/filter_actions"
import SearchForm from "./search_form";

const mapStateToProps = ({ entities, session }) => {
  let storedParams = JSON.parse(localStorage.getItem(`search-params-${session.currentUserId}`));
  
  return {
    currentUser: entities.users[session.currentUserId], 
    date: storedParams ? new Date(storedParams.date) : new Date(), 
    time: storedParams ? storedParams.time : "9:00PM",
    partySize: storedParams ? storedParams.partySize : 2
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    processSearch: (searchParams) => dispatch(searchVenues(searchParams)),
    clearFilters: () => dispatch(deleteAllFilters())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);