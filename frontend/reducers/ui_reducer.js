import { combineReducers } from 'redux';

import modal from './modal_reducer.js';
import filter from './filter_reducer.js';

export default combineReducers({
  modal,
  filter
});
