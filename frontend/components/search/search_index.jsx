import React from 'react';
import SearchBarContainer from './search_bar_container';
import SearchIndexItem from './search_index_item';
import FilterForm from './filter_form_container';
import { withRouter } from 'react-router-dom';
import { parseHash } from '../../util/util';

class SearchIndex extends React.Component {

  constructor(props) {
    super(props);
    this.searchQuery = props.searchQuery;
    this.searchHash = props.searchHash;
    this.createVenueList = this.createVenueList.bind(this);
    this.filter = this.filter.bind(this);
    this.renderChoice = this.renderChoice.bind(this);
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

  createVenueList(venues) {
    let parsed = parseHash(this.props.searchHash)
    let venueLis = Object.values(venues).map((venue) => {
    
      return (
        <SearchIndexItem
          key={venue.id}
          venue={venue}
          reservationsToday={venue.reservationsToday}
          date={parsed.date}
          time={parsed.time}
          partySize={parsed.partySize}
          openModal={this.props.openModal}
        />
      );
    })

    return venueLis;
  }

  renderChoice(venues) {
    if (Object.keys(venues).length < 1) {
      return (
        <div>
          <div className='search-content-section'>
            <h3>WE DID NOT FIND A MATCH FOR YOUR SEARCH</h3>
            <p>
              Sorry, we couldn't find any results for
                <span className='noresult-term'> {this.searchQuery}</span>
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
          <ul className='search-result-list'>
            {this.createVenueList(venues)}
          </ul>
        </div>
      )
    }
  }

  render() {
    let venues = this.props.venues;
    let filterList = Object.values(this.props.filters);
    let genreLen = this.props.filters.Genre.length;

    if (filterList.length != 0) {
      let filteredVenues = {};
      for (let i = 0; i < filterList.length; i++) {
        let currFilter = this.filter(filterList, i, venues);
        filteredVenues = Object.assign({}, currFilter);
        if (Object.values(filteredVenues).length != 0 || (genreLen != 0 && i === 2)) {
          venues = filteredVenues;
        }
      }
    }

    return (
      <div>
        <SearchBarContainer />
        <div className="search-columns">
          <div className='filter-column'>
            <FilterForm />
          </div>
          <ul className='search-result-list'>
            {this.renderChoice(venues)}
          </ul>
        </div>
      </div>
    )
  }

}

export default withRouter(SearchIndex);