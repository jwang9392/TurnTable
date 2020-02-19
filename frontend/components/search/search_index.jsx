import React from 'react';
import SearchBarContainer from './search_bar_container';
import SearchIndexItem from './search_index_item';
import { Link, withRouter } from 'react-router-dom';

class SearchIndex extends React.Component {

  constructor(props) {
    super(props);
    this.searchParam = this.props.match.params.searchParams;
  }

  render() {
    if (Object.keys(this.props.venues).length < 1) {
      return (
        <div>
          <div id='jw'>NO VENUES</div>
          <SearchBarContainer />
          <div className='search-content-section'>
            <h3>WE DID NOT FIND A MATCH FOR YOUR SEARCH</h3>
            <p>
              Sorry, we couldn't find any results for 
                <span className='noresult-term'> {this.searchParam}</span>
              . Try checking your spelling or using less specific keywords. There are no restaurants with availability within 30 miles of your search.
            </p>
            <button onClick={() => this.props.history.push('/')}>Start Over</button>
          </div>
          <h3>Other Suggestions</h3>
          <p>Browse the list of all New York / Tri-State Area restaurants</p>
          <p>Or deselect any checked filters to broaden your search</p>
        </div>  
      )
    } else {
      const venueLis = Object.values(this.props.venues).map((venue) => {
        return (
          <SearchIndexItem
            key={venue.id}
            venue={venue}
            openModal={this.props.openModal}
          />
        );
      })

      return (
        <div>
          <div id='jw'>YOU GOT VENUES</div>
          <SearchBarContainer />
          <div className='filter-column'></div>
          <ul className='search-result-list'>
            {venueLis}
          </ul>
        </div>
      )
    }
  }

}

export default withRouter(SearchIndex);