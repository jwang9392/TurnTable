import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchIndex from './search_index';
import { openModal } from '../../actions/modal_actions';
import { deleteFilter, updateFilter, deleteAllFilters } from "../../actions/filter_actions";
import { searchVenues } from "../../actions/venue_actions"



const mapStateToProps = ( state, ownProps) => {
  return {
    searchQuery: ownProps.location.search.slice(1),
    searchHash: ownProps.location.hash,
    venues: state.entities.venues,
    reservations: state.entities.reservations,
    filters: state.ui.filter
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
