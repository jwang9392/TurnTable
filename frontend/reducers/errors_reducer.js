
import { combineReducers } from "redux";

import session from "./session_errors_reducer";
import venue from "./venue_errors_reducer";

const errorsReducer = combineReducers({
  session,
  venue
});

export default errorsReducer;