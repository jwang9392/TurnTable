export const UPDATE_FILTER = 'UPDATE_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const REMOVE_ALL_FILTERS = 'REMOVE_ALL_FILTERS';

const changeFilter = (filter, value) => ({
  type: UPDATE_FILTER,
  filter,
  value
});

const removeFilter = (filter, value) => ({
  type: REMOVE_FILTER, 
  filter, 
  value
})

const removeAllFilters = () => ({
  type: REMOVE_ALL_FILTERS
})

export const updateFilter = (filter, value) => dispatch => {
  dispatch(changeFilter(filter, value));
};

export const deleteFilter = (filter, value) => dispatch => {
  dispatch(removeFilter(filter, value));
}

export const deleteAllFilters = () => dispatch => {
  dispatch(removeAllFilters());
}