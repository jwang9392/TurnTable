import { searchVenues } from '../util/venue_api_util';

export const UPDATE_FILTER = 'UPDATE_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';

export const changeFilter = (filter, value) => ({
  type: UPDATE_FILTER,
  filter,
  value
});

export const removeFilter = (filter, value) => ({
  type: REMOVE_FILTER, 
  filter, 
  value
})

export const updateFilter = (filter, value) => (dispatch, getState) => {
  dispatch(changeFilter(filter, value));
};

export const deleteFilter = (filter, value) => (dispatch) => {
  dispatch(removeFilter(filter, value));
}