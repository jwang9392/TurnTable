import React from 'react';
import SearchBarContainer from './search_bar_container';
import SearchIndexItem from './search_index_item';
import FilterForm from './filter_form_container';
import { Link, withRouter } from 'react-router-dom';

class SearchIndex extends React.Component {

  constructor(props) {
    super(props);
    this.searchQuery = props.searchQuery;
    this.searchParam = props.searchParams;
    this.state = {
      venues: props.venues,
    };
    this.createVenueList = this.createVenueList.bind(this);
    this.filter = this.filter.bind(this);
  }

  filter(filterList, type, venues) {
    let filtered = {};
    let currentType, typeFilters;
    if (type === 0) {
      typeFilters = filterList[0];
      currentType = "city";
    } else if (type === 1) {
      typeFilters = filterList[1];
      currentType = "price";
    } else if (type === 2) {
      typeFilters = filterList[2];
      currentType = "genre";
    }

    typeFilters.forEach((filter) => {
      for (let key in venues) {
        if (venues[key][currentType] === filter) {
          filtered[key] = venues[key];
        }
      }
    })

    return filtered;
  }

  createVenueList() {
    let venues = this.state.venues;
    let filterList = Object.values(this.props.filters);
    let filterLen = [].concat(...filterList).length;
    let genreLen = this.props.filters.Genre.length;

    if (filterLen > 0) {
      let filteredVenues = {};
      for (let i = 0; i < filterList.length; i++) {
        let currFilter = this.filter(filterList, i, venues);
        filteredVenues = Object.assign({}, currFilter);
        if (Object.values(filteredVenues).length != 0 || (genreLen != 0 && i === 2)) {
          venues = filteredVenues;
        }
      }
    }
    
    let venueLis = Object.values(venues).map((venue) => {
      return (
        <SearchIndexItem
          key={venue.id}
          venue={venue}
          openModal={this.props.openModal}
        />
      );
    })

    return venueLis;
  }

  render() {
    if (Object.keys(this.state.venues).length < 1) {
      return (
        <div>
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
      return (
        <div>
          <SearchBarContainer />
          <div className="search-columns">
            <div className='filter-column'>
              <FilterForm />
            </div>
            <ul className='search-result-list'>
              {this.createVenueList()}
            </ul>
          </div>
        </div>
      )
    }
  }

}

export default withRouter(SearchIndex);