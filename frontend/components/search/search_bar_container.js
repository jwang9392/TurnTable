import { connect } from "react-redux";
import { searchVenues } from "../../actions/venue_actions"
import { parseHash } from '../../util/util';
import { withRouter } from 'react-router-dom';
import SearchBar from "./search_bar";

const mapStateToProps = (state, ownProps) => {
  const parsedHash = parseHash(ownProps.location.hash)
  const dateParts = parsedHash["date"].split("-");
  const resDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
  
  return {
    date: resDate,
    time: parsedHash.time,
    partySize: parsedHash.partySize
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    processSearch: (searchParams) => dispatch(searchVenues(searchParams)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));