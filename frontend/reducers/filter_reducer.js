import { UPDATE_FILTER, REMOVE_FILTER, REMOVE_ALL_FILTERS } from '../actions/filter_actions';

const filtersReducer = (state = {}, action) => {
  Object.freeze(state);
  
  switch (action.type) {
    case UPDATE_FILTER:
      let filterVal = state[action.filter];
      filterVal.push(action.value);
      const newFilter = {
        [action.filter]: filterVal
      };
      return Object.assign({}, state, newFilter);
    case REMOVE_FILTER:
      let removedVal = state[action.filter].filter(val => val != action.value);
      const removedFilter = {
        [action.filter]: removedVal
      };
      return Object.assign({}, state, removedFilter);
    case REMOVE_ALL_FILTERS:
      let clearedFilter = {
        'City': [],
        'Price': [],
        'Genre': []
      };
      return Object.assign({}, clearedFilter);
    default:
      return state;
  }
};

export default filtersReducer;
