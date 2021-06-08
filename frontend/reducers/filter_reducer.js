import { removeFilter, REMOVE_FILTER, UPDATE_FILTER } from '../actions/filter_actions';

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
    default:
      return state;
  }
};

export default filtersReducer;
