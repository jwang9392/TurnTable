import React from 'react';

class FilterForm extends React.Component {

  constructor(props) {
    super(props);
    this.filters = props.filters;
    this.createFilterList = this.createFilterList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkFilter = this.checkFilter.bind(this);
  }

  checkFilter(filter) {
    const filterList = Object.values(this.props.selectedFilters).flat();
    if (filterList.includes(filter)) {
      return true;
    }
    return false;
  }

  createFilterList = (type) => {
    return (
      this.filters[type].map((val, i) => {
        return (
          <li key={i}>
            <div>
              <input
                type="checkbox"
                value={val}
                onChange={this.handleChange(type, val)} 
                checked={this.checkFilter(val) ? 'checked' : ''}
              />
              <label>{val}</label>
              <br />
            </div>
          </li>
        )
      })
    )
  }

  handleChange = (filter, value) => e => {
    if (e.target.checked === true) {
      return this.props.updateFilter(filter, value)
    } else {
      return this.props.deleteFilter(filter, value)
    }
  };

  render() {
    return (
      <div>
        <span className="filter">Filter results:</span>
        <br />
        <div>
          <span>City</span>
          <ul>
            {this.createFilterList("City")}
          </ul>
        </div>
        <div>
          <span>Price</span>
          <ul>
            {this.createFilterList("Price")}
          </ul>
        </div>
        <div>
          <span>Genre</span>
          <ul>
            {this.createFilterList("Genre")}
          </ul>
        </div>
      </div>
    )
  }
}

export default FilterForm;
