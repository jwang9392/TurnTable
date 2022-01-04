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
    if (type === "Price") {
      return (
        this.filters[type].map((val, i) => {
          let display;
          
          switch (i) {
            case 0:
              display = " $$ ";
              break;
            case 1:
              display = "$$$"
              break;
            case 2:
              display = "$$$$"
              break;
          }

          return (
            <span key={i}>
              <label className="filter-input-button">
                <input
                  type="checkbox"
                  value={val}
                  onChange={this.handleChange(type, val)}
                  checked={this.checkFilter(val) ? 'checked' : ''}
                />
                <span className="filter-custom-button">{display}</span>
                <div className="hidden-price">{val}</div>
              </label>
            </span>
          )
        })
      )
    } else {
      return (
        this.filters[type].map((val, i) => {
          return (
            <li key={i}>
              <div>
                <label className="filter-input">
                  <input
                    type="checkbox"
                    value={val}
                    onChange={this.handleChange(type, val)} 
                    checked={this.checkFilter(val) ? 'checked' : ''}
                  />
                  <span className="filter-custom-checkbox"></span>
                  {val}
                </label>
                <br />
              </div>
            </li>
          )
        })
      )
    }
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
        <div className="filter-category">
          <div className="filter-header">
            <i className="filter-icon fas fa-map-marker-alt"></i>
            <span>City</span>
          </div>
          <ul>
            {this.createFilterList("City")}
          </ul>
        </div>
        <div className="filter-category">
          <div className="filter-header">
            <i className="filter-icon fas fa-money-bill-alt"></i>
            <span>Price</span>
          </div>
          <div className="filter-price">
            {this.createFilterList("Price")}
          </div>
        </div>
        <div className="filter-category">
          <div className="filter-header">
            <i className="filter-icon fas fa-headphones"></i>
            <span>Genre</span>
          </div>
          <ul>
            {this.createFilterList("Genre")}
          </ul>
        </div>
      </div>
    )
  }
}

export default FilterForm;
