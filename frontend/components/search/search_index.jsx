import React from 'react';
import SearchFields from './search_fields';
import SearchIndexItem from './search_index_item';
import FilterForm from './filter_form_container';
import { withRouter } from 'react-router-dom';

class SearchIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
      time: props.time,
      partySize: props.partySize,
      searchQuery: props.searchQuery
    };

    this.createVenueList = this.createVenueList.bind(this);
    this.filter = this.filter.bind(this);
    this.renderChoice = this.renderChoice.bind(this);
    this.update = this.update.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearFilters();
    this.props.processSearch(this.state.searchQuery);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const { date, time, partySize } = this.props;

      if (this.state.date.valueOf() != date.valueOf() || this.state.time != time || this.state.partySize != partySize ) {
        this.setState({
          date, 
          time, 
          partySize
        });
      }
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.target.value
    });
  }

  handleChange(selectedDate) {
    return this.setState({
      "date": selectedDate
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { date, time, partySize, searchQuery } = this.state;
    const formattedDate = this.props.formatDate(date)

    this.props.clearFilters();
    this.props.processSearch(searchQuery).then(() => {
      localStorage.setItem(`search-params-${this.props.currentUser ? this.props.currentUser.id : "guest"}`, (JSON.stringify(this.state)));

      this.props.history.push(
        `/search/query?${searchQuery}#${formattedDate}#${time}#${partySize}`
      )
    });
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
    const { date, time, partySize } = this.props;
    
    let venueLis = Object.values(venues).map((venue) => {
      return (
        <SearchIndexItem
          key={venue.id}
          venue={venue}
          reservationsToday={venue.reservationsToday}
          date={date}
          time={time}
          partySize={partySize}
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
    const {date, time, partySize, searchQuery} = this.state;

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
        <div className='search-bar'>
          <form onSubmit={this.handleSubmit}> 
            <SearchFields 
              date={date}
              time={time}
              partySize={partySize}
              searchQuery={searchQuery}
              update={this.update}
              handleChange={this.handleChange}
            />
            <button className="search-submit">Find a Table</button>
          </form>
        </div>
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