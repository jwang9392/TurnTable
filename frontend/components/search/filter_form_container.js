import { connect } from 'react-redux';
import { updateFilter, deleteFilter } from '../../actions/filter_actions';
import FilterForm from './filter_form';

const filters = {
  "City": [
    'New York',
    'Chicago',
    'Los Angeles',
    'San Francisco',
    'Miami',
    'Los Vegas',
    'Houston',
    'Atlanta',
    'Denver',
    'Orlando',
    'Philadelphia',
    'Dallas'
  ],
  "Genre": [
    "Jazz Clubs",
    "Dance Clubs",
    "Live Music Venues",
    "Sports-Themed Clubs",
    "Comedy Club"
  ],
  "Price": [
    "$100 and under",
    "$101 to $400",
    "$401 and over"
  ]
}

const mapStateToProps = (state, ownProps) => {  
  return {
    filters: filters,
    selectedFilters: state.ui.filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateFilter: (filter, value) => dispatch(updateFilter(filter, value)), 
    deleteFilter: (filter, value) => dispatch(deleteFilter(filter, value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);