import React from "react";
import { withRouter } from 'react-router-dom';
import SearchFields from './search_fields';
import { formatDate } from '../../util/util';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
      time: props.time,
      partySize: props.partySize,
      searchQuery: ""
    };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  update(field) {
    return e => this.setState({ 
      [field]: e.target.value 
    });
  }

  handleChange(selectedDate) {
    return this.setState({
      date: selectedDate
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.clearFilters();
    this.props.processSearch(this.state.searchQuery).then(() => {
      localStorage.setItem(`search-params`, (JSON.stringify(this.state)));

      this.props.history.push(
        `/search/query?${this.state.searchQuery}#${formatDate(this.state.date)}#${this.state.time}#${this.state.partySize}`
      )
    });
  }

  render() {
    const { date, time, partySize } = this.state;

    return (
      <div className='search-splash'>
        <p>Where will you be tonight?</p>
        <form onSubmit={this.handleSubmit}>
          <SearchFields 
            date={date}
            time={time}
            partySize={partySize}
            update={this.update}
            handleChange={this.handleChange}
          />
          <button className="search-submit">Let's go</button>
        </form>
      </div>
    )
  }
}

export default withRouter(SearchForm);