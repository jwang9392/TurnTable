import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchIndex from './search_index';
import { openModal } from '../../actions/modal_actions';
import { parseHash, formatDate } from '../../util/util';
import { deleteFilter, updateFilter, deleteAllFilters } from "../../actions/filter_actions";
import { searchVenues } from "../../actions/venue_actions"



const mapStateToProps = ( state, ownProps) => {
  const parsedHash = parseHash(ownProps.location.hash)
  const dateParts = parsedHash["date"].split("-");
  const resDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])

  return {
    currentUser: state.entities.users[state.session.currentUserId],
    searchHash: ownProps.location.hash,
    searchQuery: ownProps.location.search.slice(1),
    date: resDate,
    time: parsedHash.time,
    partySize: parsedHash.partySize,
    venues: state.entities.venues,
    reservations: state.entities.reservations,
    filters: state.ui.filter, 
    formatDate: formatDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: modal => dispatch(openModal(modal)),
    updateFilter: (filter, value) => dispatch(updateFilter(filter, value)),
    deleteFilter: (filter, value) => dispatch(deleteFilter(filter, value)),
    clearFilters: () => dispatch(deleteAllFilters()),
    processSearch: (searchParams) => dispatch(searchVenues(searchParams))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchIndex));
