import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchIndex from './search_index';
import { openModal } from '../../actions/modal_actions';


const mapStateToProps = ( { entities: { venues } }, ownProps) => {
  debugger

  return {
    venues
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: modal => dispatch(openModal(modal))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchIndex));
